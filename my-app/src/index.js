import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  // function component since it doesn't have its 
  // own state
  function Square(props){
    return (
        // onClick method can be passed from Board
        <button className="square" 
                onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
          return (
              <Square value={this.props.squares[i]} 
                      onClick = {() => this.props.onClick(i)} 
              />
              );
            }
            
    render() {
        return (
            <div>
              <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              </div>
              <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              </div>
              <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
              </div>
            </div>
                );
                }
            }
            
class Game extends React.Component {
        // SO STATE IS THE FIELDS IN JS ??
        constructor(props){
            super(props);
            // game has full control over history
            this.state = {
                history: [{squares : Array(9).fill(null)
                }],
                stepNumber : 0,
                xIsNext : true
            };
        }

        handleClick(i){
            const history = this.state.history.slice(0,this.state.stepNumber+1);
            const current = history[history.length - 1];
            // name improved from "squares": otherwise
            // it will be too confusing. 
            // Just keep in mind that "current" refers to
            // an object (previously known as state) in history.
            const currSquares = current.squares.slice();

            // return early if winner has been declared
            // or if currSquaresp[i], a square, has already
            // been filled
            if (calculateWinner(currSquares) || currSquares[i]){
                return;
            }
            currSquares[i] = this.state.xIsNext ? 'X' : 'O';

            this.setState({history :  history.concat(
              [{squares : currSquares}]
            ),
              stepNumber : history.length,
              xIsNext : !this.state.xIsNext});
        }

        // step is a num
        // we are not updating state because react
        // leave the state as 
        // if if we haven't touched it
        jumpTo(step){
          this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
          });
        }

        render() {
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);
            // improvement: using ternary operator to determine 
            // the status string from current state
            let status = "";
            if (this.state.stepNumber < 9){
              status = winner? "winner is " + 
          winner : 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
            }
            else{
              // extension: it will let the plays know 
              // once it's a draw
              status = "It's a draw";
            }

          // returns a list of buttons. Upon clicking, they can
          // take u back in time
          // syntax of map: map((element, index) => { /* ... */ })
            const moves = history.map((step, moveInd)=>{
                const desc = moveInd ? 
                              "Go to move #" + moveInd:
                              "Go to game start";
                return(
                  <li key={moveInd}>
                    <button className='historyButton' 
                    onClick={() => this.jumpTo(moveInd)}>
                      {desc}
                    </button>
                  </li>
                )
            });

      return (

          <div className="game">
            <div className="game-board">
              <Board squares = {current.squares}
                      onClick = {(i) => this.handleClick(i)}
                      />
            </div>
            <div className="game-info">
              <div className="game-info-status">{status}</div>
              <ul>{moves}</ul>
            </div>
          </div>

      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
      // checking winner, returns 'X', 'O' or null
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }