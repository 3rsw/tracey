import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import ReactPrismEditor from "react-prism-editor";
import { useState } from 'react';
import data from './problems.json'





const Code = ({code, curr_line}) => {
  const arrow_line = []
  for (let i = 1; i < curr_line; i++){
    arrow_line.push(" ");
  }
  arrow_line.push("➤");

  return (
    <div className="code_n_arrow">
      <div className="even_spacing">
        {arrow_line.map(row => <pre>{row}</pre>)}
      </div> 
      <ReactPrismEditor lineNumber={true} language={'c'} theme={'default'} code={code} readOnly={true}/>
    </div>  
  )
  
}

const Console = ({message}) => {
  if (message == null) {
    message = "";
  }
  return (
    <div className="console">
      <p>$ {message}</p>
    </div>
  )
}

const Variables = ({vars}) => {
//A flexbox, one for each variable
// Passed an array of objects 
  if (vars == null) {
    return <></>
  }
  return (
    <div >
      {vars.map(v => <Variable var_details={v} />)}

    </div>
  )
  


}

const Variable = ({var_details}) => {
  if (Array.isArray(var_details.data)){
    return (
      <p>{var_details.name} = {var_details.data.toString()}</p>
    )
  } else {
    return (
      <p>{var_details.name} = {var_details.data}</p>
    )
  }
  }
  

function App() {

  const [time, setTime] = useState(0)

  const incrementTimestep = () => {
    setTime(time + 1);
  }

  const decrementTimestep = () => {
    if (time > 0) {
      setTime(time - 1);
    } 
  }

  const code = `void mystery_function() {
    int values[3] = {3, 6, 9};
    int result = 0;
    int i = 2;
    int mul = 1;
    while (i >= 0) {
        result = result + values[i] * mul;
        mul = mul * 10;
        i = i - 1;
    }
    printf("The result is %d", result);
    return 0;
  }`
  
  return (
    <>

      
      <Code code={code} curr_line={data[time].line}/>
      <button onClick={decrementTimestep}>back</button> 
      <button onClick={incrementTimestep}>forward</button>
      <Variables vars={data[time].vars}/>
      <Console message={data[time].print}/>
    </>
  );
}
 
export default App;


