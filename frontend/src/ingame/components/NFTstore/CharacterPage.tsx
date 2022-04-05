import React from 'react'
import styled from 'styled-components'
import GameItemCard from './GameItemCard'

interface Iprops{
  items :{
    productId: Number,
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
    productFavoriteUser:{
      authId: Number,
      userAddress: string,
      userDescription: string,
      userEmail: string,
      userEmailConfirm: boolean,
      userId: number,
      userImgUrl: string,
      userNick: string,
      userRole: string,
    }[]
  }[],
  setMode :React.Dispatch<React.SetStateAction<string>>, 
};
const ItemCards = styled.div`
  margin:auto ;
  width: 90% ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content:center ;
`
const CharacterPage:React.FC<Iprops>= ({setMode,items}) => {
  console.log('✔✔✔✔✔✔',items)
  return (
    <ItemCards>
        <h1>캐릭터 상점</h1>
        {items!== undefined &&
        items.map((item,idx) => {
          return <GameItemCard setMode={setMode} key={idx} item={item} />;
        })}
    </ItemCards>
  )
}

export default CharacterPage