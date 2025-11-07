// Standalone Babel plugin to rewrite Vite-style import.meta.env.VAR to process.env.VAR
// This keeps test environment stable under Jest (CommonJS) while allowing runtime env checks.
module.exports = function importMetaEnvToProcess() {
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
};
