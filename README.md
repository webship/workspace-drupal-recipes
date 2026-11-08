# @webship.co/workspace-drupal-recipes

The **Drupal recipes** workspace of the [Webship Workspace](https://github.com/webship/workspace) dashboard:
the `recipes/` folder (type `code`), its settings file (`core/config/workspace.recipes.settings.yml`),
its commands and its docs, as a plugin.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-drupal-recipes
bash core/scripts/plugins.sh --activate drupal-recipes     # puts `recipes` on the workspaces list of settings.yml
bash core/scripts/plugins.sh --install drupal-recipes      # the folder, its settings file (once), its commands, its docs (once)
```

The settings file and the docs are placed once and never overwritten: they hold what you put there.
`--deactivate` takes the workspace off the list; the folder and its content stay.

## The commands

| Command |
| --- |
| `cmd-tool-backup-recipe.sh` |
| `cmd-tool-git-change-filemode-to-false.sh` |
| `cmd-tools-checks.sh` |
| `cmd-tools-gitlab-ci-local.sh` |
| `cmd-tools-graphify.sh` |
| `cmd-tools-obsidian.sh` |
| `cmd-tools-ragify.sh` |
| `cmd-tools-reclaim.sh` |

The bash functions these commands call live in the dashboard's `core/scripts/functions`.
