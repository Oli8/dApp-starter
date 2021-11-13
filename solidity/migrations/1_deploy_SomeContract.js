const Migrations = artifacts.require("SomeContract");

module.exports = function (deployer, network, accounts) {
  if (network === 'development') {
    const [alice] = accounts
    // Deploy from alice for tests
    return deployer.deploy(Migrations, { from: alice })
  }

  return deployer.deploy(Migrations)
};
