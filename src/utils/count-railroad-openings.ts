import { getRailroadOpenings } from "@utils/get-railroad-openings";
import { Puzzle } from "@interfaces/puzzle";

export function countRailroadOpenings(puzzle: Puzzle, x: number, y: number): number {
	const openingTop = getRailroadOpenings(puzzle, x, y - 1);
	const openingBottom = getRailroadOpenings(puzzle, x, y + 1);
	const openingRight = getRailroadOpenings(puzzle, x + 1, y);
	const openingLeft = getRailroadOpenings(puzzle, x - 1, y);
	const opening = getRailroadOpenings(puzzle, x, y);
	let count = 0;

	if (opening.Top && !openingTop.Bottom) {
		count++;
	}

	if (opening.Right && !openingRight.Left) {
		count++;
	}

	if (opening.Bottom && !openingBottom.Top) {
		count++;
	}

	if (opening.Left && !openingLeft.Right) {
		count++;
	}


	return count;
}
