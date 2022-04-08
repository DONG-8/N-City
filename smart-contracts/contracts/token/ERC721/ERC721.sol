// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./extensions/IERC721Metadata.sol";
import "../../utils/Address.sol";
import "../../utils/Context.sol";
import "../../utils/Strings.sol";
import "../../utils/introspection/ERC165.sol";

/**
 * PJT Ⅰ - 과제 1 ERC-721 구현
 * @dev EIP-721을 준수하여 ERC721을 작성합니다. 
 * https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    // token ID -> token owner address 맵핑
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    // owner가 가진 token의 개수 맵핑
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    // token ID -> 권한이 부여된 주소로 맵핑
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    // 소유자에서 운영자(operator) 승인 여부로의 매핑
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // constructor는 컨트랙트가 빌드될때 한번 실행
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    // 해당 주소가 보유하고있는 nft갯수를 리턴
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require (owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner];
    }

    // 해당토큰(NFT)의 소유자의 주소를 return
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }


    /* 
    이 함수는 tokenId를 입력받아 URI를 리턴한다.
    일반적으로 NFT에 포함될 이름, 설명, 이미지 URI를 포함하는 jSON파일의 형태로 저장한 URI를 반환한다.
    일단 tokenId가 있는지를 검사를 하고 함수 _baseURI를 실행하여 baseURI가 있는지를 검사한다.
    있다면 tokenId를 합친 문자열을 리턴, 없다면 빈 문자열을 리턴한다.
    */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    }


    // 기본 URI를 return
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    // 해당 주소에 nft 전송 권한을 부여
    // 한번에 하나의 승인된 주소만 있을 수 있음
    // 토큰 소유자나 승인된 운영자만이 호출 가능
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }


    // token ID 에 매칭된 승인된 주소(해당 토큰의 전송 권한을 갖고 있는 주소)를 반환하는 함수
    // _tokenApprovals에는 승인된 주소들 목록이 담겨있다.
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    // ApprovalForAll 이벤트를 실행시키는 함수
    // 컨트랙트 오너(관리자)만 실행가능, 오퍼레이터에게 모든 자산을 관리할 수 있는 권한을 부여하거나 없애는 역할
    // nft 소유자가 해당 주소에게 모든 nft 에 대한 전송 권한 부여 및 해제
    // operator : 승인을 설정하고자 하는 주소
    // approved : 설정하고자 하는 승인의 상태
    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    // 주어진 operator가 owner로부터 승인되었는지 여부를 확인하는 함수
    // setApprovealForAll 의 권한이 있는지 true, false 리턴
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * 주어진 토큰 ID의 소유권을 다른 주소로 전송
     * 이 메소드는 사용하지 않는 것이 좋다, 가능하다면 `safeTransferFrom`을 사용 권장
     * _msgSender()는 소유자, 승인된 주소, 또는 운영자여야 함.
     * @param from 토큰의 현재 소유자
     * @param to 주어진 토큰 ID의 소유권을 받을 주소
     * @param tokenId 전송할 토큰의 uint256 ID
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    // 전송받는 to 주소가 erc721토큰을 받을수 있는지 체크하고 전달
    /**
     * 주어진 토큰 ID의 소유권을 다른 주소로 안전하게 전송
     * 만일 목표 주소가 컨트랙트라면, 컨트랙트는 `onERC721Received`를 구현했어야만 함
     * 이는 안전한 전송으로부터 호출되며 마법의 값
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`를 반환.
     * 만일 다른 경우에는 전송이 되돌려짐.
     * _msgSender()는 소유자, 승인된 주소, 운영자여야 함
     * @param from 토큰의 현재 소유자
     * @param to 주어진 토큰 ID의 소유권을 받을 주소
     * @param tokenId 전송할 토큰의 uint256 ID
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    // 데이터까지 같이 보낼 때
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * 새 토큰을 발행하기 위한 내부 함수.
     * 주어진 토큰 ID가 이미 존재하면 되돌림.
     * @param to 발행된 토큰을 소유할 주소
     * @param tokenId uint256 발행될 토큰의 ID
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId);
    }

    /*
     * @dev 특정 토큰을 소각하기 위한 내부 함수.
     * 토큰이 존재하지 않으면 되돌립니다.
     * @param tokenId uint256 소각할 토큰의 ID
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);

        _afterTokenTransfer(owner, address(0), tokenId);
    }
    
    /**
     * 지정한 토큰이 존재하는지 여부를 반환
     * @param tokenId uint256 존재를 조회하고자 하는 토큰의 ID
     * @return bool 토큰의 존재 여부
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * 지정된 spender가 주어진 토큰 ID를 전송할 수 있는지 여부를 반환.
     * @param spender 조회하고자 하는 spender의 주소
     * @param tokenId uint256 전송하고자 하는 토큰 ID
     * @return bool _msgSender()가 주어진 토큰 ID에 대해 승인되었는지,
     * 운영자인지, 또는 토큰의 소유자인지 여부
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }


    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }


    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits a {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    // 주어진 토큰 ID의 소유권을 다른 주소로 전송하기 위한 내부 함수.
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }
    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }
    
    /*
    * to 주소에서 {IERC721Receiver-ONERC721Received}을(를) 호출하는 내부 함수입니다.
    * to 주소가 컨트랙트가 아닌 경우 호출이 실행되지 않습니다.
    *
    * @param from 주어진 토큰ID의 이전 owner 주소
    * @param to 토큰을 받을 대상 주소
    * @param tokenId 전송할 토큰의 uint256 ID
    * @param _data 함께 보낼 optional 데이터
    * @return 함수가 정확하게 예상된 magic value를 반환했는지 확인(bool값)
    */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }
    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

}
