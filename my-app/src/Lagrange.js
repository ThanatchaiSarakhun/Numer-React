import React, { useState } from 'react';

import { Container,Form,Button,Table} from 'react-bootstrap';

function Lagrange(){
    const [val_x,setVal_x]=useState([{x:[],y:[]}]);
    const [size_array,set_size]=useState(0);
    const [fx,set_fx]=useState(0);
    const [Show_Lagrange,set_Lagrange]=useState(0);
  
  
     const handleAdd=(e)=>{
      var array_x = []
      for(var i=0;i<Number(e.target.value);i++)
      {
  

         if(i<=0)
        {
          array_x[i] = [{x:i,y:i}]
        }
        else{
          array_x.push({x:i,y:i})
        }
   
      }

      setVal_x(array_x)
      set_size(Number(e.target.value))
     }
     

     const X_fx=(e)=>
     {
      set_fx(Number(e.target.value))
     }
     
  
     const cal_test=()=>{
      var  x = []
      var  y = []

        for(var i =0;i<size_array;i++)
        {
          x[i] =  val_x[i].x 
          y[i] =  val_x[i].y 
        }


       var xp=fx
       var yp=0
       var k
        for(i =0;i<point.length;i++){
           var  p=1;
           k=i+1
           console.log("p[i]= "+p)
            for(var j=0;j<point.length;j++){
                if(i !== j){
                    p = p*(xp-x[k-1])/(x[point[i]-1]-x[k-1])
                    console.log("j= "+point[j],"i= "+point[i])
                    console.log("p[j]= "+p)
                    k++;
    
                }
            }
            yp = yp+ p*y[point[i]-1];
        }
        set_Lagrange(yp)



    }


  
     const handleChange_x=(rowIndex, e)=>{
      val_x[rowIndex].x =  Number(e.target.value);

     }
     const handleChange_y=(rowIndex, e)=>{
      val_x[rowIndex].y =  Number(e.target.value);

     }
  


     
  return(
      <>
      <h1>Lagrange</h1>
      <Container>
      <Form>
             <Form.Group className="mb-3">
                 <Form.Control size="lg" type="text" name = "dimentions" onChange={handleAdd} placeholder="Input Number of Dimentions" />
             </Form.Group>
         </Form>
      <br></br>
      <br></br>
      <h2>X =<input type="number" onChange={X_fx} /> </h2>
      <br></br>
      <Table striped bordered hover variant="dark">
      <thead>
      <tr>
      <th>X</th>
      <th>Y</th>

       </tr>
        </thead>
             <tbody>
      {val_x.map((row, rowIndex) => (
                     <tr>
                 <td> <input key={row.x} onChange={e => handleChange_x(rowIndex, e)}/></td>
        
                  <td> <input key={row.y} onChange={e => handleChange_y(rowIndex, e)}/></td>
         
                  </tr>
            ))}
        

</tbody>

    </Table>


                <br></br>
               <Button onClick={()=>cal_test()}>Cal</Button>
               </Container>
  
               <br></br>

              <h1> {Show_Lagrange}</h1>

       
  
      
      </>


  );
  }

export default  Lagrange;