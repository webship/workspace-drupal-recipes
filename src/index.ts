/**
 * The Drupal recipes workspace for Webship Workspace: the `recipes/` folder as a plugin.
 *
 * What the package carries is placed by the installer from the manifest (the folder's settings file,
 * its commands, its docs and its AI items, each in the folder of its kind) and listed by --activate; the dashboard draws the workspace from the
 * settings file like any other. Nothing to register at run time yet: this is where the folder's own
 * rail buttons, row menus or assistant context would go.
 */

import type { PluginApi } from '@webship.co/workspace-plugin-api';

export const WORKSPACE_KEY = 'recipes';

/** The AI items the installer places, each in the workspace folder of its kind (ai/ in this package). */
export const AGENTS = ['recipes-maintainer'];
export const SKILLS = ['recipes-workflow'];
export const AI_COMMANDS = ['recipes-check'];
export const PROMPTS = ['recipes-green-gate'];

export function register(api: PluginApi): void {
  api.addAssistantContext(() => `The recipes/ workspace is the Drupal recipes workspace (a plugin, @webship.co/workspace-drupal-recipes); its commands are the cmd-*.sh scripts in that folder. It comes with AI items for work in this folder: the agent \`recipes-maintainer\` (ai-agents/), the skill \`recipes-workflow\` (ai-skills/), the command \`/recipes-check\` (ai-commands/) and the prompt \`recipes-green-gate\` (ai-prompts/).`);
}
