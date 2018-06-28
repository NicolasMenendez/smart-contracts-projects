const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  rinkeby: {
    provider: function() {
      return new HDWalletProvider('sure daring fever glance zero ticket monkey exist reward sell water enact',
      'https://rinkeby.infura.io/QT1hFPjIehE8J3aDK1lJ');
    },
    network_id: '4',
  }
  }

};
