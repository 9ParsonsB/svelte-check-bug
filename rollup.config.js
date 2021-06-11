import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';
import json from "@rollup/plugin-json";
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import alias from '@rollup/plugin-alias';

let genSvelteConfig = require('./svelte.config.js').createModule;
const production = false;
const port = process.env.PORT;
const buildDir = 'wwwroot/build';

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'esm',
		name: 'app',
		//file: 'wwwroot/bundle.js'
		dir: buildDir,
		assetFileNames: "[name][extname]",
		minifyInternalExports: !production
	},
    plugins: [

		typescript({ sourceMap: !production, inlineSources: !production }),

		svelte(genSvelteConfig(!production)),

        alias({
            resolve: [".svelte", ".ts"],
            entries: [
                { find: '$src', replacement: "src" },
                { find: '$routes', replacement: "src/routes" },
                { find: '$components', replacement: "src/components" },
                { find: '$scripts', replacement: "src/scripts" },
                { find: '$stores', replacement: "src/scripts/stores" },
                { find: '$types', replacement: "src/scripts/types" },
                { find: '$api', replacement: "src/scripts/api" }
            ]
        }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs({
			requireReturnsDefault: "auto",
			extensions: ['.js'],
			exclude: ["src"],
			sourceMap: !production,
			inlineSources: !production
		}),
		json(),
		globals(),
		//builtins(),
		//babel({exclude: "node_modules/**"}),
		postcss({extract: true, extract: "bundle.css", sourceMap: "inline", minimize: false, plugins: [require('autoprefixer')]}),
		del({targets: 'wwwroot/build/*'}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		//!production && serve(),

		// Watch the `wwwroot` directory and refresh the
		// browser on changes when not in production
		// note that livereload will not work when running under aspnetcore. use the livereload nuget package when running under aspnetcore
		// !production && livereload({
		//         watch: './wwwroot',
		//         port,
		//     }),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
