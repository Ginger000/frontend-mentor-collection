import React, {useState} from 'react'
import './style.scss'

export const TicTacToe = () => {
  const initialBoard = Array.from({ length: 3 }, () => new Array(3).fill('\u00A0'));
  const [board, setBoard] = useState(initialBoard);
  const [history, setHistory] = useState([initialBoard])
  // 'pening' is pending, player is win
  const [win, setWin] = useState('pending')
  const [nextPlayer, setNextPlayer] = useState('X')

  console.log(board)
  const boardDisplay = board.map((row,idx1) => (
    <div key={`0, ${idx1}`}>
      {row.map((col,idx2) => (

        <Square key={`${idx1}, ${idx2}`} position={[idx1, idx2]} value={col} setBoard={setBoard} board={board} win={win} setWin={setWin} nextPlayer={nextPlayer} setNextPlayer={setNextPlayer} setHistory={setHistory}  /> 
      ))}
    </div>
  ));
  return (
    <>
      <div> {win!=='pending' ? `Winner is ${win}`: `Next player is ${nextPlayer}` }  : </div> 
      <div>{boardDisplay}</div>
      {history.map()}
    </>
    
  )
}

type SquareProps = 
{
  position: number[]
  value:string | null,
  setBoard:(board:string[][])=>void,
  win:string,
  setWin:(status:string)=>void,
  board:string[][],
  nextPlayer:string,
  setNextPlayer:(player:string)=>void, 
  setHistory:(newBoard:string[][]) => void
}
function Square({ position, value, setBoard, board, win, setWin, nextPlayer, setNextPlayer, setHistory} : SquareProps) {
  
  const handleClick = () => {
    if(value == '\u00A0' && win == 'pending'){
      const newBoard = board.map(arr=>[...arr])
      newBoard[position[0]][position[1]] = nextPlayer
      setBoard(newBoard)
      const res = isWin(newBoard, nextPlayer)
      setWin(res)
      setNextPlayer(nextPlayer === 'X' ? 'O':'X')
      setHistory((prev)=>[...prev, newBoard])
    }  
  }
  
  // disabled attribute is not a valid attribute for the span element. It's typically used with form elements
  return <span className="square" onClick={handleClick} > {value}</span>;
}

function isWin(board:string[][], player:string) {
  for(let i = 0; i < 3; i++) {
    if(board[i][0] == player && board[i][1] == player && board[i][2]==player) return player
    if(board[0][i] == player && board[1][i] == player && board[2][i] == player )
    return player
  }
  if(board[0][0] == player && board[1][1] == player && board[2][2] == player) return player
  if(board[2][0] == player && board[1][1] == player && board[0][2] == player)
  return player
  return 'pending'
}