import {useState} from "react";

import Frame from "./components/Frame";
import Display from "./components/Display";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const buttonValues = [
  ["hun", "en"],
  ["C", "CE", "+/-"],
  ["MC", "MR", "M+","M-"],
  ["%", "x²", "√","÷"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const style =[['style1', 'style2', 'style3'],];

let memorys = 0;

const replaceString = (nbr) =>
  String(nbr).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSp = (nbr) => nbr.toString().replace(/\s/g, "");


const App = () => {

  
  let [op, setOp] = useState({
    mark: "",
    nmb: 0,
    fin: 0,
  });
  

  const numberClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSp(op.nmb).length < 16) {
      setOp({
        ...op,
        nmb:
          op.nmb === 0 && value === "0"
            ? "0"
            : removeSp(op.nmb) % 1 === 0
            ? replaceString(Number(removeSp(op.nmb + value)))
            : replaceString(op.nmb + value),
        fin: !op.mark ? 0 : op.fin,
      });
    }
  };

  const dotClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setOp({
      ...op,
      nmb: !op.nmb.toString().includes(".") ? op.nmb + value : op.nmb,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setOp({
      ...op,
      mark: value,
      fin: !op.fin && op.nmb ? op.nmb : op.fin,
      nmb: 0,
    });
  };

  const equalsClickHandler = () => {
    if (op.mark && op.nmb) {
      const math = (a, b, mark) =>
        mark === "+"
          ? a + b
          : mark === "-"
          ? a - b
          : mark === "X"
          ? a * b
          : a / b;

      setOp({
        ...op,
        fin:
          op.nmb === "0" && op.mark === "/"
            ? "Can't divide with 0"
            : replaceString(
                math(
                  Number(removeSp(op.fin)),
                  Number(removeSp(op.nmb)),
                  op.mark
                )
              ),
        mark: "",
        nmb: 0,
      });
    }
  };

  const inversClickHandler = () => {
    setOp({
      ...op,
      nmb: op.nmb ? replaceString(removeSp(op.nmb) * -1) : 0,
      fin: op.fin ? replaceString(removeSp(op.fin) * -1) : 0,
      mark: "",
    });
  };

  const percentClickHandler = () => {
    let nmb = op.nmb ? parseFloat(removeSp(op.nmb)) : 0;
    let fin = op.fin ? parseFloat(removeSp(op.fin)) : 0;

    setOp({
      ...op,
      nmb: (nmb /= Math.pow(100, 1)),
      fin: (fin /= Math.pow(100, 1)),
      mark: "",
    });
  };

  const squareClickHandler = () => {
    let nmb = 0;
    let fin = op.fin ? parseFloat(removeSp(op.fin)) : 0;

    setOp({
      ...op,
      nmb: nmb,
      fin: fin *= fin,
      mark: "",
      
    });
    
  };

  const subsquareClickHandler = () => {
    let nmb = op.nmb ? parseFloat(removeSp(op.nmb)) : 0;
    let fin = op.fin ? parseFloat(removeSp(op.fin)) : 0;

    setOp({
      ...op,
      nmb: nmb%1===0 ? parseFloat(Math.sqrt(nmb)) : parseFloat(Math.sqrt(nmb)).toFixed(3),
      fin: fin%1===0 ? parseFloat(Math.sqrt(fin)) : parseFloat(Math.sqrt(fin)).toFixed(3),
      mark: "",
       
    });
  };

  const clearentryClickHandler = () => {
    let nmb = 0;
    let fin = op.fin ? parseFloat(removeSp(op.fin)) : 0;

    setOp({
      ...op,
      nmb: parseFloat(nmb),
      fin: parseFloat(fin),
      mark: "",
      
    });
  };

  

  const memorycleanClickHandler = () => {
    setOp({
      ...op,
      nmb: memorys,
      fin: memorys,
      mark: "",
      
    });
    memorys = 0;
    
  };

  const memoryrecoveryClickHandler = () => {
    
    setOp({
      ...op,
      nmb: memorys,
      fin: memorys,
      mark: "",
      
    });
    
  };

  const memoryplusClickHandler = () => {
    
    memorys += parseFloat(removeSp(op.nmb));
    
  };

  const memoryminusClickHandler = () => {
    
    memorys -= parseFloat(removeSp(op.nmb));
    
  };

  const resetClickHandler = () => {
    setOp({
      ...op,
      mark: "",
      nmb: 0,
      fin: 0,
    });
  };

  const numedit1 = () => {

    import ('normalize.css');
    import ('./index1.css')
    import('./components/Button1.css')
    import('./components/ButtonBox1.css')
    import('./components/Display1.css')
    
  };

  const numedit2 = () => {
    import ('normalize.css');
    import ('./index2.css')
    import('./components/Button2.css')
    import('./components/ButtonBox2.css')
    import('./components/Display2.css')
     
  };

  const numedit3 = () => {
    
    import ('./index3.css')
    import('./components/Button3.css')
    import('./components/ButtonBox3.css')
    import('./components/Display3.css')
    
  };

  numedit1();

  const hunChange = () => {
    
    
  };

  
  return (
    <Frame>
      {style.flat().map((bttn, i) => {
          return (
            <Button
              key={i}
              className={bttn === "style1" ? "style1" : "style2" ? "style2" : "style3" ? "style3" : ""}
              value={bttn}
              onClick={
                  bttn === "style1"
                  ? numedit1
                  : bttn === "style2"
                  ? numedit2
                  : bttn === "style3"
                  ? numedit3
                  : bttn === ""
              }
            />
          );
        })} 
      <Display value={op.nmb ? op.nmb : op.fin} />
      <ButtonBox>
        {buttonValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : (btn === "C" ? "cbutton" : "")}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+/-"
                  ? inversClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "÷" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? dotClickHandler
                  : btn === "x²"
                  ? squareClickHandler
                  : btn === "√"
                  ? subsquareClickHandler
                  : btn === "MC"
                  ? memorycleanClickHandler
                  : btn === "MR"
                  ? memoryrecoveryClickHandler
                  : btn === "M+"
                  ? memoryplusClickHandler
                  : btn === "M-"
                  ? memoryminusClickHandler
                  : btn === "CE"
                  ? clearentryClickHandler
                  : btn === "en"
                  ? clearentryClickHandler
                  : btn === "hun"
                  ? hunChange
                  : numberClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Frame>
  );
};

export default App;
