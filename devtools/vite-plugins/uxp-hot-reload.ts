import type { Plugin } from "vite";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";

interface UxpHotReloadOptions {
	port?: number;
}

export interface WSEvent {
	name: "build";
	timestamp: number;
}

const DEFAULT_PORT = 1337;

export default function uxpHotReload(
	options: UxpHotReloadOptions = {}
): Plugin {
	const port = options.port ?? DEFAULT_PORT;

	let server: http.Server | null = null;
	const clients = new Set<WebSocket>();

	function setupWSS() {
		if (server) {
			return;
		}

		//

		function wssOnConnection(ws: WebSocket) {
			clients.add(ws);
			console.log(`[uxp-hot-reload]: client connected (${clients.size})`);
		}

		function wssOnClose(ws: WebSocket) {
			clients.delete(ws);
			console.log(
				`[uxp-hot-reload]: client disconnected (${clients.size})`
			);
		}

		function serverListener() {
			console.log(
				`[uxp-hot-reload]: WS server on ws://localhost:${port}`
			);
		}

		//

		server = http.createServer();
		const wss = new WebSocketServer({ server });

		wss.on("connection", wssOnConnection);
		wss.on("close", wssOnClose);

		server.listen(port, serverListener);
	}

	function sendBuildNotification() {
		if (!server) {
			console.warn("uxp-hot-reload]: server is not created");
			return;
		}

		const event: WSEvent = {
			name: "build",
			timestamp: Date.now()
		};

		const message = JSON.stringify(event);

		for (const ws of clients) {
			if (ws.readyState !== WebSocket.OPEN) {
				continue;
			}

			ws.send(message);
		}
	}

	return {
		name: "vite-plugin-uxp-hot-reload",
		apply: "build",

		config() {
			return {
				define: {
					__UXP_HOT_RELOAD_PORT__: port
				}
			};
		},

		buildStart() {
			setupWSS();
		},

		closeBundle() {
			sendBuildNotification();
		}
	};
}
