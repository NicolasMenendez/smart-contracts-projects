const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'sure daring fever glance zero ticket monkey exist reward sell water enact',
  'https://rinkeby.infura.io/QT1hFPjIehE8J3aDK1lJ'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attemting to deply from account', accounts[0]);

  const result =  await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({gas:'1000000',from: accounts[0]});

      console.log(interface);
      console.log('Contract deploy to', result.options.address);

};

deploy();
