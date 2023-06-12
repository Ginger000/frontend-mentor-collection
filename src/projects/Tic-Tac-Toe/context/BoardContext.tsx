import { createContext, useContext, useReducer, useCallback, Dispatch, ReactNode } from 'react';




enum Player {
  X = 'X',
  O = 'O',
  Pending = 'pending'
}

type Board = string[][]

type State = {
  board:Board;
  history: Board[];
  win: Player;
  nextPlayer: Player
}

type Action = 
  | {type: 'MAKE_MOVE'; payload:{idx1:number; idx2:number}}
  | {type: 'BACK_TO_HISTORY'; payload:{idx:number}}

type BoardContextType = {
  state:State;
  dispatch:Dispatch<Action>
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const initialBoard = Array.from({ length: 3 }, () => new Array(3).fill('\u00A0'));

const initialState : State = {
  board: initialBoard,
  history:[initialBoard],
  win:Player.Pending,
  nextPlayer: Player.X
}

function boardReducer(state: State, action: Action) {
  switch(action.type) {
    case 'MAKE_MOVE':
      const {idx1, idx2} = action.payload
      if(state.board[idx1][idx2] ==='\u00A0' && state.win === Player.Pending ) {
        const newBoard = state.board.map(arr=>[...arr])
        newBoard[idx1][idx2] = state.nextPlayer
        const win = isWin(newBoard, state.nextPlayer)
        return {
          board: newBoard,
          history: [...state.history, newBoard],
          win,
          nextPlayer: state.nextPlayer === Player.X ? Player.O : Player.X
        }
      }
      return state
    case 'BACK_TO_HISTORY':
      return {...state, board: state.history[action.payload.idx]}
    default:
      return state
  }
}

function isWin(board:Board, player: Player):Player {
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

export function BoardProvider({children}: {children:ReactNode}) {
  const [state, dispatch] = useReducer(boardReducer, initialState)
  return (
    <BoardContext.Provider value={{state, dispatch}} >
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard(){
  const context = useContext(BoardContext)
  if(!context) {
    throw new Error('useBoard must be used within a BoardProvider')
  }
  return context
}