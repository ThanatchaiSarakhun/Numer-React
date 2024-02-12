import React,{useState} from 'react'
import {compile} from "mathjs";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FormLabel } from 'react-bootstrap';
export default function Secant() {
    const[x,setx]=useState()
    const[x2,setx2]=useState()
    const[err,seterr]=useState(0)
    const[equation,setequation] = useState("");
    const[All,setAll]=useState([{x1:[],x:[],err:[]}])
    const cal_result=(e)=>{
        var xold = Number(x)
        var xnew = Number(x2)
        var z,error
        var i=0
        var x1
        var check,fxold,fz,fxnew,fx;
        var arrAll=[{}];

        do{
          let scope_XL = {x:xold}
          const code1 = compile(equation) 
          fxold = code1.evaluate(scope_XL)
        
          let scope_XR = {x:xnew}
          const code2 = compile(equation) 
          fxnew = code2.evaluate(scope_XR)

          fx =(fxold-fxnew)/(xold-xnew)
          x1 = xnew-(fxnew/fx)
          z = (fxnew/fx)
          error = (z/x1)
          if(error<0)
  {
    error = 0-error
  }
          i <= 0 ? arrAll = [{x1:xold.toFixed(6),x:x1.toFixed(6),err:error.toFixed(6)}]:
          arrAll.push({
            x1:xold.toFixed(6),x:x1.toFixed(6),err:error.toFixed(6)
         })
            i++;
            xold = xnew
            xnew = x1
         console.log(xnew)
        }while(error >=0.000001)
        setAll(arrAll)
        seterr(err)
    }
    const api=(e)=>{
      fetch("http://localhost:3005/Secant")
      .then((res)=>res.json())
      .then((e)=>{
        e.map((x)=>{
          setequation(x.reseq)
          setx(x.resx)
          setx2(x.resx2)
        })
      })
      .catch((err)=>{
        console.log(err.message);
      });    
    }
  return (
    <div style={{fontFamily: 'Droid Sans'}}>
    <h1 style={{color: "black"}}>Secant</h1>
    <h2 style={{color: "black"}}><input placeholder="Equation" type="text" value={equation} onChange={e=> setequation(e.target.value)}/></h2>
    <h2 style={{color: "black"}}><input placeholder="X0" type="number" value={x} onChange={e=> setx(e.target.value)}/></h2>
    <h2 style={{color: "black"}}><input placeholder="X1" type="number" value={x2} onChange={e=> setx2(e.target.value)}/></h2><br/>
    <Button variant="dark" onClick={e=>cal_result()}> Result</Button> &nbsp; &nbsp;
    <Table class="table" striped bordered hover variant="blue">
  <thead>
    <tr>
      <th scope="col">Iteration</th>
      <th scope="col">X0</th>
      <th scope="col">X1</th>
      <th scope="col">ERROR</th>
    </tr>
  </thead>
  <tbody>
    {All.map((item,i)=>
    <tr>
      <td>{i}</td>
      <td>{item.x1}</td>
      <td>{item.x}</td>
      <td>{item.err}</td>
    </tr>
    )
}
  </tbody>
</Table>
    </div>
  );}
