import { useRef, useState } from "react";
import style from "./../styles/form.module.css";
const index = () => {
  const data = useRef();
  const [num, setNum] = useState("0");
  const [value, setValue] = useState("");
  const change = (e) => {
    if (isNaN(e.target.value) == false) {
      if (e.target.value > 999) {
        e.target.value = 999;
      }
      setValue(e.target.value);
      if (
        e.nativeEvent.inputType == "deleteContentBackward" &&
        e.target.value == ""
      ) {
        setNum("0");
        return;
      } else {
        fetch(`/api/${e.target.value}`)
          .then((res) => res.json())
          .then((res) => {
            setNum(res.num);
          });
      }
    }
  };
  const click = () => {
    setValue("");
    setNum(0);
  };
  return (
    <div className={style.container}>
      <form>
        <input
          type="text"
          placeholder="enter the number ..."
          ref={data}
          spellCheck={false}
          onChange={change}
          value={value}
        />
        <button type="button">{num}</button>
        <button type="button" onClick={click}>
          🔄
        </button>
      </form>
    </div>
  );
};

export default index;
