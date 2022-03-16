// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT {

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor() {
        // TODO
    }

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        // TODO
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        // TODO
    }
}