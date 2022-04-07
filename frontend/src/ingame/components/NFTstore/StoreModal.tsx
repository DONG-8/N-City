import styled from "styled-components";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductAll, getSellProduct } from "../../../store/apis/product";
import { useMutation } from "react-query";
import ToggleSwitch from "../../../pages/NFTStore/ToggleSwitch";
import ToggleSwitch2 from "../../../pages/NFTStore/ToggleSwitch2";
import IsLoading2 from "../../../pages/NFTStore/IsLoading2";
import SmallItemCard from "../../../components/Card/SmallItemCard";
import GameDetailItem from "../../../pages/NFTStore/GameDetailItem";
import { randomwords } from "../../../pages/NFTStore/words";

interface Istate{
  item: {
    productFavoriteUser: Array<any>;
    productId: number;
    productTitle: string;
    productPrice: number;
    productThumbnailUrl: string;
    productFavorite: number;
    productRegDt: Object;
    productCode: number;
    productState: number;
    productFavoriteCount: number;
    favorite: boolean;
    tokenId?: number;
    userRole: string;
  }; 
}

const Wrapper = styled.div`
  /* text-align: center; */
  position: absolute;
  right: 100px;
  width: 1000px;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  padding: 4px;
  overflow-y: scroll;
  /* overflow-x: hidden; */
  .title {
    margin: auto;
    height: 10vh;
    width: 60vw;
    background-color: #030338;
    font-size: 5vh;
    font-weight: 600;
    color: white;
    padding-top: 3vh;
  }
  overflow-x: hidden;
`;
const ISL = styled.div`
  text-align: center;
  .loading{
    font-size: 40px;
    font-weight: 600;
  }
  
`
const CategoryBar = styled.div`
  margin: auto;
  margin-top: 5vh;
  width: 90%;
  display: flex;
  li {
    margin: auto;
  }
  p {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
    position: relative;
    text-align: center;
  }
  p::before {
    content: "";
    height: 5px;
    width: 0px;
    background-color: #6225e6;
    border-radius: 10px;
    transition: 0.3s;
    position: absolute;
    bottom: -0.5rem;
  }
  p:hover::before {
    width: 100%;
    background-color: #6225e6;
  }
  #category::before {
    width: 100%;
    background-color: #6225e6;
  }
`;
const ItemCards = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &:last-child {
    margin-right: auto;
  }
`;

const FilterButton = styled.div`
  position: relative;
  top: 50px;
  right: -150px;
  display: flex;
  justify-content: end;
  margin-right: 10vw;
  .toggle {
    margin-left: 3vw;
  }
  .name {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
  }
