---
title: "Building a CLI Tool in Go"
date: 2023-09-05
---

## Motivation

This is a write-up on building a small CLI utility for automating a repetitive workflow.

## Design Decisions

**Single binary, no dependencies.** Go compiles to a static binary, which makes distribution trivial — copy one file, done.

**Cobra for subcommands.** [Cobra](https://github.com/spf13/cobra) is the standard library for CLI apps in Go. It handles flags, subcommands, and help text without boilerplate.

## Code Snippet

```go
package main

import (
    "fmt"
    "github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
    Use:   "mytool",
    Short: "A short description",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("Hello from mytool")
    },
}

func main() {
    rootCmd.Execute()
}
```

## Takeaways

- Keep each subcommand in its own file for readability.
- Use `cobra.MarkFlagRequired` liberally — good error messages are free.
