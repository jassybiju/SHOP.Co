import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

import {FlatCompat} from '@eslint/eslintrc'

import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReactRefresh from "eslint-plugin-react-refresh";

const compat = new FlatCompat({
    baseDirectory:import.meta.dirname
})

export default defineConfig([
    js.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: {
            react: pluginReact,
            "react-hooks": pluginReactHooks,
            "jsx-a11y": eslintPluginJsxA11y,
            "react-refresh": pluginReactRefresh,
        },
        extends: [
            ...compat.extends(
              "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended"
            )
        ],
        languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions : {
            sourceType : 'module',
            ecmaVersion :'latest',
            ecmaFeatures : {
                jsx :true
            }
        }},
        settings: {
            react: {
                version: "detect",
            },
        },
        rules : {
            'react/react-in-jsx-scope' : 'off',
            'react/prop-types' : 'off',
            'react-refresh/only-export-components' : [
                'warn',
                {allowConstantExport : true}
            ]
        },
        ignores : ['dist','node_modules']
    },

]);
