import  { useState } from "react";
import { Display } from "./display.tsx";
  

const Values=()=>{
  const [number,setNumber]=useState(0);
 
  return(
    <>
    <Display number={number} setNumber={setNumber}/>
    </>
  );
}

export default Values;