#!/usr/bin/env node
// Starts the user's installed FsAutoComplete language server and connects it
// to Claude Code over stdio. All arguments are passed through unchanged.
"use strict";

const { spawn } = require("child_process");

// On Windows, dotnet global tools are .exe files but npm-style shims are .cmd
// files, which Node can only start through a shell.
const child = spawn("fsautocomplete", process.argv.slice(2), {
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("error", (err) => {
  if (err.code === "ENOENT") {
    process.stderr.write(
      "fsautocomplete was not found on PATH. Install it with:\n" +
        "  dotnet tool install --global fsautocomplete\n"
    );
  } else {
    process.stderr.write(`Failed to start fsautocomplete: ${err.message}\n`);
  }
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});

for (const sig of ["SIGINT", "SIGTERM"]) {
  process.on(sig, () => child.kill(sig));
}
