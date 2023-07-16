#!/usr/bin/env zx
import { runTask } from "zx-run-task";

async function buildVueTemplates() {
	await runTask("Bundle frontend", $`make`);
}

async function buildFrontend() {
	await runTask("Bundle frontend", $`
		npx --no-install esbuild --bundle src/index.ts \
			--define:__VUE_OPTIONS_API__=false \
			--define:__VUE_PROD_DEVTOOLS__=false \
			--target=chrome80 \
			--outfile=public/bundle.js \
			--minify \
			--tree-shaking=true \
			--sourcemap
	`);
}

async function checkFrontendTypings() {
	await runTask("Checking frontend typings", $`npx tsc`);
}

await buildVueTemplates();

await Promise.all([
	buildFrontend(),
	checkFrontendTypings()
]);
