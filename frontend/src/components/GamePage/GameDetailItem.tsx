import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Background from '../Card/Background';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { items as itm } from '../../../src/pages/NFTStore/items'
import GameItemCard from './GameItemCard';
const etherURL = '/essets/images/ethereum.png'

const Wrapper = styled.div`
`
const DetailPage = styled.div`
  width: 1500px ;
  margin: auto ;
`
const DetailItemCard = styled.div`
  background-color: white;
  border-radius: 5px 0 0 5px  ;
  width: 500px;
  height: 550px;
  border: 1px solid gray;
  border-top: none;
  img{
    width: 500px;
    height: 500px;
    
    border-radius:5px 0 0 0 ;
  }
  .like{
    display:flex ;
    justify-content: end;
    margin-right:1vw ;
    font-size:1.5rem ;
  }
  .icon{
    cursor: pointer;
    &:hover{
      transform: scale(1.1);
    }
    margin-right: 0.5rem;
  }
`
const Top = styled.div`
  margin-top: 10vh ;
  display: flex ;
`
const TitleSee = styled.div`
  margin-top: 10vh;
  margin-left: 6vw;
  font-size: 3vh;
`
const Center = styled.div`
  
`
const Description = styled.div`
  border: 1px solid gray;
  border-left:none;
  border-top: none;
  background-color: #fffffe;
  width: 100%;
  height: 550px;
  border-radius: 0 5px 5px 0  ;
  
`
const BigCard = styled.div`
  display: flex;
  width: 85%;
  margin:auto;
  
`
const Transaction = styled.div`
  background-color: #fffffe;
  /* box-shadow:1px 3px 5px 0 ; */
  width: 85%;
  margin: auto ;
  margin-top: 10vh ;
  border-radius: 5px ;
  border:2px solid gray;
  h1{
    font-size: 2.3rem;
  }
`
const Artist = styled.div`
  font-weight:1000 ;
    color: #F43B00;
    font-size: 2rem ;
    margin:1rem ;
`
const Title = styled.div`
  font-weight:1000 ;
    font-size: 3rem ;
    margin:1rem ;
`
const Owner = styled.div`
  font-weight:1000 ;
    display:flex ;
    font-size:1.5rem ;
    margin: 1rem;
    margin-bottom:2rem ;
    .owner_name{
      margin-left:1rem ;
      color:#F43B00;
    }
`
const Contents = styled.div`
  margin:1rem ;
    margin-top:2rem ;
    font-weight:1000; ;
    font-size:1.2rem ;
    margin-bottom:2rem ;
    .des_title{
      font-size:1.5rem ;
      margin-bottom:2rem ;
    }
    .red_text{
      color:#F43B00;
    }
`
const Buy = styled.div`
  font-size:2rem ;
    font-weight:1000 ;
    display:flex ;
    margin : 1rem;
    margin-top:2.5rem;
    justify-content:space-between ;
    margin-left:2rem;
    .buy_button{
      border-radius:5px ;
      width:10rem ;
      height:3rem;
      background-color:#F43B00 ;
      color:white ;
      font-size:1.5rem ;
      font-weight:1000 ;
      img{
        height:1.5rem;
        margin-right:0.5rem ;
      }
      &:hover{
        &{
          background-color:#fb5252  ;
        }
      }
    }
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;
const Bottom = styled.div`
  
