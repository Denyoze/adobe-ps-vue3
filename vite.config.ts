import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

import uxpHotReload from "./devtools/vite-plugins/uxp-hot-reload";

export default defineConfig({
	plugins: [
		vue(),

		viteStaticCopy({
			targets: [{ src: "uxp/*", dest: "" }]
		}),

		uxpHotReload({
			// port: 1337
		})
	],

	build: {
		outDir: "dist",
		sourcemap: false,
		cssCodeSplit: false,
		modulePreload: false,

		rollupOptions: {
			input: "./src/main.ts",
			external: ["uxp", "os", "fs", "photoshop"],
			output: {
				manualChunks: undefined,
				format: "iife",
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
				esModule: false
			}
		}
	}
});
