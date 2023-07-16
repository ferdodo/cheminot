import { randomNumber } from "@utils/random-number";
import { RailroadKind } from "@interfaces/railroad-kind";
import { Intersection } from "@interfaces/intersection";
import { IntersectionVariant } from "@interfaces/intersection-variant";
import { generateId } from "@utils/generate-id";

export function generateIntersection(x = 0, y = 0): Intersection {
	let variant;

	if (randomNumber(0, 99) < 25) {
		variant = IntersectionVariant.Intersection1;
	} else if (randomNumber(0, 99) < 25) {
		variant = IntersectionVariant.Intersection2;
	} else if (randomNumber(0, 99) < 25) {
		variant = IntersectionVariant.Intersection3;
	} else {
		variant = IntersectionVariant.Intersection4;
	}

	return {
		id: generateId(),
		kind: RailroadKind.Intersection,
		variant,
		block: { x, y, w: 1, h: 1 }
	};
}
