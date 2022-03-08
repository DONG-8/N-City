import { AbiItem } from "web3-utils"
import Web3 from "web3";

const mintAnimalTokenAbi: AbiItem[] = [];
const saleAnimalTokenAbi: AbiItem[] = [];

const mintAnimalTokenAddress = "";
export const saleAnimalTokenAddress = "";

export const web3 = new Web3(window.ethereum);

// 두가지인자 필요 (abi, address)
export const mintAnimalTokenContract = new web3.eth.Contract(
	mintAnimalTokenAbi,
	mintAnimalTokenAddress
);

export const saleAnimalTokenContract = new web3.eth.Contract(
	saleAnimalTokenAbi,
	saleAnimalTokenAddress
);