export type Player = 'X' | 'O';
export type Board = (Player | null)[];
export interface State {
	winner: Player | null,
	currentStep: number,
	histories: Board[],
}