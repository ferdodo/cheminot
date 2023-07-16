import { RailroadKind } from "@interfaces/railroad-kind";
import { Block } from "@interfaces/block";
import { LineVariant } from "@interfaces/line-variant";

export interface Line {
	id: number,
	kind: RailroadKind.Line,
	variant: LineVariant,
	block: Block
}
