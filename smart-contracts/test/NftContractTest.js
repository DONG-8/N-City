/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI 
 */

const NftCreator = artifacts.require("NFTcreator");

contract("NftCreator", async accounts => {
    // it("my test", async () => {
    //     const instance = await NftCreator.deployed();
    //     // const tokenId = await instance.current();
    //     assert.equal(0, 0, "FAIL");
        

    // });
    
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
        const account_one = accounts[0];
        const account_two = accounts[1];

        const instance = await NftCreator.deployed();
        const meta = instance;
        await meta.create(account_one, "tokenURI123", { from: account_one });
        
        let tokenId = await meta.current();
        // tokenId.toNumber();
        await meta.create(account_one, "tokenURI1234", { from: account_one });
        let tokenId2 = await meta.current();
        const realTokenId = tokenId.toNumber()
        const realTokenId2 = tokenId2.toNumber()
        const firstOwner = await meta.ownerOf(realTokenId);
        await meta.transferFrom(account_one, account_two, realTokenId, { from: account_one });
        const secondOwner = await meta.ownerOf(realTokenId);
        const afterTokenURI = await meta.tokenURI(realTokenId)
        assert.equal(account_one, firstOwner, "NFT Mint Failed");
        assert.equal(account_two, secondOwner, "NFT Transfer Failed.");
        assert.equal("tokenURI123", afterTokenURI, "Wrong Token Id or URI.")
        // TODO
        // 다음이 반드시 테스트되어야 합니다.
        const sender = account_one;
        const receiver = account_two;
        const owner = meta.ownerOf(realTokenId);
        // const tokenURIFetched = meta.tokenURI(realTokenId);

        // assert.equal(sender, owner, "NFT Mint Failed");
        // assert.equal(tokenId, tokenId, "NFT Mint Failed");
        // assert.equal(account_one, owner, "NFT Transfer Failed.");
        // assert.equal(receiver, owner, "NFT Transfer Failed.");
        // assert.equal("tokenURI123", tokenURIFetched, "Wrong Token Id or URI.")
    });
});