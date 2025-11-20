import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
	plugins: [
		vue(),

		viteStaticCopy({
			targets: [{ src: "uxp/*", dest: "" }],
		}),
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
				esModule: false,
			},
		},
	},
});
