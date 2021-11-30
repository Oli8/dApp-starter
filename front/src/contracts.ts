import type { ContractInterface } from '@ethersproject/contracts'
import type { Address } from './helpers/eth-helper'
// import SomeContractData from '../../solidity/build/contracts/SomeContract.json'

interface ContractData {
  ABI: ContractInterface;
  address: Address;
}

function getContractData(data, networkId=3): ContractData {
  const { abi: ABI } = data;
  return {
    ABI,
    address: data.networks[String(networkId)].address
  }
}

// const SomeContract = getContractData(SomeContractData)

export {
  // SomeContract,
}
