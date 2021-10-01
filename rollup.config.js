import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';

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

		svelte(),

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
		globals(),
		//builtins(),
		//babel({exclude: "node_modules/**"}),
		del({targets: 'wwwroot/build/*'}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

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
