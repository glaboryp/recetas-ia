import { fileURLToPath } from 'node:url'
import { defineConfig, includeIgnoreFile } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginCypress from 'eslint-plugin-cypress'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}'
    ],
    ...pluginCypress.configs.recommended
  },
  skipFormatting
])
