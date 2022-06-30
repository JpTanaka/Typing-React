import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

function View() {
  const divRef = useRef(null);
  useEffect(() => divRef.current && divRef.current.focus());
  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)
  const [typed, setTyped] = useState("");
  const [currentkey, setCurrentKey] = useState (0);
  const [randomwords, setRandomWords] = useState ("Lorem ipsum, dolor sit amet consectetur adipisicing.");
  function handleChange(event) {
    if(event.key == "Backspace" && currentkey>0) {
      const s = typed.substring(0, typed.length-1);
      setTyped(s);
      setCurrentKey(currentkey-1);
    }
    else if(event.keyCode<=250 && event.keyCode >=32){
    const s = typed+event.key;
    setTyped(s);
    setCurrentKey(currentkey+1);
  }
  }
  function handleClick() {
    const s = String(randomWords(10)).split(",").join(" ");
    setRandomWords(s);
  }

  var randomWords = require('random-words');
  const word = String(randomWords(5));
  return (
    <>
    <h1 className='title'>Typing Test</h1>
    <h1>Current key: {currentkey}</h1>
    <ButtonStart onClick = {handleClick}/>
    <div className='divtypedbyuser' onKeyDown={(e) => handleChange(e)} ref={divRef} tabIndex={-1} onFocus={onFocus} onBlur={onBlur}>
       <p className='typedbyuser'><Typed typed = {typed} currentposition = {currentkey} rightstring = {randomwords}/></p>
    </div>
    </>
  )
}

function ButtonStart(props) {
    return (
      <button onClick={() => props.onClick()}>Generate</button>
    )
}

function Typed(props) {
  const typedwords = props.rightstring.split("").map((e, index) => < Letter key = {e.id}
  letter = {e} index={index} currentposition={props.currentposition} typed = {props.typed} rightchar = {props.rightstring.charAt(index)} />)

  return (
    <>{typedwords}</>
  )
}
function Letter(props) {
  const stateofletter = "letter " + (props.typed.length > props.index ?
    ((props.typed.charAt(props.index) == props.rightchar)? "correct" : "wrong"): "randomstring") +
     ((props.index === props.currentposition)? " cursor":"");
  return (
    <>
    <p className={stateofletter}>{(props.typed.length>props.index)? props.typed.charAt(props.index):props.letter}</p>
    </>
  )
  
}

function BoardWords() {


  return (
    <>
    <div className="random-words">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat sapiente libero fugiat perferendis assumenda molestias quia earum nobis esse cumque reiciendis tenetur in rem dicta, minima, est soluta harum nesciunt.
    </div>


    </>

  )
}


function App() {

  return (
    <>
    <View />
    </>
  )
}

export default App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);