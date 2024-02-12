import React ,{useState}from 'react'
import {compile} from "mathjs";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function False_position() {
    const[xr2,setxr2] = useState();
    const[xl2,setxl2] = useState();
    const[err2,seterr2] = useState(0);
    const[x1,setx1] = useState(0);
    const[equation,setequation] = useState("");
    const [All,setAll]=useState([{collxr:[],collxl:[],collx1:[],collerr:[]}]);
    const cal_result=()=>{
        var xL = Number(xl2);
        var xR = Number(xr2);
        var x,xold;
        var fxl,fxr,fx;
        var result = 1;
        var arrAll=[{}];
        var i=0;

        while(result >= 0.000001){
            xold = x;
            let scope_X1 = {x:x1}
            const compxm = compile(equation) 
            fx = compxm.evaluate(scope_X1)
            let scope_XR = {x:xR}
            const compxr = compile(equation) 
            fxr = compxr.evaluate(scope_XR);
            fxl = (43*xL)-1
            fxr = (43*xR)-1
            x = ((xL*fxr)-(xR*fxl))/(fxr-fxl);
            fx =(43*x)-1
            if(fx*fxr > 0){
                xR =x;
            }else if(fx*fxr < 0){
                xL = x;
            }
            result = Math.abs((x-xold)/x)*100;
            i <= 0 ? arrAll = [{collxr:xR.toFixed(6),collxl:xL.toFixed(6),collx1:x.toFixed(6),collerr:result.toFixed(6)}]:
              arrAll.push({
                iteration:i,collxr:xR.toFixed(6),collxl:xL.toFixed(6),collx1:x.toFixed(6),collerr:result.toFixed(6)
             })
             console.log(result)
            i++;
        }
        setAll(arrAll);
        setx1(x);
        seterr2(result);
    }
    const api=(e)=>{
      fetch("http://localhost:3005/False_position")
      .then((res)=>res.json())
      .then((e)=>{
        e.map((x)=>{
          setequation(x.reseq)
          setxr2(x.resxr)
          setxl2(x.resxl)
        })
      })
      .catch((err)=>{
        console.log(err.message);
      });    
    }
  return (
    <div style={{fontFamily: 'Droid Sans'}}>
    <h1 style={{color: "black"}}>False_position</h1>
    <h2 style={{color: "black"}}><input placeholder="Equation" type="text" value={equation} onChange={e=> setequation(e.target.value)}/></h2>
    <h2 style={{color: "black"}}><input placeholder="XR" type="number" value={xr2} onChange={e=> setxr2(e.target.value)}/></h2>
    <h2 style={{color: "black"}}><input placeholder="XL" type="number" value={xl2} onChange={e=> setxl2(e.target.value)}/></h2><br/>
    <Button variant="dark" onClick={e=>cal_result()}> Result</Button> &nbsp; &nbsp;
    <Table class="table table-blue" striped bordered hover variant="blue">
  <thead>
    <tr>
      <th scope="col">Iteration</th>
      <th scope="col">XR</th>
      <th scope="col">XL</th>
      <th scope="col">X</th>
      <th scope="col">ERROR</th>
    </tr>
  </thead>
  <tbody>
    {All.map((item,i)=>
    <tr>
      <td>{i}</td>
      <td>{item.collxr}</td>
      <td>{item.collxl}</td>
      <td>{item.collx1}</td>
      <td>{item.collerr}</td>
    </tr>
    )
}
  </tbody>
</Table>
    </div>
  );}
