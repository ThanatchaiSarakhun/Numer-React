import React, { useState } from 'react';
import { Container,Form,Button,Table} from 'react-bootstrap';
function Newton_divided(){
    const [val_x,setVal_x]=useState([{x:[],y:[]}]);
    const [size_array,set_size]=useState(0);
    const [fx,set_fx]=useState(0);
    const [show_web,set_show]=useState([]);
    const [show_web_sum,set_show_sum]=useState([]);

    const [Show_Newton,setShow_Newton]=useState(0);
     const handleAdd=(e)=>{
      var array_x = []
      for(var i=0;i<Number(e.target.value);i++){
        i <= 0 ? array_x[i] = [{x:"",y:""}]:array_x.push({x:"",y:""}) 
      }
      setVal_x(array_x)
      set_size(Number(e.target.value))
     }
     const X_fx=(e)=>{
      set_fx(Number(e.target.value))
     }
     const cal_test=()=>{
      var  x = []
      var  y = []
      var tt=[]
      var tt2=[]
      var j,i
      var result=0
      var sum=0
      var sumfx=1
      var value=0
      const createarr2d=(arr,m,n)=>{
        for(i=0;i<m;i++){
            arr.push([0])
            for(j=0;j<n;j++){
                arr[i][0] =val_x[i].y
            }
        }
      }
      createarr2d(y,size_array,size_array)  
        for(i =0;i<size_array;i++){
            x[i] =  val_x[i].x      
        } 
       for(i=1;i<size_array;i++){
        for(j=0;j<size_array-i;j++){
            // console.log("i= "+i+"j= "+j)
            y[j][i] = (y[j][i - 1] - y[j + 1][i - 1]) / (x[j] - x[i + j]);   
                     
         }
          
        }
        console.log(y)
        for(i=0;i<size_array;i++){
            // console.log("i ="+i)
            if(i==0){
                result=y[0][i]
                
            }else if(i>0){
                sum = fx-x[i-1]
                result = y[0][i]*(sumfx*sum) 
                sumfx=sumfx*sum
               
            }
            value=value+result 
            tt.push("c",i,"="," ",y[0][i],"*",sum+" ")
            tt2.push(sum)
            console.log((y[0][i]+"*"+sum+"+") )
            
        }
        setShow_Newton(value)
        set_show(tt)
        set_show_sum(tt2)
      
        console.log("value= "+value)      
}
  const handleChange_x=(rowIndex, e)=>{
      val_x[rowIndex].x =  Number(e.target.value);

     }
     const handleChange_y=(rowIndex, e)=>{
      val_x[rowIndex].y =  Number(e.target.value);

     }   
     const api=(e)=>{
        fetch("http://localhost:3005/Newton_diff")
        .then((res)=>res.json())
        .then((e)=>{
          e.map((x)=>{
            set_fx(x.resfx)
            set_size(x.ressize)
            var arrx=[]
            for(var i=0;i<size_array;i++){
                i < 0 ? arrx[i] = [{x:x.resx[i],y:x.resy[i]}]:arrx.push({x:x.resx[i],y:x.resy[i]})
            }
            console.log(arrx)
            setVal_x(arrx)
          })
        })  
    
      }
  return(
      <>
      <h1>Newton_Divided</h1>
      <Container>
      <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" value={size_array} type="text" name = "dimentions" onChange={handleAdd} placeholder="Input Number of Dimentions" />
             </Form.Group>
         </Form>
      <br></br>
      <br></br>
      <h2>X =<input value={fx} type="number" onChange={X_fx} /> </h2>
      <br></br>
      <Table striped bordered hover variant="dark">
      <thead>
      <tr>
      <th>X</th>
      <th>Y</th>
       </tr>
        </thead>
             <tbody>
      {val_x.map((row,rowIndex) => (
                     <tr>
                 <td> <input  value={val_x[rowIndex].x}onChange={e => handleChange_x(rowIndex)}/></td>
        
                  <td> <input  value={val_x[rowIndex].y}onChange={e => handleChange_y(rowIndex)}/></td>
         
                  </tr>
            ))}
    
</tbody>

    </Table>
                <br></br>
               <Button onClick={()=>cal_test()}>Cal</Button>&nbsp; &nbsp;<Button variant="outline-warning" onClick={()=>api()}> API</Button>
               </Container>
               <br></br>
               <h2>{show_web}</h2>
               
              <h1>result = {Show_Newton}</h1>

       
  
      
      </>


  );
  }

export default  Newton_divided;