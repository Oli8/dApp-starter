import type { ContractInterface } from "@ethersproject/contracts";
import type { Address } from "../helpers/eth-helper";

const SOME_CONTRACT_ADDRESS: Address = '0xBA9a35B3048c2E922D9D27724c02243831178F20';

const SOME_CONTRACT_ABI: ContractInterface = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "ApplicationReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "Certified",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_webSite",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_logoURI",
        "type": "string"
      }
    ],
    "name": "sendApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_companyAddress",
        "type": "address"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_webSite",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_logoURI",
        "type": "string"
      }
    ],
    "name": "editCompany",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCertifiedCompanies",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "webSite",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "logoURI",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "enum PunkiestPlaceToWork.ApplicationState",
            "name": "state",
            "type": "uint8"
          }
        ],
        "internalType": "struct PunkiestPlaceToWork.Company[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getPendingApplications",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "webSite",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "logoURI",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "enum PunkiestPlaceToWork.ApplicationState",
            "name": "state",
            "type": "uint8"
          }
        ],
        "internalType": "struct PunkiestPlaceToWork.Company[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

export {
  SOME_CONTRACT_ADDRESS,
  SOME_CONTRACT_ABI,
};
