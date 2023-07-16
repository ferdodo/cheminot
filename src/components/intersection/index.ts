import { render } from "./template";
import { Sprite } from "@components/sprite";
import { ref, Ref, defineComponent } from "vue";
import { puzzle$, getIntersection, rotateIntersection } from "@states/puzzle";
import { Intersection } from "@interfaces/intersection";

export const IntersectionComponent = defineComponent({
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
		const intersection: Ref<() => Intersection> = ref(() => getIntersection(props.id));
		puzzle$.subscribe(() => intersection.value = () => getIntersection(props.id));

		function handleClick() {
			rotateIntersection(props.id);
		}

		return {
			intersection,
			handleClick
		};
	},
	render
});
