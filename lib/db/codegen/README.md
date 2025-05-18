# Codegen Database Management

This directory contains tools for managing codegen data in the database. The tools allow for initializing the database with codegen data and incrementally updating specific codegens.

## Files

- `init.ts` - Contains functions for initializing and updating codegen data
- `mutaitons.ts` - Contains database operations for creating and updating codegens
- `schema.ts` - Contains the MongoDB schema for codegens
- `types.ts` - Contains TypeScript interfaces for codegen data
- `cli.ts` - Command-line interface for managing codegen data
- `migrate.ts` - Complete migration script for adding, updating, and removing codegens

## Usage

### Using the Migration Script (Recommended)

The migration script provides a complete solution for managing codegen data:

```bash
# Run the migration script to synchronize the database with the current configuration
ts-node lib/db/codegen/migrate.ts
```

This script will:

1. Add new codegens that don't exist in the database
2. Update existing codegens with the latest configuration
3. Remove codegens that are no longer in the configuration

To modify the codegen configuration, simply edit the `currentCodegens` array in `migrate.ts`.

### Using the CLI

The CLI provides a convenient way to manage codegen data from the command line.

```bash
# Initialize the database with codegen data
ts-node lib/db/codegen/cli.ts init

# Force update all codegens in the database
ts-node lib/db/codegen/cli.ts update-all

# Update a specific codegen by title
ts-node lib/db/codegen/cli.ts update "My Company Private Component Codegen"

# Update the private component codegen (shortcut)
ts-node lib/db/codegen/cli.ts update-private
```

### Using the API

You can also use the functions directly in your code:

```typescript
// Using the migration function
import { migrate } from "./lib/db/codegen/migrate"
await migrate()

// Or using the initialization functions
import { initCodegen, updateSpecificCodegen } from "./lib/db/codegen/init"

// Initialize the database with codegen data
await initCodegen()

// Force update all codegens
await initCodegen(true)

// Update a specific codegen
await updateSpecificCodegen("My Company Private Component Codegen")
```

## Adding, Modifying, or Removing Codegens

The recommended way to manage codegens is to:

1. Edit the `currentCodegens` array in `migrate.ts`
2. Run the migration script: `ts-node lib/db/codegen/migrate.ts`

This will automatically handle adding new codegens, updating existing ones, and removing those that are no longer needed.
