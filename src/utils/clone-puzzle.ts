
import { Puzzle } from "@interfaces/puzzle";

export function clonePuzzle(puzzle: Puzzle): Puzzle {
	return { ...puzzle };
}
