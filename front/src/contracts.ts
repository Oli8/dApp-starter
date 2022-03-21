import type { ContractInterface } from '@ethersproject/contracts'
import type { Address } from './helpers/eth-helper'
// import SomeContractData from '../../solidity/build/contracts/SomeContract.json'

interface ContractJSON {
  abi: ContractInterface;
  networks: {
    [key: string]: {
      address: string;
    }
  }
}

interface ContractData {
  abi: ContractInterface;
  address: Address;
}

function getContractData(data: ContractJSON, networkId=3): ContractData {
  const { abi} = data;
  return {
    abi,
    address: data.networks[String(networkId)].address as Address
  }
}

// const SomeContract = getContractData(SomeContractData)

export {
  // SomeContract,
}
