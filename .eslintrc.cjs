module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            },
        }
    ],
    "ignorePatterns": [".eslintrc.cjs", "vite-env.d.ts", "*.config.ts"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/semi": ["error", "always", {
            "omitLastInOneLineBlock": true,
            "omitLastInOneLineClassBody": true,
        }],
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "react/react-in-jsx-scope": "off",
    },
    "settings": {
        "react": {
            "version": "detect",
        },
    },
}
