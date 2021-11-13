import { providers, Contract,
         ContractTransaction } from 'ethers';
import { SOME_CONTRACT_ADDRESS,
         SOME_CONTRACT_ABI } from '../contracts/some_contract';

export type Address = `0x${string}`;

const readProvider: providers.InfuraProvider = new providers.InfuraProvider('ropsten');
const contract: Contract = new Contract(
  SOME_CONTRACT_ADDRESS,
  SOME_CONTRACT_ABI,
  readProvider
);

let provider: providers.Web3Provider;
let contractWithSigner: Contract;
let signer: providers.JsonRpcSigner;

contract.on('Certified', (name: string) => {
  alert(`${name} est maintenant certifié Punkiest Place to Work`);
});

(() => {
  if (!window.ethereum) return;

  provider = new providers.Web3Provider(window.ethereum, 'any');
  signer = provider.getSigner();

  contractWithSigner = new Contract(SOME_CONTRACT_ADDRESS, SOME_CONTRACT_ABI, provider)
                                   .connect(signer)
})()

export async function connectWallet(): Promise<Address> {
  try {
    const [account] = await provider.send('eth_requestAccounts', []);
    return account;
  } catch (error) {
    return null;
  }
}

export async function getConnectedWallet(): Promise<Address> {
  try {
    return await signer.getAddress() as Address;
  } catch (error) {
    return null;
  }
}

export async function getChain(): Promise<number> {
  try {
    const { chainId } = await provider.getNetwork();
    return chainId;
  } catch (error) {
    return null;
  }
}

// export async function someContractFunction(arg: any): Promise<ContractTransaction> {
//   return contractWithSigner.someFunction(arg);
// }

export { provider }
