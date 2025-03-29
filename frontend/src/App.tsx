import React, { useState } from "react";
import InstrumentDisplay from "./components/InstrumentDisplay";
import VisualDisplay  from "./components/VisualDisplay";
import InputForum from "./components/InputForum"


function App() {

  const [isText, setIsText] = useState(true);

  return (
    <div>
      <div style={{display: 'flex', gap: '10px'}}>
      <button onClick={()=> setIsText(!isText)}>toggle text and visual</button>
      <InputForum/>
        
      </div>
      {isText ? <InstrumentDisplay/> : <VisualDisplay/> }
    </div>
  );
}

export default App;
