import React, {useState, useCallback} from 'react'
import './style.scss'
import { useBoard } from './context/BoardContext'


export const TicTacToe = () => {
  const {state, dispatch} = useBoard()
  const backToHistory = (idx:number) => {
    dispatch({type:'BACK_TO_HISTORY', payload:{idx}})
  }
  const handleClick = (idx1:number,idx2: number):void => {
    dispatch({type:'MAKE_MOVE', payload:{idx1, idx2}}) 
  }

  //console.log('board', board) remove for production
  //console.log('history', history) remove for production
  const boardDisplay = state.board.map((row,idx1) => (
    <div key={`row-${idx1}`}>
      {row.map((col,idx2) => (

        <Square key={`col-${idx1}-${idx2}`} handleClick={()=>handleClick(idx1,idx2)} value={col} /> 
      ))}
    </div>
  ));
  return (
    <>
      <div> {state.win!=='pending' ? `Winner is ${state.win}`: `Next player is ${state.nextPlayer}` }  : </div> 
      <div>{boardDisplay}</div>
      {state.history.map((_, idx)=><button onClick={()=>backToHistory(idx)} key={idx}>Go to move #{idx}</button>)}
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

