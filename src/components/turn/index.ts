import { render } from "./template";
import { Sprite } from "@components/sprite";
import { Turn } from "@interfaces/turn";
import { ref, Ref, defineComponent } from "vue";
import { puzzle$, getTurn, rotateTurn } from "@states/puzzle";

export const TurnComponent = defineComponent({
	components: {
		Sprite
	},
	props: {
		id: {
			type: Number,
			required: true
		}
	},
	setup(props) {
		const turn: Ref<() => Turn> = ref(() => getTurn(props.id));
		puzzle$.subscribe(() => turn.value = () => getTurn(props.id));

		function handleClick() {
			rotateTurn(props.id);
		}

		return {
			turn,
			handleClick
		};
	},
	render
});
