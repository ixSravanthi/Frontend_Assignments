export const Display=({number,setNumber}:{number:number,setNumber:any})=>{
    const incrementor=()=>{
      setNumber(number+1);
    };
    const decrementor=()=>{
      setNumber(number-1);
    };
    const reset=()=>{
      setNumber(0);
    };
    return(
    <div style={{marginLeft:"50px"}}>
      <h1>COUNTER</h1>
      <div>{number}</div>
      <button onClick={incrementor}>+</button>
      <button onClick={reset}>RESET</button>
      <button onClick={decrementor}>-</button>
    </div>
    );
}
