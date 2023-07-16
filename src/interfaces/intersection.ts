import { RailroadKind } from "@interfaces/railroad-kind";
import { Block } from "@interfaces/block";
import { IntersectionVariant } from "@interfaces/intersection-variant";

export interface Intersection {
	id: number,
	kind: RailroadKind.Intersection,
	variant: IntersectionVariant,
	block: Block
}
