import type { Plugin } from "vite";
export default function uxpIndexFix(): Plugin {
	return {
		name: "uxp-index-fix",
		async transformIndexHtml(html) {
			return html
				.replace(' rel="modulepreload', "")
				.replace(' type="module" crossorigin', "")
				.replace(/\n+/g, "")
				.replace(/>\s+</g, "><")
				.trim();
		}
	};
}
