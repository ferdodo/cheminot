import { ref, Ref } from "vue";
import { render } from "./template";
import { time$ } from "@states/puzzle";

export const TimerComponent = {
	setup() {
		const timeRemaining: Ref<number> = ref(120);

		time$.subscribe(value => {
			timeRemaining.value = value;
		});

		function formatTime(seconds: number): string {
			const minutes = Math.floor(seconds / 60);
			const secs = seconds % 60;
			return `${minutes}:${String(secs).padStart(2, '0')}`;
		}

		return {
			timeRemaining,
			formatTime
		};
	},
	render
};
