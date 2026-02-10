# File Hygiene

File Hygiene is a Node.js CLI tool that scans a directory and helps you understand what files are taking up space, which files are old or unused, and where duplicate files exist. The goal is to make it easier to clean up and manage cluttered directories without immediately deleting anything.

This project was built as a portfolio-quality CLI application with a focus on clean architecture, performance-aware analysis, and readable terminal output.

---

## Features

- Recursively scans a target directory (or the current working directory)
- Skips common noise and system paths
  - `node_modules`
  - hidden/system directories
  - ignored paths using `.gitignore`-style rules

- Safely handles inaccessible files and directories
- Collects structured metadata for each file

### Analysis

- **Large files** – identify files above a configurable size threshold
- **Old / unused files** – find files that haven’t been accessed in a long time
- **Duplicate files** – detect duplicates using size grouping followed by content hashing

### CLI UX

- Clean, readable scan summary
- Consolidated reporting for ignored, skipped, and inaccessible files
- Separation between logic and output formatting

---

## Installation

```bash
git clone https://github.com/jamellemessinger/file-hygiene.git
cd file-hygiene
npm install
```

Requires **Node.js 18+** (ES Modules).

---

## Usage

Run the CLI from the project root:

```bash
node src/index.js
```

You will be prompted to enter a directory path. Press **Enter** to scan the current directory.

Example output:

```text
================ Scan Summary ================

📂 Files Indexed: 312
🗄️  Directories Ignored: 7
⚠️  Files Ignored: 48
❌ Inaccessible: 2

----------- Analysis -----------

💾 Large files (>100MB): 12
🕰️  Old files (>365 days): 45
🔁 Duplicate groups: 3
```

No files are modified or deleted in v1. This is a **read-only analysis tool**.

---

## Project Structure

```text
src/
  cli/            # User input and prompts
  scanner/        # Recursive directory scanning
  analysis/       # File analysis logic (large, old, duplicates)
  utils/          # Reusable helper functions
  output/         # CLI formatting and display logic
  index.js        # Application entry point
```

The project is organized by responsibility rather than individual functions to keep it scalable and maintainable.

---

## Design Goals

- Clear separation of concerns
- Predictable and testable functions
- Performance-aware file analysis
- CLI output that is readable and useful at a glance
- Avoid premature feature creep

---

## Roadmap (Post-v1)

Potential future improvements:

- Command-line flags (size thresholds, age thresholds, output modes)
- JSON output for scripting and automation
- Interactive cleanup mode
- Hash caching for faster repeated scans
- Progress indicators for long-running scans

These features are intentionally out of scope for v1.

---

## Disclaimer

File Hygiene does **not** delete or modify files. Always review results carefully before taking action with external tools.

---

## AI Usage Policy

This project was developed with the assistance of AI tools (e.g., ChatGPT) as a **learning and productivity aid**, not as a replacement for understanding or decision-making.

### How AI is Used

AI tools may be used for:

- Generating initial scaffolding or boilerplate code
- Explaining unfamiliar APIs, language features, or patterns
- Suggesting alternative implementations or refactors
- Helping reason through bugs or edge cases
- Improving code readability and structure

### How AI is _Not_ Used

AI tools are **not** used to:

- Blindly copy and paste code without understanding it
- Bypass learning core concepts relevant to the project
- Replace architectural decisions or problem-solving
- Submit code I cannot explain, debug, or modify

### Responsibility & Understanding

For any AI-assisted code included in this project:

- I review the code line-by-line
- I can explain _why_ it exists and _how_ it works
- I adapt naming, structure, or logic to match my own mental model
- I am able to extend, refactor, or debug the code independently

### Learning Philosophy

AI is treated as:

- A **force multiplier**, not a crutch
- A faster way to learn industry patterns and best practices
- A tool to reduce time spent on mechanical work so more time can be spent on understanding systems, tradeoffs, and design decisions

This approach reflects how modern development teams operate, while maintaining personal accountability for the quality, correctness, and maintainability of the code.

---

### TL;DR

> This project uses AI tools responsibly for learning and productivity. All AI-assisted code is reviewed, understood, and modifiable by me. I use AI to move faster—not to avoid understanding.
