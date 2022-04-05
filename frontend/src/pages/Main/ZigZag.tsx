import React from 'react'
import styled from 'styled-components'
import ItemCard2 from '../../components/Card/ItemCard2'
import { ItemType } from '../NFTStore/items'

const NewTokken = styled.div`
  width: 100%;
  height: 70vh;
  .title{
    font-size: 3.5rem;
    color: #333;
    margin-left: 10vw;
  }
  .sub{
    color: #333;
    margin-left: 10vw;
    p{
      margin: 1px;
    }
  }
  .itemCards{
    display: flex;
    margin-left: 7vw;
  } 
  .down{
    margin-top: 10vh;
  }
  .down2{
    margin-top: 8vh;
  }
`
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
    }[],
  }[],
}

const ZigZag:React.FC<Iprops> = ({items}) => {
  return (
    <NewTokken>
        <div data-aos="fade-up"
            data-aos-duration="2300"   >
        <h1 className="title">
          New Tokken
        </h1>
        <div className="sub">
          <p>방금 막 새로 민팅된 작품들입니다. 누구보다 빠르게 작품을 구경하세요</p>
          <p>N-city 의 상점 기능을 이용해 구입하고, 자신의 방에 전시할 수 있습니다. </p>
        </div>
        </div>
        <div  className="itemCards">
          <div data-aos="fade-up"
            data-aos-duration="2000"   >
            <ItemCard2 item={items[0]}/>
          </div  >
          <div data-aos="fade-up"
            data-aos-duration="2000"  className="down">
            <ItemCard2 item={items[1]}/>
          </div>
          <div data-aos="fade-up"
            data-aos-duration="2500">
          <ItemCard2 item={items[2]}/>
          </div>
          <div data-aos="fade-up"
            data-aos-duration="2500" className="down2">
            <ItemCard2 item={items[3]}/>
          </div>
          <div data-aos="fade-up"
            data-aos-duration="1800">
            <ItemCard2 item={items[4]}/>
          </div>
        </div>
      </NewTokken>
  )
}

export default ZigZag