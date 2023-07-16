import { RailroadKind } from "@interfaces/railroad-kind";
import { Block } from "@interfaces/block";
import { CrossVariant } from "@interfaces/cross-variant";

export interface Cross {
	id: number,
	kind: RailroadKind.Cross,
	variant: CrossVariant,
	block: Block
}
