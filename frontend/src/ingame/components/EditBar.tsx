import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useMutation } from "react-query";
import styled from "styled-components";
import phaserGame from "../PhaserGame";
import Editmap from "../scenes/Editmap";

import itemFileList from "./itemFileList.json";
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
  width: 20%;
  height: 98.5%;
  background-color: white;
  padding: 4px 2px;
  right: 0;
  color: black;
  border-radius: 10px;
  /* overflow-y: scroll; */
`;

const XButton = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin-right: 20px;
  margin-top: 20px;
  /* background-color: red; */
  display: flex;
  justify-content: space-around;
  font-size: 120%;
  .button {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

const CategoriWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const CategoriBar = styled.div`
  position: relative;
  /* background-color: green; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 3px solid gray;
  border-top: 3px solid gray;

  button {
    width: 75px;
    height: 40px;
    margin: 10px;
    background-color: #e998e7;
    border-radius: 6px;
    :hover {
      background-color: #d064ce;
    }
    .click {
      background-color: #d064ce;
    }
  }
`;

const ItemWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ItemList = styled.div`
  /* background-color: orange; */
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: scroll;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .imgWrapper {
    width: 120px;
    height: 120px;
    border-radius: 10px;
  }

  img {
    margin: 8px;
    width: 100px;
    height: 100px;
  }
