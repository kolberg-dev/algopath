import { writable } from 'svelte/store';
import Node from './Node.js';
let gridColumns = 0;
let gridRows = 0;

function ini(columns, rows) {
	gridColumns = columns;
	gridRows = rows;
	return newGrid(columns, rows);
}

function newGrid(columns, rows) {
	let grid = [...Array(columns)].map((_, row) =>
		[...Array(rows)].map((_, column) => new Node(row, column))
	);
	let centerX = Math.floor(grid.length / 2);
	let centerY = Math.floor(grid[0].length / 2);
	grid[centerX - 5][centerY].setType('start');
	grid[centerX + 5][centerY].setType('target');
	return grid;
}

function createGrid() {
	const { subscribe, set, update } = writable([]);
	return {
		subscribe,
		init: (columns, rows) => set(ini(columns, rows)),
		set,
		reset: () => set(newGrid(gridColumns, gridRows)),
		forceUpdate: () => update((n) => n)
	};
}

export const reset = () => {
	grid.reset();
	status.set('');
};

export const grid = createGrid();
export const status = writable('');
export const longest = writable(0);
export const start = writable({ row: undefined, column: undefined });
export const end = writable({ row: undefined, column: undefined });
export const activeDrawer = writable('wall');
export const animationSpeed = writable('15');
