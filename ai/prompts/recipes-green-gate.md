Bring a Drupal recipe package to green before a push: the checks it declares, then its pipeline on this machine.

The launch line is for Claude Code, the default; the text between the triple quotes can be given to another AI CLI as it is.

```
claude --permission-mode bypassPermissions """
Bring the recipe <recipe> of the recipes folder to green before it is pushed
# ~/workspace/recipes/<recipe> · a git checkout · container-based (DDEV by default)
# nothing is pushed, merged, reset, deleted or cloned again in this session

1. git -C <recipe> status -sb
   tell me the branch and what is not committed
2. bash cmd-tools-checks.sh <recipe> --list
   tell me which checks the recipe declares
3. bash cmd-tools-checks.sh <recipe>
   every declared check; tell me which are red, with the first lines of each
4. bash cmd-tools-gitlab-ci-local.sh <recipe> --doctor
   stop and tell me if the runner or the container engine is missing
5. bash cmd-tools-gitlab-ci-local.sh <recipe>
   if the whole pipeline cannot run here, say why and run: bash cmd-tools-gitlab-ci-local.sh <recipe> --slim

Report: the checks (passed, failed, not declared), the pipeline (GREEN or RED, which jobs ran,
which could not run here). A red job is a result: do not hide it, do not allow it to fail.
Then ask me whether to fix what is red.
"""
```
