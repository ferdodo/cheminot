import { RailroadKind } from "@interfaces/railroad-kind";
import { Block } from "@interfaces/block";
import { TurnVariant } from "@interfaces/turn-variant";

export interface Turn {
	id: number,
	kind: RailroadKind.Turn,
	variant: TurnVariant,
	block: Block
}
