import { useState } from "react";
import React from "react";
function Component(){
  const[count,setCount]=useState(0);
  const Increment=()=>{
    setCount(count+1)
  }
  const Decrement=()=>{
    setCount(count-1)
  }
  return(
    <div>
      <h1>
        Counter:{count}
      </h1>
      <button onClick={Increment}>Increase</button>
      <button onClick={Decrement}>Decrease</button>
    </div>
  );
}
export default Component;