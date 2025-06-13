import { Component } from 'react'
import type { Player, State } from './types'

export class Tictac extends Component<{}, State> {

    state: State = {
        winner: null,
        currentStep: 0,
        histories: [new Array(9).fill(null)]
    }

    getNextPlayer = () => {
        const board = this.state.histories[this.state.currentStep];
        const filteredBoard = board.filter(Boolean);
        const nextPlayer: Player = filteredBoard.length % 2 === 0 ? 'X' : 'O'

        return nextPlayer;
    }

    nextMove(moveIdx: number) {
        if (this.state.winner) return;

        const board = [...this.state.histories[this.state.currentStep]]

        const isEmpty = board[moveIdx] === null
        if (!isEmpty) return;

        const nextPlayer = this.getNextPlayer();
        board[moveIdx] = nextPlayer;

        if (this.state.currentStep + 1 === this.state.histories.length) {
            this.setState(
                {
                    histories: [...this.state.histories, board],
                    currentStep: this.state.currentStep + 1
                },
                () => {
                    const winner = this.checkWinner();
                    if (winner) {
                        this.setState({ winner });
                    }
                }
            );
        }
        else{
            const histories = this.state.histories.slice(0,this.state.currentStep+1)
             this.setState(
                {
                    histories: [...histories, board],
                    currentStep: this.state.currentStep + 1
                },
                () => {
                    const winner = this.checkWinner();
                    if (winner) {
                        this.setState({ winner });
                    }
                }
            );
        }


    }

    changeStep(step: number) {
        this.setState({ currentStep: step })
    }

    checkWinner() {
        const board = this.state.histories[this.state.currentStep]

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];


        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return board[a]
            }
        }

        return null;
    }

    reset = () => {
        this.setState({
            winner: null,
            currentStep: 0,
            histories: [new Array(9).fill(null)]
        })
    }


    render() {
        const board = this.state.histories[this.state.currentStep]
        return (

            <div className="game">
                <div>
                    <div
                        className="game-board"
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 34px)' }}
                    >
                        {Array.from({ length: 9 }, (_, idx) => (
                            <button className="square" key={idx} onClick={() => this.nextMove(idx)}>{board[idx]}</button>
                        ))}
                    </div>
                    <button className="restart" onClick={this.reset}>restart</button>
                </div>


                <div className="game-info">
                    <div className="message">{this.state.winner ? 'Winner: ' + this.state.winner : (this.state.histories.length === 10 ? "Scratch: Cat's game" : 'Next Player:' + this.getNextPlayer())}</div>
                    <ol className="histories">
                        {this.state.histories.map((_, idx) => (
                            idx ? (idx === this.state.currentStep ? <li><button disabled>Go to move #{idx} (current)</button></li> : <li><button onClick={() => this.changeStep(idx)}>Go to move #{idx}</button></li>)
                                : (idx === this.state.currentStep ? <li><button disabled>Go to game start (current)</button></li> : <li><button onClick={() => this.changeStep(idx)}>Go to game start</button></li>)

                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}
