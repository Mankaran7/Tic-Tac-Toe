import { useState } from "react";
import Card from "../Card/Card";
import './Grid.css'
import isWinner from "../../helpers/checkWinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Grid({numberofcards}){
    const [turn,setTurn]=useState(true) //false means X has turn ,true means 0 has turn
    const [board,setBoard]=useState(Array(numberofcards).fill("")) //["","" ,"" ---]
    const [winner,setwinner]=useState(null);
    function play(index){
        console.log("move played",index)
        if(turn == true){
            board[index]="O";
        }else{
            board[index]="X";
        }
        //const win=isWinner(board,turn ? "O" : "X")
        const win=isWinner(board,turn ? "O" : "X")
        if(win){
            setwinner(win)
            toast.success(`congratulations ${win} won the game`)
        }
        setBoard([...board])
        setTurn(!turn)
    }
 function reset(){
    setBoard(Array(numberofcards).fill(""))
    setwinner(null)
    setTurn(true)
 }

    return(
        
        
       <div className="grid-wrapper">
         {winner && (
            <>
         <h1 className="turn-highlight">Winner is {winner}</h1>
         <button className="reset" onClick={reset}>Reset Game</button>
         <ToastContainer position="top-center" />
         </>
         
        )}
         <h1 className="turn-highlight">Current Turn:{(turn) ? 'O' : 'X'}</h1>
        <div className="grid">
          {board.map((value,idx)=>{
            return <Card gameEnd={winner ? true:false}  onPlay={play} player={value} key={idx} index={idx} />
          })}
          
        </div>
       </div> 
    )
}
export default Grid