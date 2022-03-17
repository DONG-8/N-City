/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI 
 */

const NftCreator = artifacts.require("NFTcreator");

contract("NftCreator", (accounts) => {
    
    /**
     * 1. NFT를 주고받을 두 주소가 존재한다.
     * 2. NFTCreator 컨트랙트를 배포한다.
     * 3. 주소1이 배포된 컨트랙트의 create 함수를 호출하여 새로운 토큰을 생성한다.
     * 4. 주소1이 주소 2에게 transferFrom 함수를 호출하여 토큰을 전송한다.
     * 
     * 테스트는다음을 만족해야함
     * 1. create 호출 후 주소 1이 생성된 token의 owner이다.
     * 2. transferFrom 호출 후 주소 2가 token의 owner가 된다.
     * 3. 저장한 tokenURI가 해당 tokenId로 조회한 tokenURI와 일치한다.
     */
    it("NFT mint, transfer, and compare URI", async () => {

        // TODO
        // 다음이 반드시 테스트되어야 합니다.
        // assert.equal(sender, owner, "NFT Mint Failed");
        // assert.equal(receiver, owner, "NFT Transfer Failed.");
        // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
    });

});