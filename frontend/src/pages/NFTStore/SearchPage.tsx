import React, { useEffect, useState } from 'react'
import { useMutation,useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ItemCard2 from '../../components/Card/ItemCard2'
import { getSearchUserNick } from '../../store/apis/user'
import UserCarousel from './UserCarousel'
import { getProductAll } from '../../store/apis/product'


const SearchTitle = styled.div`
  display: flex;
  .color{//🎨메인색
    color: #272793;
  }
  margin-left: 10vw;
  margin-top: 5vh;
`
const NoResult = styled.div`
  margin-left: 5vw;
  margin-top: 5vh;
`
const UserResults = styled.div`
  margin-left: 10vh;
  margin-right: 5vh;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  margin-bottom: 5vh;
  overflow-y: hidden;
  h1{
    margin-left: 5vw;
    margin-top: 5vh;
    padding-top: 5vh;
  }
`

const ItemResults = styled.div`
  margin-left: 10vh;
  margin-right: 5vh;
  background-color: #F7F8FA ;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
  border-radius: 30px;
  margin-bottom: 5vh;
  .items{
    display: flex;
    flex-wrap: wrap;
    &:last-child {
      margin-right: auto;
  }
  }
  h1{
    margin-left: 5vw;
    margin-top: 5vh;
    padding-top: 5vh;
  }
`
interface ItemType{
  item :{
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
  }
}
const SearchPage = () => {
  // const [data,setData] = useState(useParams().data)
  const [items,setItems] = useState<ItemType['item'][]>([])
  const [users, setUsers] = useState<any[]>()
  // const users = usrs
  const {data} = useParams();
  const { isLoading:ILA, data:allitems } = useQuery<any>(
    "prouductAll",
    async () => {return (await (getProductAll({ page: 1, size: 1000 }) ))
      },
    {
      onSuccess: (res) => {
        let itms = res.content
        let tmp : ItemType['item'][] = []
        itms.map(
          (itm:ItemType['item'])=>{
            if((itm.productTitle).includes(String(data)))
             {tmp.push(itm)} })
        setItems(tmp)
      },
      onError: (err: any) => {
      },
    }
  );

  const reloadProduct = useMutation<any, Error>(
    "prouductAll",
    async () => {return (await (getProductAll({ page: 1, size: 1000 }) ))
      },
    {
      onSuccess: (res) => {
        let itms = res.content
        let tmp : Object[] = []
        itms.map(
          (itm:ItemType['item'])=>{
            if((itm.productTitle).includes(String(data)))
             {tmp.push(itm)} })
        setItems(tmp as any[])
      },
      onError: (err: any) => {
      },
    }
  );
  
  
  // const { isLoading:ILU, data:users } = useQuery<any>(
  //   "getSearchUserNick",
  //   async () => {return (await getSearchUserNick(data as string))
  //     },
  //     }
  // );

  const reloadUser = useMutation<any, Error>(
    "getSearchUserNick",
    async () => {
      return await getSearchUserNick(data as string);
    },
    {
      onSuccess: (res) => {
        setUsers(res);
      },
      onError: (err) => {
      },
    }
  );


  useEffect(() => {
    reloadProduct.mutate();
    reloadUser.mutate();
  }, [data])

  return (
    <>
      <SearchTitle>
        <h1><span className='color'>{data}</span>에 대한 검색 결과</h1>
      </SearchTitle>
      {items===undefined && users === undefined  && 
      <NoResult>
        <h1>검색 결과가 없습니다.</h1>
      </NoResult>
      }
      {users &&
      <UserResults>
        <h1>USERS</h1> 
        <div className='items'>
          <UserCarousel users={users} />
        </div>
      </UserResults>
      }

      {items!==undefined && 
      <ItemResults>
        <h1>items</h1> 
        <div className='items'>
          {items.map((item,idx)=><ItemCard2 key={idx} item={item}/>)}
        </div>
      </ItemResults>
      }



    </>
  )
}

export default SearchPage