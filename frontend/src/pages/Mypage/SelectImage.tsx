import { Modal } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';
import { getUsercollectedInfo } from '../../store/apis/user';


const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 80%;
  height: 80%;
  border-radius: 5px;
  .title {
    color: #35357a;
    text-align: center;
    font-size:2.5vh;
    width: 80%;
    border-bottom: 2px solid #35357a;
    margin: auto;
  }
`;
const Exit = styled.div`
  position: absolute;
  right:5px;
  top:5px;
  cursor: pointer;
`
interface Iprops{
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  userId : Number,
  setuserURL:React.Dispatch<React.SetStateAction<string>>
}

const Content = styled.div`
  .noNFT{
    margin: 3vw;
  }
`
const ImgBox = styled.div`
  margin-top: 2vh;
  height: 60vh ;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  margin-left: 5vw;
  img{
    height: 15vw;
    width: 15vw;
    margin: 3vh;
    border-radius: 10px;
    border: 1px solid #e6e1e1;
    box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee, inset 1px 1px 0 rgb(233 235 242 / 10%);
    cursor: pointer;
  }
  &::-webkit-scrollbar{width: 0.5vw; height:12vh;}
  &::-webkit-scrollbar-thumb{ background-color: #4343e2  ; border-radius: 10px; } 
  &::-webkit-scrollbar-track{ background-color: #fbe9e1;}
`

const SelectImage:React.FC<Iprops> = ({userId,open,setOpen,setuserURL}) => {
  const handleClose = () => setOpen(false);
  const { isLoading:ILA, data:items } = useQuery<any>(
    "getUsercollectedInfo",
    async () => {return (await (getUsercollectedInfo(Number(userId))))
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {console.log(err, "요청 실패")}
    }
  );
  console.log(items)
  return (
    <Modal 
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Wrapper>
        <Exit>
          <CloseIcon onClick={()=>{handleClose()}}/>
        </Exit>
        <div className='title'><h1>SELECT IMAGE</h1></div>

        <Content>
          <ImgBox>
          {items!==undefined && items.content.length ===0 &&
            <div className='noNFT'>
              <h1 >가진 작품이 없어요...</h1>
            </div>
          }
          {items!==undefined &&
            (items.content).map((item)=>{
              return(<img alt='img' 
              onClick={()=>{
              setuserURL(item.productThumbnailUrl);
              handleClose()}
            }
              src={item.productThumbnailUrl}/>)
            })
          }
          </ImgBox>
        </Content>

      </Wrapper>

    </Modal>
  )
}

export default SelectImage