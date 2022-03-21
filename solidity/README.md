Require a `.env` file with:

API_URL="..." // Provider URI (Infura...)

PRIVATE_KEY="..." // Wallet private key or check truffle config file for other options like mnemonic

### Commands

Compile Contracts

`truffle compile`

Deploy (dev):

`truffle deploy`

Deploy (ropsten):

`truffle deploy --network ropsten`

Open console:

`truffle console`  
`truffle console --network ropsten`

You can then access your contracts as such:
```javascript
const contract = await YourContract.deployed()
await contract.someFunction()
```
