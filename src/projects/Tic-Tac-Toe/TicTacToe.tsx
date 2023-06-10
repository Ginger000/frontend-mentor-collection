import React, {useState, useCallback} from 'react'
import './style.scss'

enum Player {
  X = 'X',
  O = 'O',
  Pending = 'pending'
}

type Board = string[][]

export const TicTacToe = () => {
  const initialBoard = Array.from({ length: 3 }, () => new Array(3).fill('\u00A0'));
  const [board, setBoard] = useState<Board>(initialBoard);
  const [history, setHistory] = useState<Board[]>([initialBoard])
  // 'pening' is pending, player is win
  const [win, setWin] = useState<Player> (Player.Pending)
  const [nextPlayer, setNextPlayer] = useState<Player> (Player.X)

  const backToHistory = (idx:number) => {
    setBoard(history[idx])
  }

  const handleClick = useCallback((idx1:number,idx2: number,col:string):void => {
    if(col === '\u00A0' && win === 'pending'){
      const newBoard = board.map(arr=>[...arr])
      newBoard[idx1][idx2] = nextPlayer
      setBoard(newBoard)
      const res = isWin(newBoard, nextPlayer)
      setWin(res)
      setNextPlayer(nextPlayer === Player.X ? Player.O:Player.X)
      setHistory((prev)=>[...prev, newBoard])
    }  
  },[board, win, nextPlayer])

  //console.log('board', board) remove for production
  //console.log('history', history) remove for production
  const boardDisplay = board.map((row,idx1) => (
    <div key={`0, ${idx1}`}>
      {row.map((col,idx2) => (

        <Square key={`${idx1}, ${idx2}`} handleClick={()=>handleClick(idx1,idx2,col)} value={col} /> 
      ))}
    </div>
  ));
  return (
    <>
      <div> {win!=='pending' ? `Winner is ${win}`: `Next player is ${nextPlayer}` }  : </div> 
      <div>{boardDisplay}</div>
      {history.map((record, idx)=><button onClick={()=>backToHistory(idx)} key={idx}>Go to move #{idx}</button>)}
    </>
    
  )
}

type SquareProps = 
{
  handleClick:(idx1:number, idx2:number, col:string) => void
  value:string ,
}
function Square({ handleClick, value} : SquareProps):JSX.Element {
  return <span className="square" onClick={handleClick} > {value}</span>;
}

function isWin(board:Board, player:Player) {
  for(let i = 0; i < 3; i++) {
    if(board[i][0] == player && board[i][1] == player && board[i][2]==player) return player
    if(board[0][i] == player && board[1][i] == player && board[2][i] == player )
    return player
  }
  if(board[0][0] == player && board[1][1] == player && board[2][2] == player) return player
  if(board[2][0] == player && board[1][1] == player && board[0][2] == player)
  return player
  return Player.Pending
}