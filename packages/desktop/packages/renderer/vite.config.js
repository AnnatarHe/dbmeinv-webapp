/* eslint-env node */

import { join } from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import pluginReactSWC from '@vitejs/plugin-react-swc'
import { renderer } from 'unplugin-auto-expose'
import { chrome } from '../../.electron-vendors.cache.json'

const PACKAGE_ROOT = __dirname
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..')

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
	mode: process.env.MODE,
	root: PACKAGE_ROOT,
	envDir: PROJECT_ROOT,
	resolve: {
		alias: {
			'/@/': join(PACKAGE_ROOT, 'src') + '/',
		},
	},
	base: '',
	server: {
		fs: {
			strict: true,
		},
	},
	build: {
		sourcemap: true,
		target: `chrome${chrome}`,
		outDir: 'dist',
		assetsDir: '.',
		rollupOptions: {
			input: join(PACKAGE_ROOT, 'index.html'),
		},
		emptyOutDir: true,
		reportCompressedSize: false,
	},
	test: {
		environment: 'happy-dom',
	},
	plugins: [
		TanStackRouterVite(),
		pluginReactSWC(),
		renderer.vite({
			preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts'),
		}),
	],
}

export default config
