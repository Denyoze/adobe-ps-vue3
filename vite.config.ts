import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

import uxpHotReload from "./devtools/vite-plugins/uxp-hot-reload";
import uxpIndexFix from "./devtools/vite-plugins/uxp-index-fix";

export default defineConfig(({ mode }) => ({
	plugins: [
		uxpIndexFix(),

		vue({
			template: {
				compilerOptions: {
					// treat all tags with a dash as custom elements
					isCustomElement: (tag) => tag.includes("-")
				}
			}
		}),

		mode !== "production" &&
			uxpHotReload({
				// port: 1337
			})
	].filter(Boolean),

	publicDir: "uxp",

	optimizeDeps: {
		exclude: ["photoshop"]
	},

	build: {
		assetsDir: ".",
		target: "esnext",
		outDir: "dist",
		emptyOutDir: true,
		cssCodeSplit: false,
		sourcemap: "inline",

		rollupOptions: {
			external: [
				"photoshop",
				"uxp",
				"fs",
				"os",
				"path",
				"process",
				"shell"
			],
			output: {
				manualChunks: undefined,
				format: "iife",
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
				esModule: false
			}
		}
	},

	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	}
}));
