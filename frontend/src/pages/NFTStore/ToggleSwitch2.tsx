import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`

.input_wrapper{
  width: 4.3vw;
  height: 4.2vh;
  position: relative;
  cursor: pointer;
}

.input_wrapper input[type="checkbox"]{
  width: 4.3vw;
  height: 4.2vh;
  cursor: pointer;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background: #6225E6  ;
  border-radius: 20px;
  position: relative;
  outline: 0;
  -webkit-transition: all .2s;
  transition: all .2s;
}

.input_wrapper input[type="checkbox"]:after{
  position: absolute;
  content: "";
  top: 3px;
  left: 3px;
  width: 1.8vw;
  height: 3.5vh;
  background: #dfeaec;
  z-index: 2;
  border-radius: 100%;
  -webkit-transition: all .35s;
  transition: all .35s;
}

.input_wrapper svg{
  position: absolute;
  top: 50%;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  fill: #fff;
  -webkit-transition: all .35s;
  transition: all .35s;
  z-index: 1;
}

/* Checked State */
.input_wrapper input[type="checkbox"]:checked{
  background: #315e7f;
}

.input_wrapper input[type="checkbox"]:checked:after{
  left: calc(100% - 37px);
}

.input_wrapper input[type="checkbox"]:checked + .is_checked{
  -webkit-transform: translateX(0) translateY(-30%) scale(1);
          transform: translateX(0) translateY(-30%) scale(1);
}

.input_wrapper input[type="checkbox"]:checked ~ .is_unchecked{
  -webkit-transform: translateX(-190%) translateY(-30%) scale(0);
          transform: translateX(-190%) translateY(-30%) scale(0);
}

`
interface Iprops{
  status:boolean,
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const ToggleSwitch2:React.FC<Iprops>= ({status,setStatus}) => {
  const [isCheckNew,setIsCheckNew] = useState(status)
  useEffect(()=>{
    setStatus(isCheckNew)
  },[isCheckNew])
  return (
    <Wrapper>
    <div className="switch_box box_4">
      <div className="input_wrapper">
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setIsCheckNew(e.target.checked)
        }} type="checkbox" className="switch_4"/>
      </div>
    </div>
    </Wrapper>
  )
}

export default ToggleSwitch2