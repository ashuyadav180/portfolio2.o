import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileParam = searchParams.get("path");

    if (!fileParam) {
      return NextResponse.json({ error: "Missing 'path' query parameter" }, { status: 400 });
    }

    const rootDir = process.cwd();
    // Resolve the absolute path of the requested file
    const resolvedPath = path.resolve(rootDir, fileParam);

    // Security check: ensure the file is strictly inside the project root directory
    if (!resolvedPath.startsWith(rootDir.replace(/\\/g, "/")) && !resolvedPath.startsWith(rootDir)) {
      return NextResponse.json({ error: "Access Denied: Path outside of workspace root" }, { status: 403 });
    }

    // Verify it is an allowed file type
    const ext = path.extname(resolvedPath).toLowerCase();
    const allowedExtensions = [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".css",
      ".json",
      ".md",
      ".mjs",
      ".mjsx",
      ".html",
      ".config.ts",
      ".config.js",
      ".config.mjs",
    ];

    if (!allowedExtensions.includes(ext) && !entryIsAllowedConfig(path.basename(resolvedPath))) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
    }

    try {
      const content = await fs.readFile(resolvedPath, "utf-8");
      return new NextResponse(content, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    } catch {
      return NextResponse.json({ error: "File not found or unreadable" }, { status: 404 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve code content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function entryIsAllowedConfig(filename: string) {
  const allowed = [
    "package.json",
    "tsconfig.json",
    "next.config.ts",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "eslint.config.mjs",
    "next-env.d.ts",
  ];
  return allowed.includes(filename);
}
