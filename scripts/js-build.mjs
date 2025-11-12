// Single bundle build script: aggregates all JS in package/components/**/* into dist/monad.js
import { build } from 'esbuild';
import { glob } from 'glob';

const entryPoints = await glob('package/scripts/components/**/*.js', { nodir: true });

if (entryPoints.length === 0) {
  console.warn('[build:js] No JS files found under package/scripts/components/**/*.js');
  process.exit(0);
}

try {
  const imports = entryPoints
    .map(p => {
      const cleaned = p.replace(/^package[\\/]/, '').replace(/\\/g, '/');
      return `import './package/${cleaned}';`;
    })
    .join('\n');

  await build({
    stdin: {
      contents: imports,
      resolveDir: '.',
      sourcefile: 'virtual-entry.js',
      loader: 'js'
    },
    outfile: 'dist/scripts/monad.min.js',
    format: 'esm',
    bundle: true,
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    sourcemap: false,
    target: ['es2019'],
    platform: 'browser',
    treeShaking: true,
    legalComments: 'none',
    logLevel: 'info',
    drop: ['console', 'debugger'],
    pure: ['console.log', 'console.debug']
  });
  console.log(`[build:js] Built single bundle: dist/monad.js including ${entryPoints.length} module(s)`);
} catch (err) {
  console.error('[build:js] Failed', err);
  process.exit(1);
}
