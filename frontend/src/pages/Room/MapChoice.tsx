import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Maps = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Map = styled.div`
  width: 25vw;
  height: 35vh;
  margin: 5vh;
  cursor: pointer;
  img{
    height: 100%;
    width: 100%;
    border-radius: 20px;
    opacity: 0.8;
    box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
    &:hover{
      transform: translateY(-5px);
      opacity: 1;
    }
  }
  .choice{
    opacity: 1;
    border: 5px solid purple;
  }
`
const MapChoice = () => {
  const [map,setMap] = useState('1')
  useEffect(()=>{
    localStorage.setItem('roomNum',map);
  },[map])
  return (
    <div>
      <Maps>
        <Map onClick={()=>{ setMap('1')}}>
          <img className={map==='1'? 'choice':''} alt='map' src='essets/map/map2.png'/>
        </Map>
        <Map onClick={()=>{ setMap('2') }}>
          <img className={map==='2'? 'choice':''} alt='map' src='essets/map/map2.png'/>
        </Map>
        <Map onClick={()=>{ setMap('3') }}>
          <img className={map==='3'? 'choice':''} alt='map' src='essets/map/map3.png'/>
        </Map>
        <Map onClick={()=>{ setMap('4') }}>
          <img className={map==='4'? 'choice':''} alt='map' src='essets/map/map4.png'/>
        </Map>
        <Map onClick={()=>{ setMap('5') }}>
          <img className={map==='5'? 'choice':''} alt='map' src='essets/map/map5.png'/>
        </Map>
        <Map onClick={()=>{ setMap('6') }}>
          <img className={map==='6'? 'choice':''} alt='map' src='essets/map/map6.png'/>
        </Map>
      </Maps>
    </div>
  )
}

export default MapChoice