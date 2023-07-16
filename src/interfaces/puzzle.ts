import { Block } from "@interfaces/block";
import { Turn } from "@interfaces/turn";
import { Line } from "@interfaces/line";
import { Intersection } from "@interfaces/intersection";
import { Cross } from "@interfaces/cross";

export interface Puzzle {
	turns: Turn[],
	lines: Line[],
	intersections: Intersection[],
	crosses: Cross[],
	block: Block
}
