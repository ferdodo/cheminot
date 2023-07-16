import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	root: "./public",
	plugins: [tsconfigPaths()],
	resolve: {
		alias: {
			"/bundle.js": "../src/index.ts"
		}
	},
	build: {
		sourcemap: true
	}
});
