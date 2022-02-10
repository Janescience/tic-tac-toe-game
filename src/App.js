import './App.css';
import styled from '@emotion/styled'
import { useState } from 'react';

const Cell = styled.div`
  width : 100%;
  height : 80px;
  border : 3px solid black;
  border-radius : 10px;
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 3rem;
  cursor : pointer;
  &:hover {
    background-color : brown;
  }
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap : 15px;
  grid-column-gap : 15px;
  width: 240px;
  border-radius: 10px;
  margin: auto;
`

const RestartButton = styled.button`
  width : 240px;
  margin : auto;
  height : 32px;
  margin-top : 15px;
  border-radius : 5px;
  cursor : pointer;
`

const winStates = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const calculateWinner = (gameState) => {
    let winner;
    for(let i = 0 ; i < winStates.length ; i++){

      const winState = winStates[i];
      if(gameState[winState[0]] === gameState[winState[1]] &&
         gameState[winState[1]] === gameState[winState[2]] &&
         Boolean(gameState[winState[0]])
        ){
          winner = gameState[winState[0]]
      }

    }
    return winner;
}


function App() {
  const person = { name: { firstName: 'lastName', lastName: 'World' } }
  console.log(person['name'][person.name.firstName])

  const [gameState,setGameState] = useState(['','','','','','','','',''])
  const [player,setPlayer] = useState("X")
  const winner = calculateWinner(gameState)
  const isTie = !winner && gameState.filter(state => Boolean(state)).length === 9

  const onCellClick = (index) => {
      const newGameState = [...gameState]
      if(newGameState[index] !== '' || Boolean(winner) || isTie){
        return
      }
      newGameState[index] = player
      setGameState(newGameState)
      if(player === 'X'){
        setPlayer("O") 
      }else{
        setPlayer("X")
      } 
    }
  

  const onRestartClick = () => {
    setGameState(['','','','','','','','',''])
    setPlayer("X")
  }

  return (
    <div className="App" style={{fontSize:'18px'}}>
      <h1>Tic Tac Toe</h1>
      { winner ? (
      <h2>Congrat {winner} is win </h2>) : isTie ? <h2>Game is Tie</h2> :
      (<h2> Player {player} ,It's your turn </h2>) 
      }
      <BoardContainer>
        {
          gameState.map((cellNumber,index) => {
            return <Cell onClick={() => {
              onCellClick(index) 
            }}>{cellNumber}</Cell>
          })
        }
      </BoardContainer>
      <RestartButton onClick={() => onRestartClick()}>Restart</RestartButton>
    </div>
  );
}

export default App;
