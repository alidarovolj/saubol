import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      globals: {
        'useRuntimeConfig': 'readonly',
        'useState': 'readonly',
        'useHead': 'readonly',
        'useNuxtApp': 'readonly',
        'useRoute': 'readonly',
        'useRouter': 'readonly',
        'useCookie': 'readonly',
        'useLazyAsyncData': 'readonly',
        'useFetch': 'readonly',
        '$fetch': 'readonly',
        'createError': 'readonly',
        'defineNuxtConfig': 'readonly',
        'defineNuxtPlugin': 'readonly',
        'definePageMeta': 'readonly',
        'defineNuxtRouteMiddleware': 'readonly',
        'defineI18nConfig': 'readonly',
        'defineStore': 'readonly',
        'ref': 'readonly',
        'shallowRef': 'readonly',
        'reactive': 'readonly',
        'computed': 'readonly',
        'watch': 'readonly',
        'watchEffect': 'readonly',
        'nextTick': 'readonly',
        'onMounted': 'readonly',
        'onBeforeUnmount': 'readonly',
        'onBeforeRouteLeave': 'readonly',
        'clearNuxtData': 'readonly',
        'navigateTo': 'readonly',
        'toRaw': 'readonly',
        'api': 'readonly',
        'suffix': 'readonly',
        'storeToRefs': 'readonly',
        'onBeforeRouteUpdate': 'readonly'
      }
    }
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'object-curly-spacing': [
        'error',
        'always'
      ],
      'vue/attribute-hyphenation': [
        'error',
        'never'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          'attribute': 1,
          'baseIndent': 1,
          'closeBracket': 0,
          'alignAttributesVertically': true,
          'ignores': []
        }
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'multiline': 'never'
        }
      ],
      'vue/html-closing-bracket-spacing': [
        'error',
        {
          'startTag': 'never',
          'endTag': 'never',
          'selfClosingTag': 'always'
        }
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          'singleline': 'beside',
          'multiline': 'below'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          'singleline': {
            'max': 1
          },
          'multiline': {
            'max': 1
          }
        }
      ],
      'vue/attributes-order': [
        'error',
        {
          'order': [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            [
              'UNIQUE',
              'SLOT'
            ],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ],
          'alphabetical': false
        }
      ]
    }
  }
];