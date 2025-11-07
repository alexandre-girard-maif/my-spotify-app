// Babel configuration
// Reverts to using the published `babel-plugin-transform-import-meta` to rewrite
// standard import.meta properties (url, filename, dirname, resolve) for CommonJS.
// NOTE: This plugin does NOT transform `import.meta.env.*` (Vite-specific). Tests
// relying on that pattern may need an additional transform or fallback strategy.
// Load standalone plugin that rewrites import.meta.env.* -> process.env.* for Jest compatibility.
const importMetaEnvToProcess = require('./babel.importMetaEnvPlugin.cjs');

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    importMetaEnvToProcess, // rewrite import.meta.env.VAR -> process.env.VAR
    ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]
  ]
};