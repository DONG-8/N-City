# N-CITY 💥

## 0. INRTO

### 프로젝트 명 : N-CITY

### 팀 이름 : 남현동싹쓸어

---



## 1. 서비스 소개

### nft + 메타버스

거래만을 위한 현 nft 시장의 상황을 고려하여

개인이 보유 혹은 민팅 한 nft를 통해 자신만의 공간을 꾸미고 소통하며 판매할 수 있는 시스템을 만들고자 합니다.

핵심으로 들어가는것은 인증 마크입니다. 인증 마크를 통해 어떤 누가 제일 처음 민팅한 저작권자인지 지속적으로 확인하는 인증마크 시스템을 통해 개인이 소유 한 물건의  가치를 가시적으로 보증합니다.

- 메이커(maker)들은 개인이 만든 작업물을 전시하며 구매욕을 끌어올릴 수 있습니다
- 개인의 경우 개인이 소유한 nft를 통해 자신만의 공간을 꾸밀 수 있습니다.
- 기업의 경우 기업만의 홍보 혹은 보증 판매를 통해 현물거래와도 연동을 시킬 수 있습니다.

### 거래만을 위한 nft 시장에서 개인의 소유욕과 과시욕을 만족시킬 수 있는 소통형 메타버스 n-city 입니다.

---



### 역할

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a0417fae-575c-44f5-aa40-ec0ca316306a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220408T022157Z&X-Amz-Expires=86400&X-Amz-Signature=2fa302f768f13ce2f024a7d2b33a3cd9dca8ae11699c53a9dc5ed4d2e6960ac0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)



---

### ARCHITECTURE

![image-20220408112320249](README.assets/image-20220408112320249.png)



### CONCEPT

![image-20220408112529398](README.assets/image-20220408112529398.png)



## 



## 핵심 기능

#### 1. METAMASK LOGIN

> ***메타마스크(MetaMask)**를 통한 회원가입 및 로그인, 로그아웃
>
> \*메타마스크란 ? 
>
> 이더리움(Ethhereum) 개인지갑을 편리하고 안전하게 관리할 수 있는 구글 확장프로그램.

![메타마스크로그인](README.assets/메타마스크로그인.gif)

#### 2. 인증마크

> 회원이 **인플루언서**, **아티스트**, **기업** 세 가지 유형 중 자신이 해당되는 유형을 선택하여 증빙파일과 함께 신청
>
> 관계자가 해당 파일을 검토 후 승인 및 거절
>
> 승인되면 해당 회원이 민팅하는 작품에는 인증배지가 달림

![인증신청](README.assets/인증신청.gif)



> 승인되면 해당 회원이 민팅하는 작품에는 인증배지가 달림

![상품](README.assets/상품.png)

> 승인 완료 시 아티스트 유저에게 나타나는 마크 예시

![유저마크](README.assets/유저마크.png)



#### 3. NCT 토큰

> 자체 발행 화폐 단위 사용 NCT 토큰을 이용하여 페이지의 모든 NFT 거래 가능

![image-20220408114023310](README.assets/image-20220408114023310.png)





#### 4. 상품 등록(MINTING)

> 올리고자 하는 작품을 올릴 수 있습니다. (MINTING)
>
> (MINTING 이란?  : NFT를 생성하는 행위를 말하며 메타마스크 계정을 가진 모든 유저가 자유롭게 자신의 작품을 민팅할 수 있습니다.)

![민팅](README.assets/민팅.gif)



#### 5. 거래 및 경매

> 보유한 NFT 토큰으로 거래 및 경매 가능
>
> 거래의 경우 즉시 구매만 가능합니다.
>
> 

![거래와경랙](README.assets/거래와경랙.gif)



#### 6. MY ROOM 꾸미기

> 1. NFT로 방 꾸미기 
>
> 회원이 작품을 구매하게 되면, 마이룸에서 전시 및 판매 가능하며 가까이가면 크게 감상할 수 있는 상호작용 기능
>
>  \* 음악 카테고리에 해당되는 작품을 구매하게 되면, 회원의 마이룸에서 bgm으로 감상 및 다른 유저가 구매 가능 
>
> \* 캐릭터 카테고리에 해당되는 작품을 구매하게 되면, 회원 마이룸의 캐릭터로 사용 가능 

![에디팅](README.assets/에디팅.gif)



> 2. 아이템으로 방 꾸미기
>
> N-City에서 제공하는 다양한 아이템들(의자, 화이트보드, 소품 등)로 개성에 맞는 방 꾸미기 기능
>
> 화이트보드는 그림판 방명록으로, 의자는 앉기 상호작용 기능





#### 7. 실시간 채팅 및 유저간의 만남

> 같은 방에 있는 회원들은 채팅으로 실시간 상호작용이 가능하여, 작품에 대한 정보 교환 및 토론 가능



![모임 (1)](README.assets/모임 (1).gif)





## 실행 방법

소스코드 다운로드

```
$ git clone https://lab.ssafy.com/s06-blockchain-nft-sub2/S06P22E106.git
```



### BackEnd

1. 디렉토리 이동

   ```
   $ cd backend
   ```

2. gradle 프로젝트를 빌드합니다.

   ```
   $ ./gradlew build
   ```

   - 정상적으로 빌드가 완료되면 `build` 폴더가 생성된 것을 확인 가능

   - `./gradlew build` 가 안되면 아래 명령어를 실행 후 빌드

     ```
     $ chmod 777 gradlew
     ```

3. 실행

   ```
   $ java -jar build/libs/ncity-0.0.1-SNAPSHOT.jar app.jar
   ```



### FrontEnd

1. 디렉토리 이동

   ```
   $ cd frontend
   ```

2. 필요한 package 설치

```
$ npm i
```

3. 실행

```
$ npm start
```



### GAME

1. 디렉토리 이동

   ```
   $ cd game
   ```

2. 필요한 package 설치

   ```
   $ npm i
   ```

3. 실행

   ```
   $ npm start
   ```

   

## 소감

