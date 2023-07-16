import { ref, Ref, defineComponent } from "vue";
import { Sprite } from "@components/sprite";
import { getLine, puzzle$, rotateLine } from "@states/puzzle";
import { Line } from "@interfaces/line";
import { render } from "./template";

export const LineComponent = defineComponent({
	props: {
		id: {
			required: true,
			type: Number
		}
	},
	components: {
		Sprite
	},
	setup(props) {
		let line: Ref<() => Line> = ref(() => getLine(props.id));
		puzzle$.subscribe(() => line.value = () => getLine(props.id));

		function handleClick() {
			rotateLine(line.value().id);
		}

		return {
			line,
			handleClick
		};
	},
	render
});
