import React,{useState} from 'react'

export default function Gauss_elimination() {
    const[Size,setSize]= useState(0);
    const[Matrix,setMatrix] = useState([]);

    const inputCount=(e)=>{
        setSize(e.target.value)
        console.log(Size);
    }
    const create=(e)=>{
        setSize.map((e)=>{
            setMatrix.push(<input/>)
            console.log(Matrix);
        })
    }
  return (
    <div>
    <div>Gauss_elimination</div>
    <input  onChange={inputCount}/>
    <h1>{create}</h1>

    </div>
  )
}
