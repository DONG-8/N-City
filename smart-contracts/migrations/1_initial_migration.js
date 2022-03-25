//const Migrations = artifacts.require("Migrations"); 
const SSFToken = artifacts.require("SSFToken");
const NFTcreator = artifacts.require("NFTcreator");
const SaleFactory = artifacts.require("SaleFactory");
// 빌드폴더안에 있는 SSFToken.json, ...의 데이터(바이트코드)를 가져와서 deplyer가 배포
// 배포되는 이더리움 네트워크 주소는 truffle-config.js에 설정된 주소로 매핑됨

/**
 * PJT Ⅰ/Ⅲ - 시나리오 테스트
 * @dev 
 * 올바른 테스트를 위해 
 * PJT Ⅰ - NFTcreator
 * PJT Ⅲ - NFTcreator, SSFToken, SaleFactory
 * 가 배포되어야 합니다. 
 */
module.exports = async (deployer) => {
  deployer.deploy(NFTcreator).then(
    function() {
      return deployer.deploy(SaleFactory, NFTcreator.address)
    }
  ).then(
    function() {
      return deployer.deploy(SSFToken, "SSAFY", "SSF", 0);
    }
  )
  // deployer.deploy(SSFToken, "SSAFY", "SSF", 0);
  // deployer.deploy(SaleFactory, NFTcreator.address);
};