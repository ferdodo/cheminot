import { Puzzle } from "@interfaces/puzzle";
import { Line } from "@interfaces/line";
import { Turn } from "@interfaces/turn";
import { Intersection } from "@interfaces/intersection";
import { LineVariant } from "@interfaces/line-variant";
import { TurnVariant } from "@interfaces/turn-variant";
import { IntersectionVariant }  from "@interfaces/intersection-variant";
import { RailroadOpenings } from "@interfaces/railroad-openings";

export function getRailroadOpenings(puzzle: Puzzle, x: number, y: number): RailroadOpenings {
	for (const line of puzzle.lines) {
		if (line.block.x === x && line.block.y === y) {
			return getLineOpenings(line);
		}
	}

	for (const turn of puzzle.turns) {
		if (turn.block.x === x && turn.block.y === y) {
			return getTurnOpenings(turn);
		}
	}

	for (const intersection of puzzle.intersections) {
		if (intersection.block.x === x && intersection.block.y === y) {
			return getIntersectionOpenings(intersection);
		}
	}

	for (const cross of puzzle.crosses) {
		if (cross.block.x === x && cross.block.y === y) {
			return getCrossOpenings();
		}		
	}

	return { Right: false, Left: false, Top: false, Bottom: false };
}

function getLineOpenings(line: Line): RailroadOpenings {
	switch (line.variant) {
		case LineVariant.Line1:
			return { Right: true, Left: true, Top: false, Bottom: false };
		case LineVariant.Line2:
			return { Right: false, Left: false, Top: true, Bottom: true };
	}
}

function getTurnOpenings(turn: Turn): RailroadOpenings {
	switch (turn.variant) {
		case TurnVariant.Turn1:
			return { Right: false, Left: true, Top: false, Bottom: true };
		case TurnVariant.Turn2:
			return { Right: true, Left: false, Top: true, Bottom: false };
		case TurnVariant.Turn3:
			return { Right: false, Left: true, Top: true, Bottom: false };
		case TurnVariant.Turn4:
			return { Right: true, Left: false, Top: false, Bottom: true};
	}
}

function getIntersectionOpenings(intersection: Intersection): RailroadOpenings {
	switch (intersection.variant) {
		case IntersectionVariant.Intersection1:
			return { Right: true, Left: true, Top: false, Bottom: true };
		case IntersectionVariant.Intersection2:
			return { Right: false, Left: true, Top: true, Bottom: true };
		case IntersectionVariant.Intersection3:
			return { Right: true, Left: false, Top: true, Bottom: true };
		case IntersectionVariant.Intersection4:
			return { Right: true, Left: true, Top: true, Bottom: false };
	}
}

function getCrossOpenings(): RailroadOpenings {
	return { Right: true, Left: true, Top: true, Bottom: true };
}
