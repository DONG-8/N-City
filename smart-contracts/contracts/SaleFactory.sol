// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";
import "./NFTcreator.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
 /*
 Sale 컨트랙트를 생성하는 역할을 하는 스마트 컨트랙트
 특정계정이 보유하고있는 NFT를 ERC-20토큰을 받고 판매하고자 할때 호출되는 컨트랙트
 SaleFactory는 새로운 Sale 컨트랙트를 배포하게 되며 각 Sale컨트랙트는 판매하고자 하는 NFT를 임시보유한다.
  */
contract SaleFactory is Ownable {
    address public admin; // 모든 판매의 수퍼권한을 갖는 address(owner)
    address[] public sales; // 이 컨트랙트를 통해 생성된 Sale컨트랙트의 주소의 배역
    NFTcreator public NFTcreatorContract;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor(address _NFTcreatorAddress) {
        admin = msg.sender;
        NFTcreatorContract = NFTcreator(_NFTcreatorAddress);
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    /*
    이 함수를 호출하면 새로운 Sale 컨트랙트를 생성한다.
    생성된 Sale 컨트랙트를 상태변수에 추가한다.
    생성된 Sale 컨트랙트의 주소정보를 반환한다.
     */
    function createSale(
        uint256 itemId,
        uint256 minPrice,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        // TODO
        address seller = msg.sender;
        Sale instance = new Sale(admin, seller, itemId, minPrice, purchasePrice, startTime, endTime, currencyAddress, nftAddress);
        // 생성한 인스턴스에게 tokenid에 해당하는 토큰의 소유권 넘겨주기
        NFTcreatorContract.transferFrom(seller, address(instance), itemId);
        // return instance;
        // emit NewSale(_saleContract, _owner, _workId);
        sales.push(address(instance));
        emit NewSale(address(instance), msg.sender, itemId);
        return address(instance);
    }
    
    // 생성된 모든 Sale 주소를 반환
    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
/**
각 거래를 위한 스마트 컨트랙트
생성자(constructor), 제안하기(bid), 즉시구매(purchase), 구매완료(confirmItem), 판매취소(cancle)을 포함
구매하고자 하는경우 구매희망자는 bid(), purchase()를 호출
판매기한이 끝나면 최고가를 제안한 주소는 confirmItem()을 호출하여 판매자에게 ERC-20을 전송하고 NFT소유권을 자신의 것으로 변경한다.
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller; // 판매자 정보
    address public buyer; // 구매자 정보
    address admin; // 수퍼권한자 주소
    uint256 public saleStartTime; // 판매시작 시간
    uint256 public saleEndTime; // 판매종료 시간
    uint256 public minPrice; // 최소 제안가
    uint256 public purchasePrice;  // 즉시 구매가
    uint256 public tokenId; // 거래할 NFT tokenId
    address public currencyAddress; // 거래시 사용할 ERC-20의 주소
    address public nftAddress; // nft creator 주소
    bool public ended; // 판매상태(종료여부)

    // 현재 최고 입찰 상태
    address public highestBidder; // 현재 최고 제안자 정보
    uint256 public highestBid;  // 현재 최고 제안가

    IERC20 public erc20Contract;
    IERC721 public erc721Constract;

    event HighestBidIncereased(address bidder, uint256 amount); // 현재 최고 제안자, 최고 제안가
    event SaleEnded(address winner, uint256 amount);  // 최종 구매자 정보


    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_minPrice > 0);
        tokenId = _tokenId; 
        minPrice = _minPrice; 
        purchasePrice = _purchasePrice;
        seller = _seller; 
        admin = _admin; 
        saleStartTime = startTime;
        saleEndTime = endTime; 
        currencyAddress = _currencyAddress; 
        nftAddress = _nftAddress; 
        ended = false; 
        erc20Contract = IERC20(_currencyAddress);
        erc721Constract = IERC721(_nftAddress);
    }

    /**
    구매희망자가 가격을 제시하는 함수
    - 판매자가 아닌경우 호출가능
    - 해당Sale의 판매시점이 유효한 경우
    - 구매희망자가 Sale 컨트랙트에게 구매희망자의 ERC-20토큰을 송금할수 있는 권한을 허용한 경우(ERC-20 approve)
    - 판매자가 지정한 최저 제안가 이상의 금액 제시
    - 현재 최고 제안가 초과 금액 제시
    - 즉시 구매가보다 낮은 금액으로 호출
    위 사항을 만족하는 경우
    1. 최고 제안가와 제안자 정보를 갱신한다.
    2. Sale 컨트랙트로 제안금액만큼의 ERC-20 토큰을 송금한다.
     */
    function bid(uint256 bid_amount) public {
        // TODO
    }

    /**
    구매 희망자가 판매자가 제시한 즉시 구매가에 작품을 구매하는 함수
    - 판매자가 아닌경우 호출가능
    - 해당 Sale의 판매시점이 유효한 경우
    - 구매 희망자가 Sale 컨트랙트에게 구매 희망자의 ERC-20토큰을 송금할 수 있는 권한을 허용한 경우 (ERC-20 approve)
    위 사항을 만족하는 경우
    1. 기존 제안자가 있다면 환불을 진행한다.
    2. 구매자의 ERC-20토큰을 즉시 구매가 만큼 판매자에게 송금한다.
    3. NFT 소유권을 구매자에게 이전한다.
    4. 컨트랙트의 거래상태와 구매자 정보를 업데이트 한다.
     */
    function purchase() public {
        // TODO 
    }

    /**
    판매 종료 시각 이후 최고입찰자가 판매를 종료하는 함수
    - 판매가 종료된 경우 호출가능(판매 종료시각이 지난 경우)
    - 호출자가 최고가 제안자인 경우
    위 사항을 만족하는 경우
    1. 최종 제안가를 판매자에게 송금한다.
    2. NFT 소유권을 구매자에게 이전한다.
    3. 컨트랙트의 거래 상태와 구매자 정보를 업데이트한다.
    */
    function confirmItem() public {
        // TODO 
    }
    
    function cancelSales() public {
        // TODO
    }

    function getTimeLeft() public view returns (int256) {
        return (int256)(saleEndTime - block.timestamp);
    }

    function getBlockTimeStamp() public view returns(uint256){
        return block.timestamp;
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address
        )
    {
        return (
            saleStartTime,
            saleEndTime,
            minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress
        );
    }

    function getHighestBid() public view returns(uint256){
        return highestBid;
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다. 
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }

    modifier onlyAfterStart() {
        require(
            block.timestamp >= saleStartTime,
            "Sale: This sale is not started."
        );
        _;
    }
}
