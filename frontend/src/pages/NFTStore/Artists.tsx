import React, { useEffect, useState } from "react";
import ArtistCard from "../../components/Card/ArtistCard";
import styled from "styled-components";
import { artists as art } from "./items";
import { useMutation, useQuery } from "react-query";
import { getUserAll } from "../../store/apis/user";
import IsLoading2 from "./IsLoading2";
import { randomwords, words } from "./words";

const Wrapper = styled.div`
  .ISL {
    margin-top: -5vh;
  }
  .loading {
    text-align: center;
    font-size: 2.5vh;
    font-weight: 600;
    margin-top: -7vh;
  }
`;

const ArtistCards = styled.div`
  margin: auto;
  width: 95vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const IntroBox = styled.div`
  width: 88vw;
  height: 50vh;
  background-color: #f7f8fa;
  box-shadow: -10px -10px 12px #fff, 9px 9px 12px #e3e6ee,
    inset 1px 1px 0 rgb(233 235 242 / 10%);
  margin: auto;
  margin-top: 5vh;
  border-radius: 30px;
  display: flex;
  margin-bottom: 10vh;
  overflow: hidden;
`;
const Left = styled.div`
  flex: 1;
  .black {
    height: 100%;
    width: 100%;
    background-color: #272627;
    border-radius: 30px 0 0 30px;
    .text {
      color: white;
      font-size: 3rem;
      text-align: center;
      margin-left: 1vw;
      margin-top: -50px;
    }
  }
  img {
    margin-left: 12vw;
    margin-top: 4vh;
    height: 60%;
    width: 45%;
  }
`;
const Right = styled.div`
  flex: 1;
  .text {
    margin-left: 5vw;
    margin-top: 8vh;

    .h1 {
      font-size: 8vh;
      margin-bottom: 5vh;
      font-weight: 600;
    }
    .h3 {
      font-size: 3vh;
    }
    .h4 {
      font-size: 2vh;
    }
    .blue {
      background: linear-gradient(
        to top,
        transparent 10%,
        skyblue 70%,
        transparent 10%
      );
    }
    .purple {
      background: linear-gradient(to top, white 20%, #bdbdff 70%, white 20%);
    }
  }
`;
const CategoryBar = styled.div`
  margin: auto;
  margin-top: 5vh;
  width: 70%;
  display: flex;
  li {
    margin: auto;
  }
  p {
    font-size: 2vh;
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

export interface IState {
  user: {
    authId: Number;
    userAddress: String;
    userDescription: String;
    userEmail: String;
    userEmailConfirm: Boolean;
    userId: Number;
    userImgUrl: String;
    userNick: String;
    userRole: String;
  };
}

const Artists = () => {
  const [users, setUsers] = useState<IState["user"][]>([]);
  const [allUsers, setAllUsers] = useState<IState["user"][]>([]);
  const [filter, setFilter] = useState(0);

  const getArtist = useMutation<any, Error>(
    "getUserAll",
    async () => {
      return await getUserAll();
    },
    {
      onSuccess: (res) => {
        let tmp: IState["user"][] = [];
        res.map((data) => {
          tmp.push(data.user);
        });
        setAllUsers(tmp);
        setUsers(tmp);
      },
      onError: (err: any) => {
      },
    }
  );

  const getFilter = (number) => {
    let tmp: IState["user"][] = [];
    switch (number) {
      case 0:
        setUsers(allUsers);
        break;
      case 1:
        allUsers.map((user) => {
          if (user.userRole === "ROLE_INFLUENCER") {
            tmp.push(user);
          }
        });
        setUsers(tmp);
        break;
      case 2:
        allUsers.map((user) => {
          if (user.userRole === "ROLE_ARTIST") {
            tmp.push(user);
          }
        });
        setUsers(tmp);
        break;
      case 3:
        allUsers.map((user) => {
          if (user.userRole === "ROLE_ENTERPRISE") {
            tmp.push(user);
          }
        });
        setUsers(tmp);
        break;
    }
  };
  useEffect(() => {
    getFilter(filter);
  }, [filter]);
  useEffect(() => {
    getArtist.mutate();
  }, []);
  return (
    <Wrapper>
      <IntroBox>
        <Left>
          <div className="black">
            {/* <img alt='black' src='https://i.gifer.com/QGA.gif' /> */}
            <img alt="black" src="https://i.gifer.com/BKfh.gif" />
            <div className="text">
              <p>N-City citizen</p>
            </div>
          </div>
        </Left>
        <Right>
          <div className="text">
            <div className="h3">NFT Marketplace</div>
            <div className="h1">Citizen</div>
            <div className="h4">
              N-City에는 다양한 <span className="blue">Citizen</span>이
              존재합니다.{" "}
            </div>
            <div className="h4">
              <span className="purple">갤러리</span>를 구경하고 거래할 수
              있습니다.{" "}
            </div>
            <div className="h4">
              Citizen의<span className="blue"> 마이룸</span>을 놀러가보세요{" "}
            </div>
          </div>
        </Right>
      </IntroBox>
      <>
        <div>
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
                Influencer
              </p>
            </li>
            <li>
              <p
                id={filter === 2 ? "category" : ""}
                onClick={() => {
                  setFilter(2);
                }}
              >
                Artist
              </p>
            </li>
            <li>
              <p
                id={filter === 3 ? "category" : ""}
                onClick={() => {
                  setFilter(3);
                }}
              >
                Enterprise
              </p>
            </li>
          </CategoryBar>
        </div>
      </>
      {users.length > 0 ? (
        <ArtistCards>
          {users.map((user, idx) => {
            return <ArtistCard key={idx} user={user} />;
          })}
        </ArtistCards>
      ) : (
        <div>
          {users ? (
            <div style={{ marginTop: "50px" }}>
              <ArtistCards>
                <img src="/essets/images/none.png" alt="" />
              </ArtistCards>
              <ArtistCards>
                아직까지 없는 Citizen 이에요!! 다른 Citizen을 만나러 가볼까요?!
              </ArtistCards>
            </div>
          ) : (
            <>
              <div className="ISL">
                <IsLoading2 />
                <div className="loading">{randomwords}</div>
              </div>
            </>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Artists;
