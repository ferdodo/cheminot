import { Block } from "@interfaces/block";
import { RailroadKind } from "@interfaces/railroad-kind";
import { LineVariant } from "@interfaces/line-variant";
import { TurnVariant } from "@interfaces/turn-variant";

export interface Railroad {
	id: number,
	kind: RailroadKind,
	variant: LineVariant | TurnVariant,
	block: Block
}
