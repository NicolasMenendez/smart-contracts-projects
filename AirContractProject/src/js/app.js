App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },


  initContract: function() {
    $.getJSON('AirContract.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var AirContractArtifact = data;
      App.contracts.AirContract = TruffleContract(AirContractArtifact);

      // Set the provider for our contract.
      App.contracts.AirContract.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      //return App.getBalances();
    });

    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '#allowanceButton', App.handleAllowance);
    $(document).on('click', '#withdrawButton', App.handleWithdraw);
  },

  handleAllowance: function(event) {
    event.preventDefault();

    var amount = parseInt($('#AllowAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    console.log('Allow ' + amount + ' AIR tokens to be withdraw' + toAddress);

    var AirContractInstance;

     web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.AirContract.deployed().then(function(instance) {
        AirContractInstance = instance;

        return AirContractInstance.setAllowance(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Allowance Successful!');
      //  return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },


handleWithdraw: function(event) {
  event.preventDefault();

  var amount = parseInt($('#amountToWithdraw').val());

  console.log('Withdraw of' + amount + ' AIR tokens');

  var AirContractInstance;

   web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];

    App.contracts.AirContract.deployed().then(function(instance) {
      AirContractInstance = instance;

      return AirContractInstance.pullTokens(amount, {from: account, gas: 100000});
    }).then(function(result) {
      alert('Successful Withdrawal!');
    }).catch(function(err) {
      console.log(err.message);
    });
  });
},

};


$(function() {
  $(window).load(function() {
    App.init();
  });
});
