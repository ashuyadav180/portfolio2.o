import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Exclude these directories/files from the scan
const EXCLUDE_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "public",
  "dist",
  "tsconfig.tsbuildinfo",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  ".gitignore",
]);

interface Node {
  id: string;
  name: string;
  type: "file" | "dir";
  size?: number;
  loc?: number;
  category: "app" | "component" | "section" | "lib" | "config" | "style" | "folder";
}

interface Link {
  source: string;
  target: string;
  type: "structure" | "import";
}

// Helper to categorize files
function getCategory(relPath: string, isDir: boolean): Node["category"] {
  if (isDir) return "folder";
  const normalized = relPath.replace(/\\/g, "/");
  if (normalized.startsWith("src/app")) return "app";
  if (normalized.startsWith("src/components")) return "component";
  if (normalized.startsWith("src/sections")) return "section";
  if (normalized.startsWith("src/lib")) return "lib";
  if (normalized.endsWith(".css")) return "style";
  return "config";
}

// Function to resolve import path to an actual file ID
async function resolveImport(importerPath: string, importString: string, fileList: string[]): Promise<string | null> {
  const cleanImport = importString.replace(/['";]/g, "").trim();
  
  let resolved: string | null = null;
  
  if (cleanImport.startsWith("@/")) {
    // Alias resolution, e.g. "@/components/Navbar" -> "src/components/Navbar"
    resolved = `src/${cleanImport.slice(2)}`;
  } else if (cleanImport.startsWith(".") || cleanImport.startsWith("..")) {
    // Relative resolution
    const importerDir = path.dirname(importerPath);
    resolved = path.join(importerDir, cleanImport);
  }
  
  if (!resolved) return null;
  
  // Normalize windows/linux paths
  const targetPath = resolved.replace(/\\/g, "/");
  
  // Try matching with extensions (.tsx, .ts, .mjs, .css, etc.)
  const extensions = ["", ".tsx", ".ts", ".tsx", ".ts", "/index.tsx", "/index.ts", ".css"];
  for (const ext of extensions) {
    const candidate = `${targetPath}${ext}`;
    if (fileList.includes(candidate)) {
      return candidate;
    }
  }
  
  return null;
}

export async function GET() {
  try {
    const rootDir = process.cwd();
    const nodes: Node[] = [];
    const links: Link[] = [];
    const fileList: string[] = [];
    const fileContents: { [path: string]: string } = {};

    // First pass: scan directory recursively to gather all files and directories
    async function scan(dirPath: string) {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relPath = path.relative(rootDir, fullPath).replace(/\\/g, "/");
        
        if (EXCLUDE_DIRS.has(entry.name) || entry.name.startsWith(".")) {
          continue;
        }

        if (entry.isDirectory()) {
          nodes.push({
            id: relPath,
            name: entry.name,
            type: "dir",
            category: "folder",
          });
          
          // Connect subfolder to parent folder
          const parentDir = path.dirname(relPath).replace(/\\/g, "/");
          if (parentDir && parentDir !== "." && parentDir !== "") {
            links.push({
              source: parentDir,
              target: relPath,
              type: "structure",
            });
          }

          await scan(fullPath);
        } else {
          // File
          fileList.push(relPath);
          let size = 0;
          let loc = 0;
          let content = "";

          try {
            const stats = await fs.stat(fullPath);
            size = stats.size;
            
            // Only read contents of text-like files to extract LOC and imports
            const ext = path.extname(entry.name).toLowerCase();
            if ([".ts", ".tsx", ".js", ".jsx", ".css", ".json", ".md", ".mjs"].includes(ext)) {
              content = await fs.readFile(fullPath, "utf-8");
              fileContents[relPath] = content;
              loc = content.split("\n").length;
            }
          } catch (e) {
            console.error(`Error reading ${relPath}`, e);
          }

          nodes.push({
            id: relPath,
            name: entry.name,
            type: "file",
            size,
            loc,
            category: getCategory(relPath, false),
          });

          // Connect file to its parent folder
          const parentDir = path.dirname(relPath).replace(/\\/g, "/");
          if (parentDir && parentDir !== "." && parentDir !== "") {
            links.push({
              source: parentDir,
              target: relPath,
              type: "structure",
            });
          }
        }
      }
    }

    await scan(rootDir);

    // Second pass: extract import connections for dependency links
    for (const relPath of fileList) {
      const content = fileContents[relPath];
      if (!content) continue;

      // Match import statements: import ... from "..." or require("...") or import("...")
      const importRegex = /(?:import|export)\s+(?:[\w\s{},*]*\s+from\s+)?['"]([^'"]+)['"]|import\(['"]([^'"]+)['"]\)/g;
      let match;
      
      while ((match = importRegex.exec(content)) !== null) {
        const importStr = match[1] || match[2];
        if (!importStr) continue;

        // Only resolve internal imports (starting with @/ or relative ./ or ../)
        if (importStr.startsWith("@/") || importStr.startsWith(".") || importStr.startsWith("..")) {
          const resolvedPath = await resolveImport(relPath, importStr, fileList);
          if (resolvedPath && resolvedPath !== relPath) {
            // Check duplicate links
            const exists = links.some(
              (l) => l.source === relPath && l.target === resolvedPath && l.type === "import"
            );
            if (!exists) {
              links.push({
                source: relPath,
                target: resolvedPath,
                type: "import",
              });
            }
          }
        }
      }
    }

    return NextResponse.json({ nodes, links });
  } catch (error: unknown) {
    console.error("Error in /api/codebase route:", error);
    const message = error instanceof Error ? error.message : "Failed to parse codebase";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