`; 
const CloseButton = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'/%3E%3C/svg%3E");
  width: 35px;
  height: 35px;
  position: sticky;
  top: 10px;
  left: 950px;
  cursor: pointer;
`; 
interface Iprops{
  setOpen : React.Dispatch<React.SetStateAction<boolean>>
}
const StoreModal:React.FC<Iprops> = ({setOpen}) => {
  const [filter, setFilter] = useState(0);
  const [status, setStatus] = useState(false);
  const [order, setOrder] = useState(false);
  const [allitems, setAllitems] = useState([]);
  const [saleitems, setSaleitems] = useState([]);
  const [showItems, setShowItems] = useState<any[]>([]);
  const [showSales, setShowSales] = useState<any[]>([]);
  const [mode,setMode]   = useState('index') // index,detail

  // 상품 정보 모두 가져오기
  const getAll = useMutation<any, Error>(
    "prouductAll",
    async () => {
      return await getProductAll({ page: 1, size: 1000 });
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setAllitems(res.content);
        setShowItems(res.content);
      },
      onError: (err: any) => {
        console.log(err, "상품정보 가져오기 오류");
      },
    }
  );
  const getSale = useMutation<any, Error>(
    "getSellProduct",
    async () => {
      return await getSellProduct();
    },
    {
      onSuccess: (res) => {
        setSaleitems(res.content);
        setShowSales(res.content);
      },
      onError: (err: any) => {
        console.log(err, "판매중 정보 실패");
      },
    }
  );

  const getFilter = (num) => {
    if (num === 0) {
      setShowItems(allitems);
      setShowSales(saleitems);
    } else {
      let items: Istate["item"][] = [];
      allitems.map((item: Istate["item"]) => {
        if (item.productCode === num) {
          items.push(item);
        }
      });
      setShowItems(items);

      let sales: Istate["item"][] = [];
      saleitems.map((item: Istate["item"]) => {
        if (item.productCode === num) {
          sales.push(item);
        }
      });
      setShowSales(sales);
    }
  };

  useEffect(() => {
    // 좋아요를 하고 status를 바꿔도 그대로인 오류...❌
    getAll.mutate();
    getSale.mutate();
  }, [status]);

  useEffect(() => {
    console.log("필터 함수!!!!!!!!");
    getFilter(filter);
  }, [filter]);

  return (
    <Wrapper>
      <CloseButton onClick={()=>{setOpen(true)}}/>
      {mode==='index'?<>
      {allitems.length > 0 && (
        <>
          <FilterButton>
            <div className="toggle">
              {status ? (
                <div className="name">판매하는</div>
              ) : (
                <div className="name">모든물품</div>
              )}
              <ToggleSwitch2 status={status} setStatus={setStatus} />
            </div>
            <div className="toggle">
              {order ? (
                <div className="name">오래된</div>
              ) : (
                <div className="name">최신순 </div>
              )}
              <ToggleSwitch order={order} setOrder={setOrder} />
            </div>
          </FilterButton>
          <CategoryBar>
            <li>
              <p
                id={filter === 0 ? "category" : ""}
                onClick={() => {
                  setFilter(0);
                }}
              >
                All
              </p>
            </li>
            <li>
              <p
                id={filter === 1 ? "category" : ""}
                onClick={() => {
                  setFilter(1);
                }}
              >
                Music
              </p>
            </li>
            <li>
              <p
                id={filter === 2 ? "category" : ""}
                onClick={() => {
                  setFilter(2);
                }}
              >
                Picture
              </p>
            </li>
            <li>
              <p
                id={filter === 3 ? "category" : ""}
                onClick={() => {
                  setFilter(3);
                }}
              >
                Video
              </p>
            </li>
            <li>
              <p
                id={filter === 4 ? "category" : ""}
                onClick={() => {
                  setFilter(4);
                }}
              >
                Art
              </p>
            </li>
            <li>
              <p
                id={filter === 5 ? "category" : ""}
                onClick={() => {
                  setFilter(5);
                }}
              >
                Celebrity
              </p>
            </li>
            <li>
              <p
                id={filter === 6 ? "category" : ""}
                onClick={() => {
                  setFilter(6);
                }}
              >
                Sports
              </p>
            </li>
            <li>
              <p
                id={filter === 7 ? "category" : ""}
                onClick={() => {
                  setFilter(7);
                }}
              >
                Character
              </p>
            </li>
            <li>
              <p
                id={filter === 8 ? "category" : ""}
                onClick={() => {
                  setFilter(8);
                }}
              >
                Animation
              </p>
            </li>
          </CategoryBar>
        </>
      )}
      {allitems.length === 0 && (
        <ISL>
          <IsLoading2 />
          <div className="loading">{randomwords()}</div>
        </ISL>
      )}
      <ItemCards>
        {!status &&
          showItems &&
          !order &&
          [...showItems].reverse().map((item, idx) => {
            return <SmallItemCard setMode={setMode} key={idx} item={item} />;
          })}
        {!status &&
          showItems &&
          order &&
          showItems.map((item, idx) => {
            return  <SmallItemCard setMode={setMode} key={idx} item={item} />;
          })}
        {status &&
          showSales &&
          !order &&
          [...showSales].reverse().map((item, idx) => {
            return  <SmallItemCard setMode={setMode} key={idx} item={item} />;
          })}
        {status &&
          showSales &&
          order &&
          showSales.map((item, idx) => {
            return  <SmallItemCard setMode={setMode} key={idx} item={item} />;
          })}
      </ItemCards>
    </>:
    <div className='Detail'>
      <KeyboardReturnIcon style={{  cursor: 'pointer'}} onClick={()=>{setMode('index')}} />
      <GameDetailItem setMode={setMode}/>
    </div>}
    </Wrapper>
  );
};

export default StoreModal;
