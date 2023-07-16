import { Puzzle } from "@interfaces/puzzle";
import { generateLine } from "@utils/generate-line";
import { generateCross } from "@utils/generate-cross";
import { generateIntersection } from "@utils/generate-intersection";
import { generateTurn } from "@utils/generate-turn";
import { countRailroadOpenings } from "@utils/count-railroad-openings";
import { randomNumber } from "@utils/random-number";
import { clonePuzzle } from "@utils/clone-puzzle";
import { someRailroadOpenned } from "@utils/some-railroad-openned";

export function * puzzleGenerator(): Generator<Puzzle> {
	let puzzle: Puzzle = {
		lines: [],
		turns: [],
		intersections: [],
		crosses: [],
		block: { x: 0, y: 0, w: 10, h: 10 }
	};

	for (let x = 0; x < puzzle.block.w; x++) {
		for (let y = 0; y < puzzle.block.h; y++) {
			puzzle.lines.push(generateLine(x, y));
		}
	}

	while(someRailroadOpenned(puzzle)) {
		const openingsBefore = countPuzzleOpennings(puzzle);

		let replacedPuzzle;
	
		if (randomNumber(0, 99) < 25 && puzzle.lines.length) {
			const railroad = puzzle.lines[randomNumber(0, puzzle.lines.length)];
			replacedPuzzle = replaceOpenedRailroad(puzzle, railroad.id, railroad.block.x, railroad.block.y);
		} else if (randomNumber(0, 99) < 25 && puzzle.turns.length) {
			const railroad = puzzle.turns[randomNumber(0, puzzle.turns.length)];
			replacedPuzzle = replaceOpenedRailroad(puzzle, railroad.id, railroad.block.x, railroad.block.y);
		} else if (randomNumber(0, 99) < 25 && puzzle.intersections.length) {
			const railroad = puzzle.intersections[randomNumber(0, puzzle.intersections.length)];
			replacedPuzzle = replaceOpenedRailroad(puzzle, railroad.id, railroad.block.x, railroad.block.y);
		} else if (puzzle.crosses.length) {
			const railroad = puzzle.crosses[randomNumber(0, puzzle.crosses.length)];
			replacedPuzzle = replaceOpenedRailroad(puzzle, railroad.id, railroad.block.x, railroad.block.y);
		} else {
			continue;
		}

		const openingsAfter = countPuzzleOpennings(replacedPuzzle);

		if (openingsAfter > openingsBefore) {
			continue;
		}

		puzzle = replacedPuzzle;
		yield puzzle;
	}

	puzzle.lines = puzzle.lines.map(line => generateLine(line.block.x, line.block.y));
	puzzle.turns = puzzle.turns.map(turn => generateTurn(turn.block.x, turn.block.y));
	puzzle.intersections = puzzle.intersections.map(intersection => generateIntersection(intersection.block.x, intersection.block.y));


	yield puzzle;
}

function countPuzzleOpennings(puzzle: Puzzle): number {
	let count = 0;

	const railroads = [
		...puzzle.lines,
		...puzzle.turns,
		...puzzle.intersections,
		...puzzle.crosses	
	];

	for (const railroad of railroads) {
		count += countRailroadOpenings(puzzle, railroad.block.x, railroad.block.y);
	}

	return count;
}

function replaceOpenedRailroad(puzzle: Puzzle, id: number, x: number, y: number): Puzzle {
	let newPuzzle = clonePuzzle(puzzle);
	newPuzzle.lines = newPuzzle.lines.filter(r => r.id != id);
	newPuzzle.turns = newPuzzle.turns.filter(r => r.id != id);
	newPuzzle.intersections = newPuzzle.intersections.filter(r => r.id != id);
	newPuzzle.crosses = newPuzzle.crosses.filter(r => r.id != id);

	if (randomNumber(0, 99) < 25) {
		const line = generateLine(x, y);
		newPuzzle.lines.push(line);
	} else if (randomNumber(0, 99) < 25) {
		const turn = generateTurn(x, y);
		newPuzzle.turns.push(turn);
	} else if (randomNumber(0, 99) < 25 || newPuzzle.crosses.length > 4) {
		const intersection = generateIntersection(x, y);
		newPuzzle.intersections.push(intersection);
	} else if (randomNumber(0, 100) > 2 || true) {
		const cross = generateCross(x, y);
		newPuzzle.crosses.push(cross);
	}

	return newPuzzle;
}
