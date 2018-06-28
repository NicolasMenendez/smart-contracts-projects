var AirToken = artifacts.require("AirToken");
var AirContract = artifacts.require("AirContract");

module.exports = function(deployer) {
  deployer.deploy(AirToken);
  deployer.deploy(AirContract);
};
