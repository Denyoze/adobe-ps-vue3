import { type WSEvent } from "../devtools/vite-plugins/uxp-hot-reload";

export default function () {
	if (import.meta.env.MODE == "production") {
		return;
	}

	const port = __UXP_HOT_RELOAD_PORT__;

	//

	function wsOnOpen() {
		console.log("[uxp-hot-reload]: connected");
	}

	function wsOnClose() {
		console.warn("[uxp-hot-reload]: disconnected - hot reload disabled!");
	}

	function wsOnError() {
		console.warn("[uxp-hot-reload]: cannot connect to hot reload server");
	}

	function wsOnMessage(e: MessageEvent<string>) {
		const data = JSON.parse(e.data) as WSEvent;

		if (data.name == "build") {
			console.log(`[uxp-hot-reload]: new build detected, reloading...`);
			location.reload();
		}
	}

	//

	const ws = new WebSocket(`ws://localhost:${port}`);

	ws.onopen = wsOnOpen;
	ws.onclose = wsOnClose;
	ws.onerror = wsOnError;
	ws.onmessage = wsOnMessage;
}
