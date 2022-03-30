/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SSFToken = artifacts.require("SSFToken");
const NFTcreator = artifacts.require("NFTcreator");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

/**
 * 테스트의 진행을 위해 NFT소유권, ERC-20의 전송 권한 등에 유의해야한다.
 * 예를들어, NFT 소유권을 Sale로 전송하는것, 함수 호출자의 ERC-20 토큰을 Sale컨트랙트가 전송할 수 있도록 허용하는 것 등에 유념한다.
 * 테스트 조건 지정 및 재사용을 위해 before, beforeEach, after, aftereach등을 활용해도 좋다.
 */
contract("Sale Contract Testing", (accounts) => {
  const mintAmount = 10000;
  const uri = "testURI";
  
  async function print(title) {
    const seller = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2];
    console.log(`\n--------------------  ${title} --------------------`);
    console.log(`Seller: ${seller} ${await getBalance(seller)}`);
    console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
    console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
  }

  it("SaleFactory create", async () => {
    ssafyTokenContract = await SSFToken.deployed();
    nftContract = await NFTcreator.deployed();
    salesFactoryContract = await SaleFactory.deployed();
    // salesContract = await Sale.deployed();

    const seller = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2]; // purchaser
    await nftContract.create(seller, uri, { from: seller });
    let tokenId = await nftContract.current();
    itemId = tokenId.toNumber();
    await nftContract.create(seller, uri, { from: seller });
    let tokenId2 = await nftContract.current();
    
    console.log(nftContract.address);
    const temp = await nftContract.tokenURI(itemId);
    console.log(temp);
    // uint256 itemId,
    // uint256 minPrice,
    // uint256 purchasePrice,
    // uint256 startTime,
    // uint256 endTime,
    // address currencyAddress,
    // address nftAddress
    const tempSaleAddress1 = await salesFactoryContract.createSale(itemId, 10, 20, 10, 20, ssafyTokenContract.address, nftContract.address,  { from: seller });
    const SaleAddress1 = SaleAddress1.logs[0].args._saleContract
    await salesFactoryContract.createSale(tokenId2, 10, 20, 10, 20, ssafyTokenContract.address, nftContract.address,  { from: seller });
    console.log(await salesFactoryContract.allSales());
    
    // const temp = await salesFactoryContract.allSales();
    // console.log(temp)
    // TODO
    // 다음을 테스트를 통과해야합니다.
    // assert.equal(bidder2, await getNftOwner(), "Confirm Failed");
    // assert.equal(1000, await getBalance(bidder1), "Refund Failed");
  });
  /**
     시나리오 1) 제안과 승인
     1. 테스트를 위한 임의의 ERC-20토큰 생성 후 10000토큰 발행
     2. 두 제안자 주소로 1000토큰 부여
     3. 판매자 NFT생성(최저제안가10, 즉시구매가 100, 판매시작 시간은 현재시각, 판매종료시각은 10초후로 설정)
     4. 제안자1, 15토큰 bid() 호출
     5. 제안자2, 20토큰 bid() 호출
     6. 10초 후 제안자 2가 confirmItem()호출
     
     다음을 충족하는지 확인한다.
     1. 최종 NFT 소유자가 제안자2 이다.
     2. 제안자1의 잔액이 초기 값 1000과 같다.
      */
  // it("Bid and confirm", async () => {
  //   const seller = accounts[0];
  //   const bidder1 = accounts[1];
  //   const bidder2 = accounts[2]; // purchaser

  //   // TODO
  //   // 다음을 테스트를 통과해야합니다.
  //   // assert.equal(bidder2, await getNftOwner(), "Confirm Failed");
  //   // assert.equal(1000, await getBalance(bidder1), "Refund Failed");
  // });

  // /**
  //    시나리오2) 제안과 구매
  //    1. 테스트를 위한 임의의 ERC-20토큰 생성후 10000토큰 발행
  //    2. 제안자와 구매자 주소로 각 1000토큰 부여
  //    3. 판매자 NFT 생성(최저 제안가 10, 즉시구매가 100, 판매시작 시간은 현재시각, 판매 종료시각은 10초후로 설정)
  //    4. 제안자, 15토큰 bid() 호출
  //    5. 구매자, 100토큰 purchase() 호출
 
  //    다음을 충족하는지 확인한다.
  //    1. 최종 NFT 소유자가 구매자이다.
  //    2. 제안자의 잔액이 초기 값 1000과 같다.
  //    3. 구매자의 잔액이 900과 같다.
  //    */
  // it("Bid and Purchase", async () => {
  //   const seller = accounts[0];
  //   const bidder = accounts[1];
  //   const purchaser = accounts[2];

  //   // TODO
  //   // 다음을 테스트를 통과해야합니다.
  //   // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
  //   // assert.equal(1000, await getBalance(bidder), "Refund Failed");
  //   // assert.equal(900, await getBalance(purchaser), "Transfer Failed");
  // });

  // /**
  //    시나리오3) 제안과 취소
  //    1. 테스트를 위한 임의의 ERC-20 토큰 생성후 10000토큰 발행
  //    2. 제안자와 구매자 주소로 각 1000토큰 부여
  //    3. 판매자 NFT 생성(최저 제안가 10, 즉시구매가 100, 판매시작시간은 현재시각, 판매종료시각은 10초후로 설정)
  //    4. 제안자, 15토큰 bid()호출
  //    5. 판매자 cancel() 즉시호출
 
  //    다음을 충족하는지 확인한다.
  //    1. 최종 NFT소유자가 판매자이다.
  //    2. 제안자의 잔액이 초기값 1000과 같다.
  //     */
  // it("Bid and Cancel", async () => {
  //   const seller = accounts[0];
  //   const bidder = accounts[1];

  //   // TODO
  //   // 다음을 테스트를 통과해야합니다.
  //   // assert.equal(seller, await getNftOwner(), "Cancellation Failed");
  //   // assert.equal(1000, await getBalance(bidder), "Refund Failed");
  // });
});
