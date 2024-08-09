import { createApp, ref, Ref } from "vue";
import { LineComponent } from "@components/line";
import { TurnComponent } from "@components/turn";
import { getPuzzle, puzzle$, getMoveCount } from "@states/puzzle";
import { Puzzle } from "@interfaces/puzzle";
import { IntersectionComponent } from "@components/intersection"
import { CrossComponent } from "@components/cross";
import { render } from "./template";
import { someRailroadOpenned } from "@utils/some-railroad-openned";
import confetti from "canvas-confetti";
import "cookies-ds";

const app = createApp({
	components: {
		LineComponent,
		TurnComponent,
		IntersectionComponent,
		CrossComponent
	},
	setup() {
		const puzzle: Ref<() => Puzzle> = ref(getPuzzle);
		const win: Ref<boolean> = ref(false);
		let shared = false;
		puzzle$.subscribe(value => puzzle.value = () => value);

		puzzle$.subscribe(function(value) {
			puzzle.value = () => value

			if (!someRailroadOpenned(value)) {
				win.value = true;

				//@ts-ignore
				if (window.opener?.registerScore) {
					const moveCount = getMoveCount();
					//@ts-ignore
					window.opener.registerScore("cheminot", -moveCount);
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
			let text = `Cheminot ${formattedDate} - Puzzle réussi en ${ moveCount } rotations de rail.`;

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
			share
		};
	},
	render
});

app.mount("body");
