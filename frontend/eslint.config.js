import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginImport from 'eslint-plugin-import'
import pluginHooks from 'eslint-plugin-react-hooks'
import pluginAlignImport from 'eslint-plugin-align-import'
import pluginAlign from 'eslint-plugin-align-assignments'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginBraceRules from 'eslint-plugin-brace-rules'
import pluginRelativePaths from 'eslint-plugin-no-relative-import-paths'

export default [
    {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
    {languageOptions: { globals: {...globals.browser, ...globals.node} }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    pluginReact.configs.flat.recommended,
    {
        linterOptions: {
            reportUnusedDisableDirectives: "off"
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            import: pluginImport,
            'react-hooks': pluginHooks,
            'align-import': pluginAlignImport,
            'align-assignments': pluginAlign,
            n: pluginN,
            promise: pluginPromise,
            'brace-rules': pluginBraceRules,
            'no-relative-import-paths': pluginRelativePaths
        },
        rules: {
            "for-direction": ["error"],
            "no-constant-binary-expression": ["error"],
            "no-dupe-else-if": ["error"],
            "no-empty-static-block": ["error"],
            "no-nonoctal-decimal-escape": ["error"],
            "no-unsafe-optional-chaining": ["error"],
            "no-unused-labels": ["error"],
            "no-unused-private-class-members": ["error"],
            "require-yield": ["error"],
            
            "constructor-super": "off",
            "getter-return": "off",
            "no-const-assign": "off",
            "no-dupe-args": "off",
            "no-dupe-class-members": "off",
            "no-dupe-keys": "off",
            "no-func-assign": "off",
            "no-import-assign": "off",
            "no-new-symbol": "off",
            "no-new-native-nonconstructor": "off",
            "no-obj-calls": "off",
            "no-redeclare": "off",
            "no-setter-return": "off",
            "no-this-before-super": "off",
            "no-undef": "off",
            "no-unreachable": "off",
            "no-unsafe-negation": "off",
            "no-var": "error",
            "prefer-const": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            
            "import/named": "error",
            "import/namespace": "error",
            "import/default": "error",
            "import/no-named-as-default": "warn",
            "import/no-named-as-default-member": "warn",
            "import/no-default-export": "error",
            
            "@/block-spacing": ["error", "always"],
            "@/comma-spacing": ["error", { "before": false, "after": true }],
            "@/func-call-spacing": ["error", "never"],
            "@/keyword-spacing": ["error", { "before": true, "after": true }],
            "@/lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
            "@/no-extra-parens": ["error", "functions"],
            "@/no-throw-literal": ["error"],
            "@/object-curly-spacing": ["error", "always"],
            "@/quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": false }],
            "@/semi": ["error", "never"],
            "@/space-before-blocks": ["error", "always"],
            "@/space-before-function-paren": ["error", "always"],
            "@/space-infix-ops": ["error"],
            
            "@/indent": [
                "error",
                4,
                {
                    "outerIIFEBody": 1,
                    "FunctionDeclaration": { "parameters": 1, "body": 1 },
                    "FunctionExpression": { "parameters": 1, "body": 1 },
                    "CallExpression": { "arguments": 1 },
                    "ImportDeclaration": 1,
                    "ignoreComments": false,
                    "ignoredNodes": [
                        "TSInterfaceDeclaration",
                        "TemplateLiteral *",
                        "JSXElement",
                        "JSXElement > *",
                        "JSXAttribute",
                        "JSXIdentifier",
                        "JSXNamespacedName",
                        "JSXMemberExpression",
                        "JSXSpreadAttribute",
                        "JSXExpressionContainer",
                        "JSXOpeningElement",
                        "JSXClosingElement",
                        "JSXFragment",
                        "JSXOpeningFragment",
                        "JSXClosingFragment",
                        "JSXText",
                        "JSXEmptyExpression",
                        "JSXSpreadChild"
                    ],
                    "SwitchCase": 1,
                    "VariableDeclarator": "first",
                    "MemberExpression": 1,
                    "ArrayExpression": 1,
                    "ObjectExpression": 1,
                    "flatTernaryExpressions": false,
                    "offsetTernaryExpressions": false
                }
            ],
            
            "@typescript-eslint/no-unsafe-assignment": [0],
            "@typescript-eslint/await-thenable": ["error"],
            "@typescript-eslint/ban-ts-comment": ["error", {
                "ts-expect-error": "allow-with-description",
                "ts-ignore": true,
                "ts-nocheck": true,
                "ts-check": false,
                "minimumDescriptionLength": 3
            }],
            "@typescript-eslint/consistent-type-exports": ["error", {
                "fixMixedExportsWithInlineTypeSpecifier": true
            }],
            "@typescript-eslint/dot-notation": ["error",
                {
                    "allowIndexSignaturePropertyAccess": false,
                    "allowKeywords": true,
                    "allowPattern": "",
                    "allowPrivateClassPropertyAccess": false,
                    "allowProtectedClassPropertyAccess": false
                }
            ],
            "@typescript-eslint/explicit-function-return-type": ["error", {
                "allowExpressions": true,
                "allowHigherOrderFunctions": true,
                "allowTypedFunctionExpressions": true,
                "allowDirectConstAssertionInArrowFunctions": true
            }],
            "@typescript-eslint/method-signature-style": ["error"],
            "@typescript-eslint/naming-convention": ["error", {
                "selector": "variableLike",
                "leadingUnderscore": "allow",
                "trailingUnderscore": "allow",
                "format": ["camelCase", "PascalCase", "UPPER_CASE"]
            }],
            "@typescript-eslint/no-array-constructor": ["error"],
            "@typescript-eslint/no-base-to-string": ["error"],
            "@typescript-eslint/no-confusing-void-expression": ["error", { "ignoreArrowShorthand": false, "ignoreVoidOperator": false }],
            "@typescript-eslint/no-dupe-class-members": ["error"],
            "@typescript-eslint/no-dynamic-delete": ["error"],
            "@typescript-eslint/no-extra-non-null-assertion": ["error"],
            "@typescript-eslint/no-extraneous-class": ["error", { "allowWithDecorator": true }],
            "@typescript-eslint/no-floating-promises": ["error"],
            "@typescript-eslint/no-for-in-array": ["error"],
            "@typescript-eslint/no-implied-eval": ["error"],
            "@typescript-eslint/no-invalid-void-type": ["error"],
            "@typescript-eslint/no-loss-of-precision": ["error"],
            "@typescript-eslint/no-misused-new": ["error"],
            "@typescript-eslint/no-misused-promises": ["error"],
            "@typescript-eslint/no-namespace": ["error"],
            "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
            "@typescript-eslint/no-non-null-assertion": ["error"],
            "@typescript-eslint/no-redeclare": ["error", { "builtinGlobals": false }],
            "@typescript-eslint/no-this-alias": ["error", { "allowDestructuring": true }],
            "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["error"],
            "@typescript-eslint/no-unnecessary-type-constraint": ["error"],
            "@typescript-eslint/no-unused-expressions": ["error", {
                "allowShortCircuit": true,
                "allowTernary": true,
                "allowTaggedTemplates": true,
                "enforceForJSX": false
            }],
            "@typescript-eslint/no-unused-vars": ["error", {
                "args": "none",
                "caughtErrors": "none",
                "ignoreRestSiblings": true,
                "vars": "all"
            }],
            "@typescript-eslint/no-use-before-define": ["error", {
                "functions": false,
                "classes": false,
                "enums": false,
                "variables": false,
                "typedefs": false
            }],
            "@typescript-eslint/no-useless-constructor": ["error"],
            "@typescript-eslint/no-var-requires": ["error"],
            "@typescript-eslint/prefer-includes": ["error"],
            "@typescript-eslint/prefer-nullish-coalescing": ["error", { "ignoreConditionalTests": false, "ignoreMixedLogicalExpressions": false }],
            "@typescript-eslint/prefer-optional-chain": ["error"],
            "@typescript-eslint/prefer-promise-reject-errors": ["error"],
            "@typescript-eslint/prefer-readonly": ["error"],
            "@typescript-eslint/prefer-reduce-type-parameter": ["error"],
            "@typescript-eslint/prefer-return-this-type": ["error"],
            "@typescript-eslint/prefer-ts-expect-error": ["error"],
            "@typescript-eslint/promise-function-async": ["error"],
            "@typescript-eslint/require-array-sort-compare": ["error", { "ignoreStringArrays": true }],
            "@typescript-eslint/restrict-plus-operands": ["error", { "skipCompoundAssignments": false }],
            "@typescript-eslint/restrict-template-expressions": ["error", { "allowNumber": true }],
            "@typescript-eslint/return-await": ["error", "always"],
            "@typescript-eslint/triple-slash-reference": ["error", { "lib": "never", "path": "never", "types": "never" }],
            "@typescript-eslint/unbound-method": ["error", { "ignoreStatic": false }],
            
            
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "@typescript-eslint/array-type": "error",
            "@typescript-eslint/ban-tslint-comment": "error",
            "@typescript-eslint/class-literal-property-style": "error",
            "@typescript-eslint/consistent-generic-constructors": "error",
            "@typescript-eslint/consistent-indexed-object-style": "error",
            "@typescript-eslint/consistent-type-assertions": "error",
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/no-confusing-non-null-assertion": "error",
            "no-empty-function": "off",
            "@typescript-eslint/no-empty-function": "error",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-inferrable-types": "error",
            "@typescript-eslint/prefer-for-of": "error",
            "@typescript-eslint/prefer-function-type": "error",
            "@typescript-eslint/prefer-namespace-keyword": "error",
            
            "react/jsx-key": 2,
            "react/jsx-no-comment-textnodes": 2,
            "react/jsx-no-duplicate-props": 2,
            "react/jsx-no-target-blank": 2,
            "react/jsx-no-undef": 2,
            "react/jsx-uses-react": 2,
            "react/jsx-uses-vars": 2,
            'react/jsx-indent-props':   [ 'error', 4 ],
            "react/no-children-prop": 2,
            "react/no-danger-with-children": 2,
            "react/no-deprecated": 2,
            "react/no-direct-mutation-state": 2,
            "react/no-find-dom-node": 2,
            "react/no-is-mounted": 2,
            "react/no-render-return-value": 2,
            "react/no-string-refs": 2,
            "react/no-unescaped-entities": 2,
            "react/no-unknown-property": 2,
            "react/no-unsafe": 0,
            "react/prop-types": 2,
            "react/require-render-return": 2,
            
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            
            "@typescript-eslint/no-duplicate-enum-values": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-unsafe-declaration-merging": "error",
            "@typescript-eslint/prefer-as-const": "error",
            
            "align-import/trim-import": "error",
            
            "object-shorthand": ["warn", "properties"],
            
            "accessor-pairs": ["error", { "setWithoutGet": true, "enforceForClassMembers": true }],
            "array-callback-return": ["error", {
                "allowImplicit": false,
                "checkForEach": false
            }],
            "comma-dangle": ["error", {
                "arrays": "never",
                "objects": "never",
                "imports": "never",
                "exports": "never",
                "functions": "never"
            }],
            "default-case-last": "error",
            "dot-notation": ["error", { "allowKeywords": true }],
            "eqeqeq": ["error", "always", { "null": "ignore" }],
            "generator-star-spacing": ["error", { "before": true, "after": true }],
            "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
            "multiline-ternary": ["error", "always-multiline"],
            "new-cap": ["error", { "newIsCap": true, "capIsNew": false, "properties": true }],
            "new-parens": "error",
            "no-array-constructor": "error",
            "no-async-promise-executor": "error",
            "no-caller": "error",
            "no-case-declarations": "error",
            "no-class-assign": "error",
            "no-compare-neg-zero": "error",
            "no-cond-assign": "error",
            "no-constant-condition": ["error", { "checkLoops": false }],
            "no-control-regex": "error",
            "no-debugger": "error",
            "no-delete-var": "error",
            "no-duplicate-case": "error",
            "no-useless-backreference": "error",
            "no-empty": ["error", { "allowEmptyCatch": true }],
            "no-empty-character-class": "error",
            "no-empty-pattern": "error",
            "no-eval": "error",
            "no-ex-assign": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-boolean-cast": "error",
            "no-extra-parens": ["error", "functions"],
            "no-fallthrough": "error",
            "no-floating-decimal": "error",
            "no-global-assign": "error",
            "no-implied-eval": "error",
            "no-invalid-regexp": "error",
            "no-irregular-whitespace": "error",
            "no-iterator": "error",
            "no-labels": ["error", { "allowLoop": false, "allowSwitch": false }],
            "no-lone-blocks": "error",
            "no-loss-of-precision": "error",
            "no-misleading-character-class": "error",
            "no-prototype-builtins": "error",
            "no-useless-catch": "error",
            "no-mixed-operators": ["error", {
                "groups": [
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    ["&&", "||"],
                    ["in", "instanceof"]
                ],
                "allowSamePrecedence": true
            }],
            "no-multi-str": "error",
            "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }],
            "no-new": "error",
            "no-new-func": "error",
            "no-new-object": "error",
            "no-new-wrappers": "error",
            "no-octal": "error",
            "no-octal-escape": "error",
            "no-proto": "error",
            "no-regex-spaces": "error",
            "no-return-assign": ["error", "except-parens"],
            "no-self-assign": ["error", { "props": true }],
            "no-self-compare": "error",
            "no-sequences": "error",
            "no-shadow-restricted-names": "error",
            "no-sparse-arrays": "error",
            "no-tabs": "error",
            "no-template-curly-in-string": "error",
            "no-throw-literal": "error",
            "no-undef-init": "error",
            "no-unexpected-multiline": "error",
            "no-unmodified-loop-condition": "error",
            "no-unneeded-ternary": ["error", { "defaultAssignment": false }],
            "no-unreachable-loop": "error",
            "no-unsafe-finally": "error",
            "no-unused-expressions": ["error", {
                "allowShortCircuit": true,
                "allowTernary": true,
                "allowTaggedTemplates": true
            }],
            "no-unused-vars": ["error", {
                "args": "none",
                "caughtErrors": "none",
                "ignoreRestSiblings": true,
                "vars": "all"
            }],
            "no-use-before-define": "off",
            "no-useless-call": "error",
            "no-useless-computed-key": "error",
            "no-useless-constructor": "error",
            "no-useless-escape": "error",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "no-void": "off",
            "no-whitespace-before-property": "error",
            "no-with": "error",
            "one-var": ["error", { "initialized": "never" }],
            "operator-linebreak": ["error", "after", { "overrides": { "?": "before", ":": "before", "|>": "before" } }],
            "padded-blocks": ["error", { "blocks": "never", "switches": "never", "classes": "never" }],
            "prefer-promise-reject-errors": "error",
            "prefer-regex-literals": ["error", { "disallowRedundantWrapping": true }],
            "quote-props": ["error", "as-needed"],
            "rest-spread-spacing": ["error", "never"],
            "spaced-comment": ["error", "always", {
                "line": { "markers": ["*package", "!", "/", ",", "="] },
                "block": { "balanced": true, "markers": ["*package", "!", ",", ":", "::", "flow-include"], "exceptions": ["*"] }
            }],
            "symbol-description": "error",
            "template-curly-spacing": ["error", "never"],
            "template-tag-spacing": ["error", "never"],
            "unicode-bom": ["error", "never"],
            "use-isnan": ["error", {
                "enforceForSwitchCase": true,
                "enforceForIndexOf": true
            }],
            "valid-typeof": ["error", { "requireStringLiterals": true }],
            "wrap-iife": ["error", "any", { "functionPrototypeMethods": true }],
            "yield-star-spacing": ["error", "both"],
            "yoda": ["error", "never"],
            
            "import/export": "error",
            "import/first": "error",
            "import/no-absolute-path": ["error", { "esmodule": true, "commonjs": true, "amd": false }],
            "import/no-duplicates": "error",
            "import/no-named-default": "error",
            "import/no-webpack-loader-syntax": "error",
            
            "align-assignments/align-assignments": [2],
            
            "n/handle-callback-err": ["error", "^(err|error)$"],
            "n/no-callback-literal": "error",
            "n/no-deprecated-api": "error",
            "n/no-exports-assign": "error",
            "n/no-new-require": "error",
            "n/no-path-concat": "error",
            "n/no-missing-import": "off",
            "n/process-exit-as-throw": "error",
            
            "promise/always-return": "error",
            "promise/no-return-wrap": "error",
            "promise/param-names": "error",
            "promise/catch-or-return": "error",
            "promise/no-native": "off",
            "promise/no-nesting": "warn",
            "promise/no-promise-in-callback": "warn",
            "promise/no-callback-in-promise": "warn",
            "promise/avoid-new": "off",
            "promise/no-new-statics": "error",
            "promise/no-return-in-finally": "warn",
            "promise/valid-params": "warn",
            
            "indent": "off",
            "linebreak-style": [ "error", "unix" ],
            "quotes": [ "error", "single" ],
            "semi": [ "error", "never" ],
            "array-bracket-spacing": ["error", "always"],
            "arrow-spacing": ["error", { "before": true, "after": true }],
            "block-spacing": ["error", "always"],
            "comma-spacing": ["error", {"before": false, "after": true}],
            "comma-style": ["error", "last"],
            "computed-property-spacing": ["error", "always"],
            "curly": ["error", "all"],
            "dot-location": ["error", "property"],
            "eol-last": ["error"],
            "func-names": [1],
            "key-spacing": ["error", { "beforeColon": false, "afterColon": true, "align": "value" }],
            "keyword-spacing": ["error"],
            "no-eq-null": [2],
            "no-inline-comments": [0],
            "no-mixed-spaces-and-tabs": ["error"],
            "no-multi-spaces": ["error", { "exceptions": { "VariableDeclarator": true, "ImportDeclaration": true, "AssignmentExpression": true }} ],
            "func-call-spacing": ["error", "never"],
            "no-trailing-spaces": ["error"],
            "object-curly-spacing": ["error", "always"],
            "one-var-declaration-per-line": ["error", "initializations"],
            "semi-spacing": ["error", {"before": false, "after": true}],
            "space-before-blocks": ["error", "always"],
            "space-before-function-paren": ["error", "always"],
            "space-in-parens": ["error", "always", { "exceptions": ["{}", "[]", "()", "empty"] }],
            "space-infix-ops": ["error"],
            "space-unary-ops": ["error", { "words": true, "nonwords": false }],
            "vars-on-top": ["error"],
            "camelcase": [0],
            "object-curly-newline": [ "error", { "multiline": true } ],
            "object-property-newline": [ "error", { "allowAllPropertiesOnSameLine": false } ],
            "max-depth": ["error", 4],
            "max-params": ["error", 5],
            "max-nested-callbacks": ["error", 3],
            "max-statements": ["error", 15],
            
            "@typescript-eslint/key-spacing": [0],
            "@typescript-eslint/strict-boolean-expressions": [0],
            "@typescript-eslint/no-unsafe-argument": [0],
            "@typescript-eslint/no-unnecessary-type-assertion": [0],
            "@typescript-eslint/non-nullable-type-assertion-style": [0],
            
            "@typescript-eslint/consistent-type-imports": [ "error", {
                "fixStyle": "separate-type-imports"
            }],
            
            "react/display-name": [0],
            "react/react-in-jsx-scope": [0],
            "react/jsx-indent": [ "error", 4, { checkAttributes: true, indentLogicalExpressions: true }],
            
            "react/jsx-sort-props": ["error", { 
                "callbacksLast": true,
                "shorthandFirst": true,
                "multiline": "last",
                "ignoreCase": true,
                "noSortAlphabetically": false,
                "reservedFirst": true
            }],
            
            "react/jsx-wrap-multilines": [ "error", {
                "declaration": "parens-new-line",
                "assignment": "parens-new-line",
                "return": "parens-new-line",
                "arrow": "parens-new-line",
                "condition": "parens-new-line",
                "logical": "parens-new-line",
                "prop": "parens-new-line"
            }],
            
            "react/jsx-max-props-per-line": [ "error", { "maximum": { "single": 3, "multi": 1 } }],
            "react/jsx-boolean-value": [ "error", "never" ],
            "react/jsx-curly-spacing": [ "error", { "when": "always", "attributes": false } ],
            "react/jsx-equals-spacing": [0],
            "react/jsx-first-prop-new-line": [ "error", "multiline" ],
            "react/jsx-closing-bracket-location": [ "error" ],
            "react/jsx-fragments": [ "error", "syntax"],
            "react/jsx-newline": [ "error", { "prevent": true, "allowMultilines": true }],
            "react/jsx-no-constructed-context-values": [ "error" ],
            "react/jsx-one-expression-per-line": [ "error", { "allow": "single-child" }],
            
            "react/jsx-tag-spacing": [ "error", {
                "closingSlash": "never",
                "beforeSelfClosing": "always",
                "afterOpening": "never",
                "beforeClosing": "never"
            }],
            
            "react/jsx-curly-newline": [ "error", {
                "multiline": "consistent",
                "singleline": "consistent"
            }],
            
            "brace-style": [0],
            "@typescript-eslint/brace-style": [0],
            "brace-rules/brace-on-same-line": ["error", { "FunctionDeclaration": "never" }, { "allowSingleLine": true  }],
            
            "jsx-a11y/no-autofocus": [0],
            " jsx-a11y/click-events-have-key-events": [0],
            
            "import/no-unresolved": [0],
            "align-import/align-import": ["error", "always"],
            
            "no-relative-import-paths/no-relative-import-paths": [
                "error",
                { "allowSameFolder": true, "rootDir": "src", "prefix": "@" }
            ],
            
            "import/order": [
                "error",
                {
                    "alphabetize": {
                        "order": "asc"
                    },
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "type",
                        [ "index", "sibling" ]
                    ],
                    "newlines-between": "always",
                    "warnOnUnassignedImports": true,
                    "pathGroups": [
                        {
                            "pattern": "src/@/**",
                            "group": "internal"
                        },
                        {
                            "pattern": "wailsjs/**",
                            "group": "internal"
                        }
                    ],
                    "pathGroupsExcludedImportTypes": ["type"]
                }
            ]
        }
    },
    {
        "files": ["**/index.tsx", "**/App.tsx", "**/main.tsx", "**/icons/*.tsx"],
        "rules": {
            "@typescript-eslint/explicit-function-return-type": [0]
        }
    }
];