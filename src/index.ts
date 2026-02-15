import { createApp, ref, Ref } from "vue";
import { LineComponent } from "@components/line";
import { TurnComponent } from "@components/turn";
import { getPuzzle, puzzle$, getMoveCount, getTimeRemaining, gameLost$, stopTimer } from "@states/puzzle";
import { Puzzle } from "@interfaces/puzzle";
import { IntersectionComponent } from "@components/intersection"
import { CrossComponent } from "@components/cross";
import { TimerComponent } from "@components/timer";
import { render } from "./template";
import { someRailroadOpenned } from "@utils/some-railroad-openned";
import confetti from "canvas-confetti";
import "crumbs-design-system";

const app = createApp({
	components: {
		LineComponent,
		TurnComponent,
		IntersectionComponent,
		CrossComponent,
		TimerComponent
	},
	setup() {
		const puzzle: Ref<() => Puzzle> = ref(getPuzzle);
		const win: Ref<boolean> = ref(false);
		const lost: Ref<boolean> = ref(false);
		let shared = false;
		puzzle$.subscribe(value => puzzle.value = () => value);

		gameLost$.subscribe(function() {
			lost.value = true;
			stopTimer();
		});

		puzzle$.subscribe(function(value) {
			puzzle.value = () => value

			if (!someRailroadOpenned(value) && !lost.value) {
				win.value = true;
				stopTimer();

				//@ts-ignore
				if (window.opener?.registerScore) {
					const moveCount = getMoveCount();
					//@ts-ignore
					window.opener.registerScore("cheminot", moveCount);
					window.close();
				}
			}
		});

		function share() {
			const date = new Date();
			const year = date.getFullYear();
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const day = ('0' + date.getDate()).slice(-2);
			const formattedDate = `${year}/${month}/${day}`;
			const moveCount = getMoveCount();
			const timeRemaining = getTimeRemaining();
			const minutes = Math.floor(timeRemaining / 60);
			const seconds = timeRemaining % 60;
			const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
			let text = `Cheminot ${formattedDate} - Puzzle réussi en ${ moveCount } rotations de rail (Temps restant: ${formattedTime}).`;

			if (!shared) {
				confetti();
				shared = true;
			}

			text += `\n\nhttps://ferdodo.github.io/cheminot`;
			navigator.clipboard.writeText(text);
		}

		return {
			puzzle,
			win,
			lost,
			share
		};
	},
	render
});

app.mount("body");
