import { PropType, defineComponent } from "vue";
import { LineVariant } from "@interfaces/line-variant";
import { TurnVariant } from "@interfaces/turn-variant";
import { render } from "./template";

export const Sprite = defineComponent({
	props: {
		picture: {
			type: String as PropType<LineVariant | TurnVariant>,
			required: true
		}
	},
	render
});
