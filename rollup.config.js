import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import copy from 'rollup-plugin-copy'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProduction = NODE_ENV === 'production'
const outputFile = isProduction ? 'dist/prod.min.js' : 'dist/dev.js'

export default {
	input: pkg.source,
	output: {
		file: outputFile,
		format: 'cjs',
	},
	plugins: [
		external(),
		replace({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
		}),
		postcss({
			modules: true,
		}),
		copy({
			targets: [
				{
					src: 'public/main.js',
					dest: 'dist',
					rename: 'index.js',
				},
			],
		}),
		babel({
			exclude: 'node_modules/**',
		}),
		resolve({
			extensions: ['.js', '.jsx'],
		}),
		commonjs(),
		isProduction && uglify(),
	],
}
