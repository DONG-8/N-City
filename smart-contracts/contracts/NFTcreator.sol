// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./token/ERC721/extensions/ERC721Enumerable.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract NFTcreator is ERC721 {

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs; // 토큰URI를 저장할 수 있는 mapping

    event createNFT (uint256 indexed _tokenId, address indexed _owner);

    constructor() ERC721("N-city", "NCT") {}

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    // tokenId를 매개변수로 호출하면 token를 반환하는 함수
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }

    // 해당 함수를 호출함으로써 호출자가 지정한 tokenURI를 새롭게 발행한다.
    // 내부적으로 새로운 토큰 식별자(tokenId)를 부여받고 _mint()를 호출한다.
    // 상태변수에 토큰 식별자의 toeknURI 정보를 추가한다. 저위에 mapping에 추가하라는 말인듯
    // 새롭게 생성된 토큰 식별자를 반환한다.
    function create(address to, string memory _tokenURI) public returns (uint256) {
        // TODO
        // require(msg.sender == to, "caller is not match with nft creator(to address)");
        uint256 tokenId = current() + 1;
        tokenURIs[tokenId] = _tokenURI;
        _tokenIds = tokenId;
        _mint(to, tokenId);
        emit createNFT(tokenId, to);
        return tokenId;
    }
}