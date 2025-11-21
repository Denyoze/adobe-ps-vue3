import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";

const ScrollRestoration = {
	auto: "auto",
	manual: "manual"
};

// History API //
const CustomHistoryAPI = {
	length: 1,
	scrollRestoration: ScrollRestoration.auto,
	state: null,
	historyStack: [] as any[],
	currentIndex: -1,

	back() {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			const state = this.historyStack[this.currentIndex];
			this.state = state;
		}
	},

	forward() {
		if (this.currentIndex < this.historyStack.length - 1) {
			this.currentIndex++;
			const state = this.historyStack[this.currentIndex];
			this.state = state;
		}
	},

	go(delta = 0) {
		const newIndex = this.currentIndex + delta;
		if (newIndex >= 0 && newIndex < this.historyStack.length) {
			this.currentIndex = newIndex;
			const state = this.historyStack[this.currentIndex];
			this.state = state;
		}
	},

	pushState(data: any, unused: any, url = null) {
		this.state = data;
		this.historyStack.splice(this.currentIndex + 1);
		this.historyStack.push(data);
		this.currentIndex = this.historyStack.length - 1;
	},

	replaceState(data: any, unused: any, url = null) {
		this.state = data;
		this.historyStack[this.currentIndex] = data;
	}
};

window.history = CustomHistoryAPI as History;

//

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: MainView
		}
	]
});

export default router;