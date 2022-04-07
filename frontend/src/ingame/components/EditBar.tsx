import {useState, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import {useMutation} from "react-query";
import styled from "styled-components";
import phaserGame from "../PhaserGame";
import Editmap from "../scenes/Editmap";

import itemFileList from './itemFileList.json'
import firstmap from "../scenes/map.json";

import { UserMapInfo } from "../stores/EditStore";
import { postRoomJoin, putBackGroundChange } from "../../store/apis/myRoom";
import { getUsercollectedInfo } from "../../store/apis/user";
import { putProductXYView } from "../../store/apis/product";
import { IUser } from "colyseus.js/lib/Auth";
import { prototype } from "node-polyfill-webpack-plugin";
import { TRUE } from "sass";

const Sidebar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  background-color: yellow;
  right: 0;
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
  GENERIC,
  INTERACTION,
  RUGS,
  STAIRS,
  TABLES,
  WINDOW_DOOR,
  BASEMENT,
  STRUCTURE,
  MYART
}

interface Ibody {
  id: number;
  view: boolean;
  x: number;
  y: number;
}

const EditBar = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState(firstmap);
  const [myArts, setMyArts] = useState({content:[{productThumbnailUrl:'', productId:0, productView:false, productXCoordinate: 0, productYCoordinate:0}]});
  const [putArts, setPutArts] = useState([{id:0, x:0, y:0, view:true}]);

  const [status,setStatus] = useState(ItemCategory.GROUND)
  const [itemWidth, setItemWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [itemGid, setItemGid] = useState(0)
  const [itemView, setItemView] = useState(true)
  
  const [mode, setMode] = useState(true);
  const location = useAppSelector((state) => state.edit.locationInfo);
  const userId = useAppSelector((state) => state.edit.userId);
  // const myArts = useAppSelector((state) => state.edit.arts);

  useEffect(() => {
    roomInfo.mutate()
  },[])

  const Files = itemFileList.folders;
  const tileset = [198, 458, 586, 706, 842, 1858]
  const wallset = [34, 56, 301, 418, 466, 594]

  const choiceCatogory = (gid : number, itemWidth: number, itemHeight: number) => {
    setItemGid(gid) // editbar 아이템 값 변경 (여기)
    setItemWidth(itemWidth)
    setItemHeight(itemHeight)

    const editmap = phaserGame.scene.keys.Editmap as Editmap
    editmap.selectedItemC = status
    editmap.itemGid = gid
    editmap.itemWidth = itemWidth
    editmap.itemHeight = itemHeight
  }

  const makeImgTags = (folderName:string, itemsGid:number[]) => {
    return (
      <ItemList>
        {itemsGid.map((item, idx) => {
          return <img src={`essets/items_for_edit/${folderName}/${item}.png`}  onClick={()=>{choiceCatogory(item, 32, 32)}} width="32px" key={idx}/>
        })}
      </ItemList>
    )
  }

  const makeImgTagsForOb = (index: number) => {
    return (
      <ItemList>
        {Files[index].products.map((product) => {
          return (product.ids.map((id, idx) => {
           return <img src={`essets/items_for_edit/${Files[index].name}/${product.width}X${product.height}/${id}.png`}  onClick={()=>{choiceCatogory(id, product.width, product.height)}} width={`${product.width}px`} key={idx}/>
        }))
      })}
      </ItemList>
    )
  }

  const makeImgTagsByMyArt = (id: number, view:boolean) => {
    // true => editbar 없음, myroom에 있음
    // false => ,,   있음,   ,, 없음 
    return (
      <ItemList>
        {myArts.content.map((product, idx) => {
          if (product.productView === false || (product.productId === id && !view) ) {
            if (product.productId === id && view) {
              return null
            }
            else {
              return <img src={`${product.productThumbnailUrl}`}  onClick={()=>{choiceCatogory(product.productId, 120, 80)}} width="120px" key={idx}/>
            }
          } 
      })}
      </ItemList>
    )
  }

  const returnItemList = () => {
    switch (status) {
      case ItemCategory.GROUND:
        return makeImgTags('grounds', tileset)
        break
      case ItemCategory.WALL:
        return makeImgTags('walls', wallset)
        break
      case ItemCategory.CHAIR: 
        return makeImgTagsForOb(0)
        break
      case ItemCategory.GENERIC: 
        return makeImgTagsForOb(1)
        break
      case ItemCategory.INTERACTION: 
        return makeImgTagsForOb(2)
        break
      case ItemCategory.RUGS: 
        return makeImgTagsForOb(3)
        break
      case ItemCategory.STAIRS: 
        return makeImgTagsForOb(4)
        break
      case ItemCategory.TABLES: 
        return makeImgTagsForOb(5)
        break
      case ItemCategory.WINDOW_DOOR: 
        return makeImgTagsForOb(6)
        break
      case ItemCategory.BASEMENT: 
        return makeImgTagsForOb(7)
        break
      case ItemCategory.STRUCTURE: 
        return makeImgTagsForOb(8)
        break
      case ItemCategory.MYART:
        return makeImgTagsByMyArt(0, true)
        break
      default:
        return null;
    }
  }

  function findLayerIndex() {
    switch (status) {
      case ItemCategory.WALL:
        return 1
        break
      case ItemCategory.CHAIR:
        return 2
        break
      case ItemCategory.RUGS: case ItemCategory.STAIRS: case ItemCategory.WINDOW_DOOR: 
        return 5
      case ItemCategory.GENERIC: case ItemCategory.TABLES: 
        return 6
        break
      case ItemCategory.INTERACTION: 
        if (itemGid < 4685) {
          return 7
        } else {
          return 8
        }
        break
      case ItemCategory.BASEMENT: 
        return 9
        break
      default:
        return -1;
    }
  }

  const ModeChange = (isCreateMode: boolean) => {
    const editmap = phaserGame.scene.keys.Editmap as Editmap
    if (isCreateMode) {
      console.log("생성모드");
      setMode(true);
      editmap.isCreateMode = true
    } else {
      console.log("삭제 변경");
      setMode(false);
      editmap.isCreateMode = false
    }
  };

  useEffect(() => {
    if(location.x < 1249 && location.y >= 0) {
      console.log(location.x, location.y)
      ChangeMap()
      console.log('바뀜')
    }
  }, [location]);

  const newData = data;
  const newArtList = myArts;
  function ChangeMap() {
    // console.log(newData)
    if (mode) {
      if (status === ItemCategory.GROUND && newData.layers[0].data){  // 타일 데이터 넣기 
        newData.layers[0].data[location.x] = location.gid
      } else if (status === ItemCategory.CHAIR) { // 의자 데이터 넣기 
        let chairDirection = "down"
        if (itemGid == 2563 || itemGid == 2569) {
          chairDirection = "left"
        } else if (itemGid == 2564 || itemGid == 2570) {
          chairDirection = "right"
        } else if (itemGid == 2566 || itemGid == 2572) {
          chairDirection = "up"
        }
        const chair = {
          gid: location.gid,
          height: itemHeight,
          id: 100000,
          name: "",
          properties: [
            {
              name: "direction",
              type: "string",
              value: chairDirection,
            },
          ],
          rotation: 0,
          type: "",
          visible: true,
          width: itemWidth,
          x: location.x,
          y: location.y,
        };
        newData.layers[2].objects?.push(chair);
        setData(newData);
      } else if (status === ItemCategory.MYART) { // 작품 데이터 넣기 
        for (var key of newArtList.content) {
          if (key.productId === location.gid) {
            // key.productXCoordinate = /
          }
        }
        putArts.push({id: location.gid, x: location.x, y: location.y, view: true})
        makeImgTagsByMyArt(location.gid, true)
      } else {
        const item = {
          gid: location.gid,
          height: itemHeight,
          id: 100000,
          name:"",
          properties:[],
          rotation: 0,
          type:"",
          visible:true,
          width: itemWidth,
          x: location.x,
          y: location.y
         }
         newData.layers[findLayerIndex()].objects?.push(item)
         setData(newData);
      }
      // 저장이 눌려지면 newData를 업데이트 시켜줍니다.
    } else {
      if (location.gid === 10) { // 작품일 경우 삭제 
        putArts.push({id:location.x, x:0, y:0, view:false})
        makeImgTagsByMyArt(location.x, false)
      } else {
        const DelData = newData.layers[location.gid].objects?.filter((obj, i) => {
          return obj.x !== location.x && obj.y !== location.y;
        });
        newData.layers[location.gid].objects = DelData
        setData(newData)
      }
    }
  }


  const roomInfo = useMutation<any, Error>(
    "postRoomInfo",
    async () => {
      return await postRoomJoin(userId);
    },
    {
      onSuccess: (res) => {
        setData(res.myRoomBackground);
        // newData = res.myRoomBackground
        console.log(res.myRoomBackground, "백그라운드정보");
      },
    }
  );

  const {
    mutate: changeRoom,
    } = useMutation<any, Error>(
    "putBackGroundChange",
    async () => {
      return await putBackGroundChange(data);
    },
    {
      onSuccess: (res) => {
        dispatch(UserMapInfo(data))
        console.log(putArts)
        putArts.map((product, idx) => {
          if (idx > 0) {
            putProductXY({id: product.id, view: product.view, x: product.x, y: product.y})
          }
        })
        setPutArts([{id:0, x:0, y:0, view:true}])
        console.log('저장 완료')
      },
      onError: (err: any) => {
        console.log(err)
      },
    }
  );

  
  const {
    mutate: getMyArts,
    } = useMutation<any, Error>(
    "getUsercollectedInfo",
    async () => {
      return await getUsercollectedInfo(1);
    },
    {
      onSuccess: (res) => {
        console.log('완료')
        setMyArts(res)
      },
      onError: (err: any) => {
        console.log(err)
      },
    }
  );

  const {
    mutate: putProductXY,
    } = useMutation<any, Error, Ibody>(
    "putProductXYView",
    async (data) => {
      const body = {
        "productId": data.id,
        "productView": data.view,
        "productXCoordinate": data.x,
        "productYCoordinate": data.y
      }
      return await putProductXYView(body);
    },
    {
      onSuccess: (res) => {
        console.log('작품 수정 완료')
      },
      onError: (err: any) => {
        console.log(err)
      },
    }
  );

  return (
    <Sidebar>
      <h1 onClick={() => changeRoom()}>저장</h1>
      <h1>삭제</h1>
      <h1>맵 수정</h1>

      <h1 onClick={() => ModeChange(true)}>생성모드</h1>
      <h1 onClick={() => ModeChange(false)}>삭제모드</h1>
      <XButton>X</XButton>

      <CategoriWrapper>
        <CategoriBar>
          <div onClick={()=>{setStatus(ItemCategory.GROUND); ModeChange(true)}} className="Ground">ground</div>
          <div onClick={()=>{setStatus(ItemCategory.WALL); ModeChange(true)}} className="Wall">Wall</div>
          <div onClick={()=>{setStatus(ItemCategory.INTERACTION); ModeChange(true)}} className="Interaction">Interaction</div>
          <div onClick={()=>{setStatus(ItemCategory.CHAIR); ModeChange(true)}} className="Chair">Chair</div>
          <div onClick={()=>{setStatus(ItemCategory.GENERIC); ModeChange(true)}} className="Generic">Generic</div>
          <div onClick={()=>{setStatus(ItemCategory.RUGS); ModeChange(true)}} className="Rugs">Rug</div>
          <div onClick={()=>{setStatus(ItemCategory.WINDOW_DOOR); ModeChange(true)}} className="Window_Door">Window &#38; Door</div>
          <div onClick={()=>{setStatus(ItemCategory.STAIRS); ModeChange(true)}} className="Stairs">Stairs</div>
          <div onClick={()=>{setStatus(ItemCategory.STRUCTURE); ModeChange(true)}} className="Structure">Structure</div>
          <div onClick={()=>{setStatus(ItemCategory.BASEMENT); ModeChange(true)}} className="Basement">Basement</div>
          <div onClick={()=>{setStatus(ItemCategory.MYART); getMyArts(); ModeChange(true)}} className="MyArt">MyArt</div>
        </CategoriBar>
      </CategoriWrapper>
      {returnItemList()}
    </Sidebar>
  );
};

export default EditBar;
