import { randomNumber } from "@utils/random-number";
import { RailroadKind } from "@interfaces/railroad-kind";
import { Line } from "@interfaces/line";
import { LineVariant } from "@interfaces/line-variant";
import { generateId } from "@utils/generate-id";

export function generateLine(x = 0, y = 0): Line {
	const random = randomNumber(0, 99);
	const variant = random > 50 ? LineVariant.Line1 : LineVariant.Line2

	return {
		id: generateId(),
		kind: RailroadKind.Line,
		variant,
		block: { x, y, w: 1, h: 1 }
	};
}
