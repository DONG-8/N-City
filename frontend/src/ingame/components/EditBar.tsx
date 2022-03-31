import {useState} from "react";
import styled from "styled-components";
import phaserGame from "../PhaserGame";
import Editmap from "../scenes/Editmap";
import { Swiper, SwiperSlide } from 'swiper/react'

const Sidebar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100%;
  background-color: yellow;
  left: 0px;
  color: black;
`;

const XButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 20px;
  top: 10px;
  background-color: red;
`;

const CategoriWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const CategoriBar = styled.div`
  position: relative;
  width: 100px;
  height: 100%;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-content: center;

  div {
    width: 100%;
    height: 12.5%;
  }
`;

const ItemList = styled.div`
  background-color: orange;
  width: 100%;
  height: 100%;
`
enum ItemCategory {
  GROUND,
  WALL,
  CHAIR,
  WHITEBOARD
}

const EditBar = () => {
  const [status,setStatus] = useState(ItemCategory.GROUND)
  const [chairIndex, setChairIndex] = useState<number>(0) // 의자 회전
  const [chairGidList, setChairGidList] = useState([1, 2, 3, 4]) // 의자 회전
  const tileset = [198, 458, 586, 706, 842, 1858]
  const wallset = [34, 56, 301, 418, 466, 594]

  const choiceCatogory = (gid : number) => {
    const editmap = phaserGame.scene.keys.Editmap as Editmap
    editmap.selectItem(status, gid)
    // editmap.selectedItemC = status
    // editmap.itemGid = gid
  }

  const makeImgTags = (folderName:string, startnum:number, endnum:number) => {
    let temp:number[] = []
    for (let i = startnum; i< endnum + 1; i ++){
      temp.push(i)
    }
    if(folderName === 'grounds') {
      temp = tileset
    } else if (folderName === 'walls') {
      temp = wallset
    }
    return (
      <ItemList>
        {temp.map((item, idx) => {
          return <img src={`essets/items_for_edit/${folderName}/${item}.png`}  onClick={()=>{choiceCatogory(item)}} width="32px"/>
        })}
      </ItemList>
    )
  }

  // const selectChair = (chairGid : number) => {
  //   setChairGidList([chairGid, chairGid+1, chairGid+3, chairGid+4])
  // }

  const returnItemList = () => {
    switch (status) {
      case ItemCategory.GROUND:
        return makeImgTags('grounds', 0, 0)
        break
      case ItemCategory.WALL:
        return makeImgTags('walls', 0, 0)
        break
      case ItemCategory.WHITEBOARD: 
        return makeImgTags('whiteboards', 4685, 4687)
        break
      case ItemCategory.CHAIR: 
          return makeImgTags('chairs', 2561, 2583)
          break
      default:
        return 'asdf'
    }
  }

  return (
    <Sidebar>
      <h1>맵 수정</h1>
      <XButton>X</XButton>

      <CategoriWrapper>
        <CategoriBar>
          <div onClick={()=>{setStatus(ItemCategory.GROUND)}} className="Ground">ground</div>
          <div onClick={()=>{setStatus(ItemCategory.WALL)}} className="Wall">Wall</div>
          <div onClick={()=>{setStatus(ItemCategory.CHAIR)}} className="Chair">Chair</div>
          <div onClick={()=>{setStatus(ItemCategory.WHITEBOARD)}} className="Whiteboard">Whiteboard</div>

          <div>Basement</div>
          <div>computer</div>
          <div>GenericObjects</div>
          <div>ObjectsOnCollide</div>
          <div>Object</div>
          <div>Wall</div>
        </CategoriBar>
      </CategoriWrapper>
      {returnItemList()}
    </Sidebar>
  );
};

export default EditBar;
