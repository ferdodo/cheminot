import { Observable, Subject } from "rxjs";
import { Puzzle } from "@interfaces/puzzle";
import { puzzleGenerator } from "@utils/generate-puzzle";
import { Line } from "@interfaces/line";
import { Turn } from "@interfaces/turn";
import { Intersection } from "@interfaces/intersection";
import { LineVariant } from "@interfaces/line-variant";
import { TurnVariant } from "@interfaces/turn-variant";
import { IntersectionVariant } from "@interfaces/intersection-variant";

const puzzleIterator = puzzleGenerator();
let puzzle: Puzzle = puzzleIterator.next().value;
let moveCount = 0;

export function getMoveCount(): number {
	return moveCount;
}

const puzzleMutations$: Subject<Puzzle> = new Subject();

async function generatePuzzle() {
	for (const p of puzzleIterator) {
		puzzle = p;
	}

	puzzleMutations$.next(puzzle);
}

generatePuzzle().catch(console.error)

export function getPuzzle(): Puzzle {
	return puzzle;
}

export function getLine(id: number): Line {
	const line: Line | undefined = puzzle.lines.find(l => l.id === id);

	if (line === undefined) {
		throw new Error("Line not found !");
	}

	return line;
}

export function getTurn(id: number): Turn {
	const turn: Turn | undefined = puzzle.turns.find(t => t.id === id);

	if (turn === undefined) {
		throw new Error("Turn not found !");
	}

	return turn;
}

export function getIntersection(id: number): Intersection {
	const intersection: Intersection | undefined = puzzle.intersections.find(i => i.id === id);

	if (intersection === undefined) {
		throw new Error("Intersection not found !");
	}

	return intersection;
}

export function rotateLine(id: number) {
	const line = getLine(id);

	switch (line.variant) {
		case LineVariant.Line1:
			line.variant = LineVariant.Line2;
			break;
		case LineVariant.Line2:
			line.variant = LineVariant.Line1;
			break;
	}

	moveCount++;
	puzzleMutations$.next(puzzle);
}

export function rotateTurn(id: number) {
	const turn  = getTurn(id);

	switch (turn.variant) {
		case TurnVariant.Turn1:
			turn.variant = TurnVariant.Turn2;
			break;
		case TurnVariant.Turn2:
			turn.variant = TurnVariant.Turn3;
			break;
		case TurnVariant.Turn3:
			turn.variant = TurnVariant.Turn4;
			break;
		case TurnVariant.Turn4:
			turn.variant = TurnVariant.Turn1;
			break;
	}

	moveCount++;
	puzzleMutations$.next(puzzle);
}

export function rotateIntersection(id: number) {
	const intersection = getIntersection(id);

	switch (intersection.variant) {
		case IntersectionVariant.Intersection1:
			intersection.variant = IntersectionVariant.Intersection2;
			break;
		case IntersectionVariant.Intersection2:
			intersection.variant = IntersectionVariant.Intersection3;
			break;
		case IntersectionVariant.Intersection3:
			intersection.variant = IntersectionVariant.Intersection4;
			break;
		case IntersectionVariant.Intersection4:
			intersection.variant = IntersectionVariant.Intersection1;
			break;
	}

	moveCount++;
	puzzleMutations$.next(puzzle);
}

export const puzzle$: Observable<Puzzle> = new Observable(function(subscriber) {
	puzzleMutations$.subscribe(function(value) {
		puzzle = value;
		subscriber.next(puzzle);
	});
});
