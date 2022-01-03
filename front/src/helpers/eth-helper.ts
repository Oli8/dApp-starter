import { providers, Contract,
         ContractTransaction, utils } from 'ethers'
// import { SomeContract } from '../contracts'

export type Address = `0x${string}`;

const readProvider: providers.InfuraProvider = new providers.InfuraProvider('ropsten');
// const contract: Contract = new Contract(
//   SomeContract.address,
//   SomeContract.ABI,
//   readProvider
// );

let provider: providers.Web3Provider;
let contractWithSigner: Contract;
let signer: providers.JsonRpcSigner;

// contract.on('event', (_: string) => {
//   alert('Something happened :o');
// });

(() => {
  if (!window.ethereum) return;

  provider = new providers.Web3Provider(window.ethereum, 'any');
  signer = provider.getSigner();

  // contractWithSigner = new Contract(
    // SomeContract.address,
    // SomeContract.ABI,
    // provider
  // ).connect(signer)
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

export async function getEthBalance(account: Address): Promise<number> {
  try {
    const balance = await provider.getBalance(account);
    return fromWei(balance.toHexString());
  } catch (error) {
    return 0;
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

export function toWei(amount: number): string {
  // ethers amount to wei in hexadecimal format
  return utils.parseEther(String(amount)).toHexString();
}

export function fromWei(amount: string): number {
  // hexadecimal wei amount to ethers
  return Number(utils.formatEther(amount));
}

// export async function someContractFunction(arg: any): Promise<ContractTransaction> {
//   return contractWithSigner.someFunction(arg);
// }

export { provider }
