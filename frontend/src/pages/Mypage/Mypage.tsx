import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import { IState } from '../NFTStore/NFTStore';
import ItemCard from '../../components/Card/ItemCard';
import {Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SaleModal from '../../components/Store/SaleModal';
import SellIcon from '@mui/icons-material/Sell';
import Tooltip from '@mui/material/Tooltip';
import { items as itm } from '../NFTStore/items';

const MypageWrapper = styled.div`
  box-shadow: 1px 3px 7px;
`
const Background = styled.div`
  width: 100%;
  height: 50vh;
  img{
    height: 50vh;
    width: 100%;
    object-fit:cover;
    overflow: hidden;
  }
`
const ProfileWrapper = styled.div`
  box-shadow: 1px 1px 3px;

  background-color: #FAF3F399;
  position: absolute;
  top:20vh;
  left: 8vw;
  width: 85vw;
  height: 30vh;
  border-radius: 10px;
`
const Wallet = styled.div`
  background-color: white;
  position: absolute;
  top:2vh;
  left: 54vw;
  width: 30vw;
  height: 15vh;
  
  .border{
    display: flex;
    border: 1px solid gray;
    width: 98%;
    height: 90%;
    margin: auto;
    margin-top:0.5vh;
    div{
      flex: 2.5;
      height: 100%;
      border-right: 1px solid gray;
      justify-content: center;
      text-align: center;
      .number{
        font-weight: 1000;
        font-size: 3vh;
      }
      .description{
        font-size: 2vh;
        color: gray;
      }
    }
  }
`
const FilterBar = styled.div`
  margin: auto;
  margin-top: 3vh;
  width: 70% ;
  display: flex;
  div{
    cursor:pointer;
    flex: 2.5;
    height: 6vh ;
    text-align:center ;
    &:hover{
      background-color: whitesmoke ;
      transition:0.3s ;
    }
    p{
      font-size:2.5vh ;
      margin-top : 1vh;
      font-weight: 1000 ;
    }
  }
  div{
    /* background-color: #F5B6A0; */
    border-bottom:2px solid #F43B00;
  }
  
  #select{
    background-color: white ;
    border-left: 2px solid #F43B00;
    border-right: 2px solid #F43B00;
    border-top:2px solid #F43B00;
    border-bottom: none;
    color:#FF7248 ;
    &:hover{
      background-color: #F9F9F9 ;
      transition:0.3s ;
  
    }
  }
`
const ProfileImg = styled.div`
  margin: 3vh;
  img {
    width: 13vw;
    height:25vh ;
    border-radius: 100%;
  }
`;
const Profile = styled.div`
  position: absolute;
  top:2vh;
  left: 18vw;
  h1{
    font-size: 5vh;
  }
  h2{
    font-size: 3vh;
  }
  button{
    font-weight: 1000;
    background-color:#E89669;
    width: 14vw;
    height: 5vh;
    font-size: 2.2vh;
    &:hover{
      transition: 0.2s;
      background-color: #F08850;
    }
  }
  
`
const ItemCards = styled.div`
  margin:auto ;
  margin-top:10vh;
  width: 100% ;
  display: flex ;
  flex-wrap: wrap ;
  justify-content:center ; 
`
const Card = styled.div`
  button {
    position: absolute;
    margin-left: 10rem;
    margin-top: -4rem;
    font-size: 1.5rem;
  }
`;

export default function Mypage() {
  
  const navigate = useNavigate()
  const [status,setStatus] = useState("allPicture")
  const [items,setItems] = useState<IState["item"]>(itm)
  //모달창
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
      <MypageWrapper>
        <Background>
          <img alt="배경" src="essets/images/login_background.png" />
        </Background>
        <ProfileWrapper>
          <ProfileImg>
            <img
              src="https://lh3.googleusercontent.com/Ie_qAA75_piqy1daeu3dRKUEETbQMz0ormtUaHt8LY15I5AeGKJ45gojR9NW7SY-h_vbgA-O-hwKrU0xf6Q_qqpwQ4ep7Xld8hao=s130"
              alt="프로필"
            />
          </ProfileImg>
          <Profile>
            <h1>ShowMaker</h1>
            <h2>follower: 150</h2>
              <Button
                onClick={() => {
                  navigate("/profilesetting");
                }}
                color="warning"
                variant="contained"
              >
                프로필 수정
              </Button>
          </Profile>
          <Wallet>
            <div className="border">
              <div>
                <p className="number">10</p>
                <p className="description">items</p>
              </div>
              <div>
                <p className="number">10213</p>
                <p className="description"> owners</p>
              </div>
              <div>
                <p className="number">
                  {" "}
                  <img
                    alt="ether"
                    style={{ height: "2.5vh" }}
                    src="essets\images\ethereum.png"
                  />
                  1.02
                </p>
                <p className="description">floor price</p>
              </div>
              <div>
                <p className="number">
                  {" "}
                  <img
                    alt="ether"
                    style={{ height: "2.5vh" }}
                    src="essets\images\ethereum.png"
                  />
                  5121
                </p>
                <p className="description">volume traded</p>
              </div>
            </div>
          </Wallet>
        </ProfileWrapper>
      </MypageWrapper>
        <FilterBar>
          <div id={status==='allPicture'?'select':""} onClick={()=>{setStatus("allPicture")}} className="allPicture">
            <p>내가 가진 </p>
          </div>
          <div id={status==='likePicture'?'select':""} onClick={()=>{setStatus("likePicture")}} className="likePicture">
            <p>내가 등록한</p>
          </div>
          <div id={status==='allArtist'?'select':""} onClick={()=>{setStatus("allArtist")}} className="allArtist">
            <p>좋아요한</p>
          </div>
          <div id={status==='followArtist'?'select':""} onClick={()=>{setStatus("followArtist")}}  className="followArtist">
            <p>활동내역</p>
          </div>
        </FilterBar>
      <ItemCards>
        {items.map((item,idx) => {
          return (<Card>
          <ItemCard key={idx} item={item} />
          <Tooltip title="판매하기">
          <Button onClick={handleOpen}><SellIcon /></Button>
          </Tooltip>
          </Card>)})}
      </ItemCards>
     
        <SaleModal open={open} setOpen={setOpen} />
      
    </>
  );
}

