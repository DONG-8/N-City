// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (utils/introspection/ERC165.sol)

pragma solidity ^0.8.0;

import "./IERC165.sol";

/**
 * @dev Implementation of the {IERC165} interface.
 *
 * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check
 * for the additional interface id that will be supported. For example:
 *
 * ```solidity
 * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
 *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);
 * }
 * ```
 *
 * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.
 */
/* 
ERC165는 ERC-721 스마트 컨트랙트를 생성할 떄 반드시 구현해야 하는 인터페이스를 검사하고, 언제 사용하는지 감지하는 역할.
함수 supportsInterface(bytes4 interfaceID) 만을 가지고 있으며 
변수로 ERC-721의 인터페이스 ID를 입력해야만 ERC-721스마트 컨트랙트가 정상적으로 작동하게 된다.
*/
abstract contract ERC165 is IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}
