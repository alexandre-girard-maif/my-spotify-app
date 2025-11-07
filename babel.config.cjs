// Babel configuration
// Reverts to using the published `babel-plugin-transform-import-meta` to rewrite
// standard import.meta properties (url, filename, dirname, resolve) for CommonJS.
// NOTE: This plugin does NOT transform `import.meta.env.*` (Vite-specific). Tests
// relying on that pattern may need an additional transform or fallback strategy.
// Inline helper plugin ONLY for Vite-style import.meta.env.* so tests don't crash.
function importMetaEnvToProcess() {
  const t = require('@babel/types');
  return {
    name: 'import-meta-env-to-process',
    visitor: {
      MemberExpression(path) {
        const { node } = path;
        if (
          node.object?.type === 'MemberExpression' &&
          node.object.object?.type === 'MetaProperty' &&
          node.object.object.meta.name === 'import' &&
          node.object.object.property.name === 'meta' &&
          node.object.property?.type === 'Identifier' &&
          node.object.property.name === 'env'
        ) {
          path.replaceWith(
            t.memberExpression(
              t.memberExpression(t.identifier('process'), t.identifier('env')),
              node.property
            )
          );
        }
      }
    }
  };
}

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    importMetaEnvToProcess, // rewrite import.meta.env.VAR -> process.env.VAR
    ["babel-plugin-transform-import-meta", { module: "CommonJS" }],
    ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]
  ]
};