# Recipes

Drupal recipe packages.

Part of the **Webship Workspace** (`~/workspace`), a container-based harness (DDEV by default). The rules in the root
`CLAUDE.md` apply here too; what follows is what is specific to this folder.

## The rule that matters here

Everything goes through DDEV. Never a host `composer`, `drush` or `mysql`:

```bash
ddev composer require drupal/something
ddev drush cr
ddev export-db --file=…        # not mysqldump
ddev delete -y -O              # not a dropped database
```

`ddev start` takes `-y`; **`ddev stop` does not**. Never write a `$databases` block into
`settings.php` — DDEV's `settings.ddev.php` owns the connection.

## Commands here

```bash
bash cmd-tool-backup-recipe.sh                        # Bootstrap.
bash cmd-tool-git-change-filemode-to-false.sh         # Bootstrap.
bash cmd-tools-graphify.sh                            # Map a project in this workspace into a queryable knowledge graph with
bash cmd-tools-obsidian.sh                             # Turn a project graph into an Obsidian vault
bash cmd-tools-ragify.sh                              # Index a project in this workspace into the Milvus vector database
```

Every one locates the workspace from its own path, so there is nothing to export and nothing to
install. `--help` on any of them lists its arguments.

## AI items for this folder

The plugin of this folder (`@webship.co/workspace-drupal-recipes`) places its own AI items in the AI folders of the
workspace, when they are active:

- `recipes-maintainer` (`ai-agents/`): Works on a Drupal recipe package checked out in `recipes/` and brings it to green before a push: its checks, its pipeline on this machine, a backup
- `recipes-workflow` (`ai-skills/`): How work is done in `recipes/`: see what is declared, check, run the pipeline locally, push when green; every command with its flags, the settings keys
- `/recipes-check` (`ai-commands/`): `/recipes-check <recipe> [checks]`: prints the plan, runs the declared checks and says what is red and why
- `recipes-green-gate` (`ai-prompts/`): A new session that runs a recipe's checks and its pipeline on this machine and reports green or red
