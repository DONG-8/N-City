import React, {useState, useCallback} from "react";
import styled from "styled-components";
import ModalBase from "../../components/Apply/ApplyModal";

//// style
const Wrapper = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: "center";
  align-items: "center";
  height: 100vh;
  width: 100vw;
  .Modal{
    transition: 1s;
  }
`;

const H1 = styled.h1`
  font-size: 35px;
  margin-top: 10vh;
  margin-bottom: 10vh;
  text-align: center;
`
const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 4px solid black;
  border-radius: 15px;
  background-color: #FFF6F3;
  
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 0.2s ease-out;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
`

const CardTitle = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

//// component
const Apply = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("");
  
  const handleModalOpen = (type:string) => {
    setIsOpen(true);
    setFormType(type)
    console.log(type)
    console.log(formType)
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setFormType("");
  };

  const cards = [
    { logo: "/essets/images/influencer_logo.png", type: "influencer", name: "인플루언서" },
    { logo: "/essets/images/designer_logo.png", type: "designer", name: "디자이너" },
    { logo: "/essets/images/enterprise_logo.png", type: "enterprise", name:"기업" },
  ];

  return (
    <Wrapper>
      <H1>유형을 선택해주세요</H1>
      <CardBox>
        {cards.map((card) => (
          <CardWrapper key={card.type}>
            <Card onClick={() => handleModalOpen(card.type)}>
              <Logo src={card.logo} alt="logo" />
            </Card>
            <CardTitle>{card.name}</CardTitle>
          </CardWrapper>
        ))}
      </CardBox>
      <div>
        <ModalBase
          visible={isOpen}
          onClose={handleModalClose}
          formType={formType}
        >
          {/* <div>{formType}</div> */}
        </ModalBase>
      </div>
    </Wrapper>
  );
}

export default Apply;