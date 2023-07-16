import { RailroadKind } from "@interfaces/railroad-kind";
import { Cross } from "@interfaces/cross";
import { CrossVariant } from "@interfaces/cross-variant";
import { generateId } from "@utils/generate-id";

export function generateCross(x = 0, y = 0): Cross {
	return {
		id: generateId(),
		kind: RailroadKind.Cross,
		variant: CrossVariant.Cross,
		block: { x, y, w: 1, h: 1 }
	};
}
