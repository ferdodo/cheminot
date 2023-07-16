import { randomNumber } from "@utils/random-number";
import { RailroadKind } from "@interfaces/railroad-kind";
import { Turn } from "@interfaces/turn";
import { TurnVariant } from "@interfaces/turn-variant";
import { generateId } from "@utils/generate-id";

export function generateTurn(x = 0, y = 0): Turn {
	let variant;

	if (randomNumber(0, 99) < 25) {
		variant = TurnVariant.Turn1;
	} else if (randomNumber(0, 99) < 25) {
		variant = TurnVariant.Turn2;
	} else if (randomNumber(0, 99) < 25) {
		variant = TurnVariant.Turn3;
	} else {
		variant = TurnVariant.Turn4;
	}

	return {
		id: generateId(),
		kind: RailroadKind.Turn,
		variant,
		block: { x, y, w: 1, h: 1 }
	};
}