`
const ArtistMore = styled.div`
  h1{
    margin-top:2rem;
    margin-left:2rem;
  }
  background-color: #fbe9e1;
  /* box-shadow:1px 3px 7px ; */
  border: 2px solid gray;
  width: 85%;
  height: 500px ;
  margin: auto ;
  margin-top: 2vh ;
  border-radius:5px ;
  overflow-y:hidden;
  overflow-x:scroll;
  &::-webkit-scrollbar{width: 4px; height:12px;}
  &::-webkit-scrollbar-thumb{ background-color: #f68383; border-radius: 10px; } 
  &::-webkit-scrollbar-track{ background-color: #fbe9e1;}
  margin-bottom: 5vh ;
`
const Cards = styled.div`
  display: flex ;
`

const EachTransaction = styled.div`
  display: flex;
  justify-content: space-between ;
  div{
    flex:2;
    font-size:1.2srem;
  }
`
const Head = styled.div`
  display: flex;
  justify-content: space-between ;
  div{
    flex :2;
    font-weight:1000 ;
    font-size:1.7rem;
  }
`
interface Iprops{
  setMode :React.Dispatch<React.SetStateAction<string>>
}
const GameDetailItem:React.FC<Iprops> = ({setMode}) => {
  const [transactions,setTransactions] = useState([
    {event:'transfer', from:"59912",to:"24923", date:20220309},
    {event:'sale',price:1.04, from:"59912",to:"24923", date:20220305 },
    {event:'list',price:1.01, date:20220306 },
    {event:'minted', date:20220301 }
  ])
  const [items,setItems] = useState(itm)
  const [item,setItem] = useState(JSON.parse(localStorage.getItem("item")||""))
  const [likes,setLikes] = useState(item.liked)
  const [liked,setLiked] = useState(false)

  const [change,setChange] = useState(false)
  useEffect(()=>{
    const tmp = JSON.parse(localStorage.getItem("item")||"")
    if (item.id !==tmp.id){
      setItem(tmp)
    }
    setChange(false)
  },[change])
  return (
    <Wrapper>
      <Background imgsrc="https://cdn.notefolio.net/img/d7/5b/d75bf02e2a35f76dba6ed5eeccde793c45d74edd83df838e31290603ceb5c5c9_v1.jpg" />
      <DetailPage>
        <Top>
          <BigCard>
            <DetailItemCard>
              <img alt="pic" src={item.url} />
              <div className="like">
                <div
                  onClick={() => {
                    setLiked(!liked);
                  }}
                  className="icon"
                >
                  {liked ? (
                    <FavoriteIcon
                      fontSize="large"
                      onClick={() => {
                        setLikes(likes - 1);
                      }}
                      color="error"
                    />
                  ) : (
                    <FavoriteBorderIcon
                      fontSize="large"
                      onClick={() => {
                        setLikes(likes + 1);
                      }}
                      color="error"
                    />
                  )}
                </div>
                {likes}
              </div>
            </DetailItemCard>
            <Description>
              <Artist>
                {item.name}
                {item.verfied && (
                  <img
                    alt="verified"
                    style={{ height: "1.5rem" }}
                    src="/essets/images/verified.png"
                  />
                )}
              </Artist>
              <Title>{item.title}</Title>
              <Owner>
                owner: <div className="owner_name">{item.name}</div>
              </Owner>
              <hr />
              <Contents>
                <div className="des_title">작품설명</div>
                <Content>
                  <span> Contract Adderess : </span>
                  <span className="red_text">0x1234515re932</span>
                </Content>
                <Content>
                  <span> Token ID: </span>
                  <span className="red_text">8055</span>
                </Content>
                <Content>
                  <span> Token Standard: </span>
                  <span className="red_text">ERC-721</span>
                </Content>
              </Contents>
              <hr />
              <Buy>
                <div className="price">
                  {item.price}
                  <img style={{ height: "2rem" }} alt="이더" 
                  src='/essets/images/ethereum.png' />
                </div>
                <button className="buy_button">구매</button>
              </Buy>
            </Description>
          </BigCard>
        </Top>
        <Center>
          <Transaction>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h1>거래내역</h1>
              </AccordionSummary>
              <AccordionDetails>
                <Head>
                  <div>event</div>
                  <div>price</div>
                  <div>from</div>
                  <div>to</div>
                  <div>date</div>
                </Head>
                {transactions.map((tran, i) => {
                  return (
                    <div key={i}>
                      <hr />
                      <EachTransaction>
                        <div>{tran.event}</div>
                        <div>
                          {tran.price}
                          {tran.price ? (
                            <img
                              style={{ height: "1rem" }}
                              alt="ether"
                              src={etherURL}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div>{tran.from}</div>
                        <div>{tran.to}</div>
                        <div>{tran.date}</div>
                        {/* a year ago 로 바꾸기 */}
                      </EachTransaction>
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </Transaction>
        </Center>
        <Bottom>
          <TitleSee>
            <div style={{ display: "flex" }}>
              <h1 style={{ color: "#F43B00" }}>{item.name}</h1>
              <h1 style={{ marginLeft: "1rem" }}>의 작품 보기</h1>
            </div>
          </TitleSee>
          <ArtistMore>
            <Cards>
              {items.map((item) => {
                return (
                  <div onClick={() => setChange(true)}>
                    <GameItemCard setMode={setMode} key={item.url} item={item} />
                  </div>
                );
              })}
            </Cards>
          </ArtistMore>
        </Bottom>
      </DetailPage>
    </Wrapper>
  );
}

export default GameDetailItem