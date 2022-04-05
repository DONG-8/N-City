import React from "react";

const StoreModalCopy = () => {
  return <div>StoreModal copy</div>;
};

export default StoreModalCopy;

// import styled from "styled-components";
// import GameItemCard from "./GameItemCard";
// import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// import GameDetailItem from "./GameDetailItem";
// import { Button } from "@mui/material";
// import CharacterPage from "./CharacterPage";
// import React, { useEffect, useState } from "react";
// import { getProductAll, getSellProduct } from "../../../store/apis/product";
// import { useMutation, useQuery } from "react-query";
// import ItemCard2 from "../../../components/Card/ItemCard2";
// import ItemCard from "../../../components/Card/ItemCard";
// import ToggleSwitch from "../../../pages/NFTStore/ToggleSwitch";
// import ToggleSwitch2 from "../../../pages/NFTStore/ToggleSwitch2";
// import IsLoading2 from "../../../pages/NFTStore/IsLoading2";
// import IsLoading from "../../../pages/NFTStore/IsLoading";

// interface Istate {
//   item: {
//     productId: Number;
//     productTitle: string;
//     productPrice: Number;
//     productThumbnailUrl: string;
//     productFavorite: Number;
//     productRegDt: Object;
//     productCode: Number;
//     productFavoriteUser: {
//       authId: Number;
//       userAddress: string;
//       userDescription: string;
//       userEmail: string;
//       userEmailConfirm: boolean;
//       userId: number;
//       userImgUrl: string;
//       userNick: string;
//       userRole: string;
//     }[];
//     userRole: string;
//   };
// }

// const Wrapper = styled.div`
//   text-align: center;
//   position: absolute;
//   right: 100px;
//   width: 1000px;
//   height: 600px;
//   background-color: white;
//   border-radius: 10px;
//   padding: 4px;
//   overflow-y: scroll;
//   /* overflow-x: hidden; */
//   .title {
//     margin: auto;
//     height: 10vh;
//     width: 60vw;
//     background-color: #030338;
//     font-size: 5vh;
//     font-weight: 600;
//     color: white;
//     padding-top: 3vh;
//   }
// `;
// const ItemCards = styled.div`
//   margin: auto;
//   width: 90%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
// `;
// const NavBar = styled.div`
//   display: flex;
// `;

// const StoreModal = () => {
//   const [filter, setFilter] = useState(0);
//   const [status, setStatus] = useState(false);
//   const [order, setOrder] = useState(false);
//   const [allitems, setAllitems] = useState([]);
//   const [saleitems, setSaleitems] = useState([]);
//   const [showItems, setShowItems] = useState<any[]>([]);
//   const [showSales, setShowSales] = useState<any[]>([]);
//   // 상품 정보 모두 가져오기
//   const getAll = useMutation<any, Error>(
//     "prouductAll",
//     async () => {
//       return await getProductAll({ page: 1, size: 1000 });
//     },
//     {
//       onSuccess: (res) => {
//         console.log(res);
//         setAllitems(res.content);
//         setShowItems(res.content);
//       },
//       onError: (err: any) => {
//         console.log(err, "상품정보 가져오기 오류");
//       },
//     }
//   );
//   const getSale = useMutation<any, Error>(
//     "getSellProduct",
//     async () => {
//       return await getSellProduct();
//     },
//     {
//       onSuccess: (res) => {
//         setSaleitems(res.content);
//         setShowSales(res.content);
//       },
//       onError: (err: any) => {
//         console.log(err, "판매중 정보 실패");
//       },
//     }
//   );

//   const getFilter = (num) => {
//     if (num === 0) {
//       setShowItems(allitems);
//       setShowSales(saleitems);
//     } else {
//       let items: Istate["item"][] = [];
//       allitems.map((item: Istate["item"]) => {
//         if (item.productCode === num) {
//           items.push(item);
//         }
//       });
//       setShowItems(items);

//       let sales: Istate["item"][] = [];
//       saleitems.map((item: Istate["item"]) => {
//         if (item.productCode === num) {
//           sales.push(item);
//         }
//       });
//       setShowSales(sales);
//     }
//   };

//   useEffect(() => {
//     // 좋아요를 하고 status를 바꿔도 그대로인 오류...❌
//     getAll.mutate();
//     getSale.mutate();
//   }, [status]);

//   useEffect(() => {
//     console.log("필터 함수!!!!!!!!");
//     getFilter(filter);
//   }, [filter]);

//   return (
//     <Wrapper>
//       <NavBar>
//         <Button
//           onClick={() => {
//             setMode("index");
//           }}
//         >
//           {" "}
//           판매중인 NFT{" "}
//         </Button>
//         <Button
//           onClick={() => {
//             setMode("character");
//           }}
//         >
//           {" "}
//           캐릭터 상점{" "}
//         </Button>
//       </NavBar>
//       {mode === "index" && (
//         <div className="Index">
//           <div className="title"> 판매중인 상품</div>
//           <ItemCards>
//             {!status &&
//               showItems &&
//               !order &&
//               [...showItems].reverse().map((item, idx) => {
//                 return <StoreItemCard key={idx} item={item} />;
//               })}
//             {!status &&
//               showItems &&
//               order &&
//               showItems.map((item, idx) => {
//                 return <StoreItemCard key={idx} item={item} />;
//               })}
//             {status &&
//               showSales &&
//               !order &&
//               [...showSales].reverse().map((item, idx) => {
//                 return <StoreItemCard key={idx} item={item} />;
//               })}
//             {status &&
//               showSales &&
//               order &&
//               showSales.map((item, idx) => {
//                 return <StoreItemCard key={idx} item={item} />;
//               })}
//           </ItemCards>
//         </div>
//       )}
//       {mode === "detail" && (
//         <div className="Detail">
//           {/* <KeyboardReturnIcon
//             style={{ cursor: "pointer", color: "red" }}
//             onClick={() => {
//               setMode("index");
//             }}
//           /> */}
//           <GameDetailItem setMode={setMode} />
//         </div>
//       )}
//       {mode === "character" && characters !== undefined && (
//         <div className="Caracter">
//           <KeyboardReturnIcon
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               setMode("index");
//             }}
//           />
//           <div className="title"> 캐릭터상점</div>
//           {characters !== undefined ? (
//             <ItemCards>
//               {characters.content.map((item, idx) => {
//                 return <GameItemCard setMode={setMode} key={idx} item={item} />;
//               })}
//             </ItemCards>
//           ) : (
//             <div>정보없음</div>
//           )}
//         </div>
//       )}
//     </Wrapper>
//   );
// };

// export default StoreModal;
