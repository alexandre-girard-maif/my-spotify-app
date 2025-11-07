// Custom Babel configuration.
// We need tests (running under Jest's CommonJS transform) to handle `import.meta.env.*`
// which is a Vite-specific enhancement. The external `babel-plugin-transform-import-meta`
// only rewrites known standard properties like `url`, `filename`, etc. and will throw
// when given an unsupported target (we incorrectly passed ESNext). Moreover it does not
// touch `import.meta.env`. To make test execution reliable without heavy mocking, we
// inline a very small custom plugin that rewrites `import.meta.env.VAR` to
// `process.env.VAR`, which is safe in the Jest environment. This preserves runtime
// semantics for our current usage (simple presence checks) while avoiding syntax errors.

function transformImportMetaEnv() {
  const t = require('@babel/types');
  return {
    name: 'transform-import-meta-env',
    visitor: {
      MemberExpression(path) {
        const { node } = path;
        // Match pattern: import.meta.env.VAR
        // AST shape: MemberExpression (object = MemberExpression(import.meta.env), property = Identifier(VAR))
        if (
          node.object &&
          node.object.type === 'MemberExpression' &&
          node.object.object &&
          node.object.object.type === 'MetaProperty' &&
          node.object.object.meta.name === 'import' &&
          node.object.object.property.name === 'meta' &&
          node.object.property &&
          node.object.property.type === 'Identifier' &&
          node.object.property.name === 'env'
        ) {
          // Replace with process.env.VAR
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
    transformImportMetaEnv,
    ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]
  ]
};