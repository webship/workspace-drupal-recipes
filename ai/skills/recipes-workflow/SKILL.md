---
name: recipes-workflow
description: How work is done in the `recipes/` folder of the Webship Workspace — what a recipe is there (a git checkout of a Drupal recipe package), how its code-quality checks are run, how its GitLab CI pipeline is run on this machine before a push, how a checkout is backed up, with the flags of each command and the settings keys of the folder. Use when asked to "run the checks of this recipe", "run the pipeline locally", "back up the recipe", or when a command of `recipes/` is about to be run.
argument-hint: '[what you are about to do in recipes]'
---

# recipes-workflow

`~/workspace/recipes` is the Recipes folder of a Webship Workspace (container-based, DDEV by default).
Recipes are Drupal recipe packages, checked out to work on: each one a git checkout with its `recipe.yml` and its `composer.json`. It comes with the Recipes plugin (`@webship.co/workspace-drupal-recipes`), which places the commands below in the folder. Every command finds the workspace from its own path; run it from the folder, and read `bash <command> --help` before quoting a flag.

## The order of work

1. **See what the recipe declares**: `bash cmd-tools-checks.sh myrecipe --list`. It runs nothing.
2. **Work on a branch** of the checkout, `~/workspace/recipes/myrecipe`.
3. **Run the checks**: `bash cmd-tools-checks.sh myrecipe`, or some with `--only`.
4. **Run the pipeline on this machine**: `bash cmd-tools-gitlab-ci-local.sh myrecipe --doctor`
   once, then `bash cmd-tools-gitlab-ci-local.sh myrecipe` (or `--slim`).
5. **Push when it is green**, and gate on the remote pipeline what could not run here.

## Commands

| Command | What it does | Flags |
| --- | --- | --- |
| `cmd-tool-backup-recipe.sh` | An item as an archive, into `backups/recipes/` | none |
| `cmd-tool-git-change-filemode-to-false.sh` | Sets `core.fileMode` to false in one checkout: `<recipe>` | none |
| `cmd-tools-checks.sh` | Runs the code-quality checks an item's `package.json` declares; `--list` prints the plan and runs nothing | `--browser` `--e2e` `--fail-fast` `--install` `--list` `--only` `--runner` `--skip` |
| `cmd-tools-gitlab-ci-local.sh` | Runs an item's GitLab CI pipeline on this machine, before a push | `--doctor` `--list` `--slim` `--variable` |
| `cmd-tools-reclaim.sh` | Disk held by projects whose folder is gone: a dry run unless `--apply` | `--apply` `--keep-days` `--list-protected` `--only` |

## Settings

| Key | File | What it says |
| --- | --- | --- |
| `doc.name` | `core/config/workspace.recipes.settings.yml` | The folder under the workspace root: `recipes` |
| `type` | `core/config/workspace.recipes.settings.yml` | `code`: the rows of the page are packages and repositories, with the Build, Backup, Remove and Checks actions |
| `composer` | `core/config/workspace.recipes.settings.yml` | `manifest`: the COMPOSER menu only adds to `composer.json` here, and never installs |
| `assistant.name`, `assistant.placeholder` | `core/config/workspace.recipes.settings.yml` | What the assistant is called on this page; `default` takes the workspace's |
| `workspaces` | `core/config/settings.yml` | The active folders; `recipes` is on it once the plugin is activated |

## Rules

- **A recipe here is a git checkout somebody works in.** Never delete or re-clone one; work on a
  branch, and back the checkout up (`bash cmd-tool-backup-recipe.sh <name>`) before a risky change.
- **A recipe is proven by applying it** to a fresh site of a sites folder, in that site's
  container (DDEV by default); never `composer`, `drush` or `php` on the host.
- **Green before a push.** The checks the recipe declares, then its pipeline on this machine. A red
  job is fixed, never hidden.
- `bash cmd-tools-reclaim.sh` is a report until `--apply` is added: never add it unasked.

The Recipes plugin places these beside this one, each in the workspace folder of its kind: the agent `recipes-maintainer` (`ai-agents/`), the command `/recipes-check` (`ai-commands/`) and the prompt `recipes-green-gate` (`ai-prompts/`).

## The book

For any automated functional testing in this work (a Gherkin feature, a step definition, choosing a
step, a test run and its failures), read the book *Automated Functional Testing Recipes* first.

- **Where.** Use the first that exists: `.claude/automated-functional-testing-recipes/` in the project,
  `~/.claude/automated-functional-testing-recipes/` (installed by webship/webship-js-ai-agent,
  webship/webship-js-skills or webship/ai-agents), or
  https://github.com/webship/webship-js-ai-agent/tree/2.0.x/automated-functional-testing-recipes
- **How.** Its `README.md` first, then the chapter that matches the task (one file per chapter,
  named by its subject), not the single complete file.
- **Which wins.** The installed webship-js package and the step pack are the source of truth for
  step phrasing. When they differ from the book, follow them and say so.
