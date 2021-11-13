const SomeContract = artifacts.require('SomeContract')
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers')

contract('SomeContract', (accounts) => {
  let contract
  const [alice, bob, carole, dominic] = accounts

  before(async () => {
    // Contract is deployed from alice address
    // See migration
    contract = await SomeContract.deployed()
  })

  context('valid', () => {
    let tx
    before(async () => {
      tx = await contract.someFunction()
    })

    it('should not throw an error', async () => {
      expect(tx.receipt.status).to.be.true
    })

    it('should emit event', async () => {
      expectEvent(tx, 'EventName', { _param: 'value' })
    })

    it('should revert for some reason', async () => {
      await expectRevert(
        contract.someFunction('paramValue', { from: carole }),
        'Expected error message',
      )
    })
  })
})
