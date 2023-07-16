import { render } from "./template";
import { Sprite } from "@components/sprite";
import { CrossVariant } from "@interfaces/cross-variant";

export const CrossComponent = {
	components: {
		Sprite
	},
	setup() {
		const crossVariant = CrossVariant.Cross;

		return {
			crossVariant
		};
	},
	render
};
