const sveltePreprocess = require('svelte-preprocess');
const autoPrefixer = require('autoprefixer');
const postCssScrollbar = require('postcss-scrollbar');
const postNormalize = require('postcss-normalize');

module.exports = { ...createModule(true), createModule };

function createModule(production) {
    return {
        // enable run-time checks when not in production
        compilerOptions: { dev: !production, sourcemap: !production, hydratable: true },
        preprocess: sveltePreprocess({
            sourceMap: "inline",
            postcss: {
                plugins: [postCssScrollbar(), autoPrefixer(), postNormalize()]
            }
            //minify: false,
            //css: css => {css.minify = false;}
        }),
        onwarn: (warning, handler) => {
            // ignore warnings from App.svelte (where we import bootstrap) if the warning is for unused css selectors
            if (warning.filename === 'src\\App.svelte' && warning.code === 'css-unused-selector') return;
            handler(warning);
        },

        // ...other svelte options
    };
}
