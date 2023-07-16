import { Puzzle } from "@interfaces/puzzle";
import { countRailroadOpenings } from "@utils/count-railroad-openings";

export function someRailroadOpenned(puzzle: Puzzle): boolean {
	if (puzzle.lines.some(railroad => countRailroadOpenings(puzzle, railroad.block.x, railroad.block.y))) {
		return true;
	}

	if (puzzle.turns.some(railroad => countRailroadOpenings(puzzle, railroad.block.x, railroad.block.y))) {
		return true;
	}

	if (puzzle.intersections.some(railroad => countRailroadOpenings(puzzle, railroad.block.x, railroad.block.y))) {
		return true;
	}

	if (puzzle.crosses.some(railroad => countRailroadOpenings(puzzle, railroad.block.x, railroad.block.y))) {
		return true;
	}

	return false;
}

