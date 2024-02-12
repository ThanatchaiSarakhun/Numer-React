import React,{useState} from 'react'
import {compile} from "mathjs";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
//import Graph from './Graph';
export default function Bisection() {

    var x=[]
    const[xr,setxr] = useState();
    const[xl,setxl] = useState();
    const[err,seterr] = useState(0);
    const[xm,setxm] = useState(0);
    const[equation,setequation] = useState("");
    const [All,setAll]=useState([{collxR:[],collxL:[],collxM:[],collerr:[]}]);
    //Graph
    const[options,setObject]= useState({
      chars:{
        id: 'apexchart-example'
      },
      xaxis:{
        categories:0
      }
    })
    const [series,seSeries] = useState([{
    
      name: 'series-1',
      data:x
    }])

    const cal_result=()=>{
      var xM = 0,xOld = 0,fxM=0,fxR=0,i =0;
      var check = 1;
      var  xL = Number(xl);
      var  xR = Number(xr);
      var arrAll=[{}];
      var arr_mx=[];
      var round =[]
      while(check >= 0.000001){ 
          xOld = xM
          xM = (xL+xR)/2
    let scope_XM = {x:xM}
    const compxm = compile(equation) 
    fxM = compxm.evaluate(scope_XM)
    let scope_XR = {x:xR}
    const compxr = compile(equation) 
    fxR = compxr.evaluate(scope_XR);
          fxM = 13 - (xM*xM*xM*xM);
          fxR = 13 - (xR*xR*xR*xR);
          if(fxM*fxR > 0){
            xR = xM;
          }
          else if(fxM*fxR < 0){
             xL= xM;
          }
          arr_mx[i] = xM;
          round[i] = i;
            check = Math.abs((xM - xOld)/xM)*100;
             i <= 0 ? arrAll = [{collxR:xR.toFixed(6),collxL:xL.toFixed(6),collxM:xM.toFixed(6),collerr:check.toFixed(6)}]:
              arrAll.push({
                iteration:i,collxR:xR.toFixed(6),collxL:xL.toFixed(6),collxM:xM.toFixed(6),collerr:check.toFixed(6)
             })
             i++;     
      }
      setObject({
        chars:{
          id: 'Bissection',
        },
        xaxis:{
          categories:round
        },
        stroke: {
          width: 5,
          colors: ['#99FF00']
        },
    
      })
    
      seSeries([{
      
        name: 'xM',
        data:arr_mx
      }])
  setAll(arrAll);
  setxm(xM)
console.log(xm,err)
  seterr(check.toFixed(10))
    }
    const api=()=>{
      fetch("http://localhost:3005/Bisection")
      .then((res)=>res.json())
      .then((e)=>{
        e.map((x)=>{
          setequation(x.reseq)
          setxr(x.resxr)
          setxl(x.resxl)
        })
      })
      .catch((err)=>{
        console.log(err.message);
      });  
  
    }
  return (
    <div style={{fontFamily: 'Droid Sans'}}>
    <h1 style={{color: "black"}}>Bisection Method</h1>
    <h2 style={{color: "black"}}><input placeholder="Equation" type="text" value={equation} onChange={e=> setequation(e.target.value)}/></h2>
    <h2 style={{color: "black"}}><input placeholder="XR" type="number" value={xr} onChange={e=> setxr(e.target.value)}/></h2>
    <h2 style={{color: "black"}}><input placeholder="XL" type="number" value={xl} onChange={e=> setxl(e.target.value)}/></h2><br/>
    <Button variant="dark" onClick={e=>cal_result()}> Result</Button> &nbsp; &nbsp;
   
    
    <Table class="table" striped bordered hover variant="blue">
  <thead>
    <tr>
      <th scope="col">Iteration</th>
      <th scope="col">XR</th>
      <th scope="col">XL</th>
      <th scope="col">XM</th>
      <th scope="col">ERROR</th>
    </tr>
  </thead>
  <tbody>
    {All.map((item,i)=>
    <tr>
      <td>{i}</td>
      <td>{item.collxR}</td>
      <td>{item.collxL}</td>
      <td>{item.collxM}</td>
      <td>{item.collerr}</td>
    </tr>
    )
}
  </tbody>
</Table>
    </div>
  );}