`;
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
  MYART,
  NONE,
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
  const [myArts, setMyArts] = useState({
    content: [
      {
        productThumbnailUrl: "",
        productId: 0,
        productView: false,
        productXCoordinate: 0,
        productYCoordinate: 0,
      },
    ],
  });
  const [putArts, setPutArts] = useState([{ id: 0, x: 0, y: 0, view: true }]);

  const [status, setStatus] = useState(ItemCategory.GROUND);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [itemGid, setItemGid] = useState(0);
  const [itemView, setItemView] = useState(true);

  const [mode, setMode] = useState(true);
  const location = useAppSelector((state) => state.edit.locationInfo);
  const userId = useAppSelector((state) => state.edit.userId);
  // const myArts = useAppSelector((state) => state.edit.arts);

  useEffect(() => {
    roomInfo.mutate();
    getMyArts();
  }, []);

  useEffect(() => {
    // setStatus(ItemCategory.MYART)
    returnItemList(true);
    console.log("klasfdjalsdjl");
  }, [myArts]);

  useEffect(() => {
    if (location.x < 1249 && location.y >= 0) {
      ChangeMap();
    }
  }, [location]);

  const Files = itemFileList.folders;
  const tileset = [198, 458, 586, 706, 842, 1858];
  const wallset = [34, 56, 301, 418, 466, 594];

  const choiceCatogory = (
    gid: number,
    itemWidth: number,
    itemHeight: number
  ) => {
    setItemGid(gid); // editbar 아이템 값 변경 (여기)
    setItemWidth(itemWidth);
    setItemHeight(itemHeight);

    const editmap = phaserGame.scene.keys.Editmap as Editmap;
    editmap.selectedItemC = status;
    editmap.itemGid = gid;
    editmap.itemWidth = itemWidth;
    editmap.itemHeight = itemHeight;
  };

  const makeImgTags = (folderName: string, itemsGid: number[]) => {
    return (
      <div className="imgWrapper">
        <ItemList>
          {itemsGid.map((item, idx) => {
            return (
              <img
                src={`/essets/items_for_edit/${folderName}/${item}.png`}
                onClick={() => {
                  choiceCatogory(item, 32, 32);
                }}
                width="32px"
                key={idx}
              />
            );
          })}
        </ItemList>
      </div>
    );
  };

  const makeImgTagsForOb = (index: number) => {
    return (
      <div className="imgWrraper">
        <ItemList>
          {Files[index].products.map((product) => {
            return product.ids.map((id, idx) => {
              return (
                <img
                  src={`/essets/items_for_edit/${Files[index].name}/${product.width}X${product.height}/${id}.png`}
                  onClick={() => {
                    choiceCatogory(id, product.width, product.height);
                  }}
                  width={`${product.width}px`}
                  key={idx}
                />
              );
            });
          })}
        </ItemList>
      </div>
    );
  };

  const makeImgTagsByMyArt = () => {
    // true => editbar 없음, myroom에 있음
    // false => ,,   있음,   ,, 없음
    return (
      <div className="imgWrraper">
        <ItemList>
          {myArts.content.map((product, idx) => {
            if (product.productView === false) {
              return (
                <img
                  src={`${product.productThumbnailUrl}`}
                  onClick={() => {
                    choiceCatogory(product.productId, 120, 80);
                  }}
                  width="120px"
                  key={idx}
                />
              );
            }
          })}
        </ItemList>
      </div>
    );
  };

  const returnItemList = (isMyArt = false) => {
    if (isMyArt) {
      return makeImgTagsByMyArt();
    }
    switch (status) {
      case ItemCategory.GROUND:
        return makeImgTags("grounds", tileset);
        break;
      case ItemCategory.WALL:
        return makeImgTags("walls", wallset);
        break;
      case ItemCategory.CHAIR:
        return makeImgTagsForOb(0);
        break;
      case ItemCategory.GENERIC:
        return makeImgTagsForOb(1);
        break;
      case ItemCategory.INTERACTION:
        return makeImgTagsForOb(2);
        break;
      case ItemCategory.RUGS:
        return makeImgTagsForOb(3);
        break;
      case ItemCategory.STAIRS:
        return makeImgTagsForOb(4);
        break;
      case ItemCategory.TABLES:
        return makeImgTagsForOb(5);
        break;
      case ItemCategory.WINDOW_DOOR:
        return makeImgTagsForOb(6);
        break;
      case ItemCategory.BASEMENT:
        return makeImgTagsForOb(7);
        break;
      case ItemCategory.STRUCTURE:
        return makeImgTagsForOb(8);
        break;
      case ItemCategory.MYART:
        return makeImgTagsByMyArt();
        break;
      default:
        return null;
    }
  };

  function findLayerIndex() {
    switch (status) {
      case ItemCategory.WALL:
        return 1;
        break;
      case ItemCategory.CHAIR:
        return 2;
        break;
      case ItemCategory.RUGS:
      case ItemCategory.STAIRS:
      case ItemCategory.WINDOW_DOOR:
        return 5;
      case ItemCategory.GENERIC:
      case ItemCategory.TABLES:
        return 6;
        break;
      case ItemCategory.INTERACTION:
        if (itemGid < 4685) {
          return 7;
        } else {
          return 8;
        }
        break;
      case ItemCategory.BASEMENT:
        return 9;
        break;
      default:
        return -1;
    }
  }

  const ModeChange = (isCreateMode: boolean) => {
    const editmap = phaserGame.scene.keys.Editmap as Editmap;
    if (isCreateMode) {
      console.log("생성모드");
      setMode(true);
      editmap.isCreateMode = true;
    } else {
      console.log("삭제 변경");
      setMode(false);
      editmap.isCreateMode = false;
    }
  };

  const newData = data;
  const newArtList = myArts;
  function ChangeMap() {
    // console.log(newData)
    if (mode) {
      if (status === ItemCategory.GROUND && newData.layers[0].data) {
        // 타일 데이터 넣기
        newData.layers[0].data[location.x] = location.gid;
      } else if (status === ItemCategory.CHAIR) {
        // 의자 데이터 넣기
        let chairDirection = "down";
        if (itemGid == 2563 || itemGid == 2569) {
          chairDirection = "left";
        } else if (itemGid == 2564 || itemGid == 2570) {
          chairDirection = "right";
        } else if (itemGid == 2566 || itemGid == 2572) {
          chairDirection = "up";
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
      } else if (status === ItemCategory.MYART) {
        // 작품 데이터 넣기
        for (var key of newArtList.content) {
          if (key.productId === location.gid) {
            key.productXCoordinate = location.x;
            key.productYCoordinate = location.y;
            key.productView = true;
            break;
          }
        }
        // putArts.push({id: location.gid, x: location.x, y: location.y, view: true})
        // makeImgTagsByMyArt(location.gid, true)
        setMyArts(newArtList);
      } else {
        const item = {
          gid: location.gid,
          height: itemHeight,
          id: 100000,
          name: "",
          properties: [],
          rotation: 0,
          type: "",
          visible: true,
          width: itemWidth,
          x: location.x,
          y: location.y,
        };
        newData.layers[findLayerIndex()].objects?.push(item);
        setData(newData);
      }
      // 저장이 눌려지면 newData를 업데이트 시켜줍니다.
    } else {
      if (location.gid === 10) {
        // 작품일 경우 삭제
        // putArts.push({id:location.x, x:0, y:0, view:false})
        // makeImgTagsByMyArt(location.x, false)
        for (var key of newArtList.content) {
          if (key.productId === location.gid) {
            key.productXCoordinate = location.x;
            key.productYCoordinate = location.y;
            key.productView = false;
            break;
          }
        }
        setMyArts(newArtList);
        console.log(newArtList);
      } else {
        const DelData = newData.layers[location.gid].objects?.filter(
          (obj, i) => {
            return obj.x !== location.x && obj.y !== location.y;
          }
        );
        newData.layers[location.gid].objects = DelData;
        setData(newData);
      }
    }
  }

  const roomInfo = useMutation<any, Error>(
    "postRoomInfo",
    async () => {
      return await postRoomJoin(15);
    },
    {
      onSuccess: (res) => {
        setData(res.myRoomBackground);
        // newData = res.myRoomBackground
        console.log(res.myRoomBackground, "백그라운드정보");
      },
    }
  );

  const { mutate: changeRoom } = useMutation<any, Error>(
    "putBackGroundChange",
    async () => {
      return await putBackGroundChange(data);
    },
    {
      onSuccess: (res) => {
        dispatch(UserMapInfo(data));
        console.log(putArts);
        myArts.content.map((product, idx) => {
          if (idx > 0) {
            console.log(product);
            putProductXY({
              id: product.productId,
              view: product.productView,
              x: product.productXCoordinate,
              y: product.productYCoordinate,
            });
          }
        });
        setPutArts([{ id: 0, x: 0, y: 0, view: true }]);
        console.log("저장 완료");
        window.location.reload();
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const { mutate: getMyArts } = useMutation<any, Error>(
    "getUsercollectedInfo",
    async () => {
      return await getUsercollectedInfo(15);
    },
    {
      onSuccess: (res) => {
        console.log("완료");
        setMyArts(res);
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const { mutate: putProductXY } = useMutation<any, Error, Ibody>(
    "putProductXYView",
    async (data) => {
      const body = {
        productId: data.id,
        productView: data.view,
        productXCoordinate: data.x,
        productYCoordinate: data.y,
      };
      return await putProductXYView(body);
    },
    {
      onSuccess: (res) => {
        console.log("작품 수정 완료");
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  return (
    <Sidebar>
      <XButton>
        {mode ? <div>생성중</div> : <div>삭제중</div>}

        <div>
          <img
            className="button"
            src="/essets/room/save.png"
            alt=""
            onClick={() => changeRoom()}
          />
          <img
            className="button"
            src="/essets/room/delete.png"
            alt=""
            onClick={() => ModeChange(false)}
          />
          <img
            className="button"
            src="/essets/room/edit.png"
            alt=""
            onClick={() => ModeChange(true)}
          />
          <img className="button" src="/essets/room/close.png" alt="" />
        </div>
      </XButton>

      <CategoriWrapper>
        <CategoriBar>
          <button
            onClick={() => {
              setStatus(ItemCategory.GROUND);
              ModeChange(true);
            }}
            className="Ground"
            id="{}"
          >
            ground
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.WALL);
              ModeChange(true);
            }}
            className="Wall"
          >
            벽
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.INTERACTION);
              ModeChange(true);
            }}
            className="Interaction"
          >
            상호작용
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.CHAIR);
              ModeChange(true);
            }}
            className="Chair"
          >
            의자
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.GENERIC);
              ModeChange(true);
            }}
            className="Generic"
          >
            제내릭
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.RUGS);
              ModeChange(true);
            }}
            className="Rugs"
          >
            러그
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.WINDOW_DOOR);
              ModeChange(true);
            }}
            className="Window_Door"
          >
            창문,문
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.STAIRS);
              ModeChange(true);
            }}
            className="Stairs"
          >
            ????
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.STRUCTURE);
              ModeChange(true);
            }}
            className="Structure"
          >
            Structure
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.BASEMENT);
              ModeChange(true);
            }}
            className="Basement"
          >
            Basement
          </button>
          <button
            onClick={() => {
              setStatus(ItemCategory.MYART);
              ModeChange(true);
            }}
            className="MyArt"
          >
            MyArt
          </button>
        </CategoriBar>
      </CategoriWrapper>
      <ItemWrapper>{returnItemList()}</ItemWrapper>
    </Sidebar>
  );
};

export default EditBar;
