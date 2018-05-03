const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'sure daring fever glance zero ticket monkey exist reward sell water enact',
  'https://rinkeby.infura.io/QT1hFPjIehE8J3aDK1lJ'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attemting to deploy from account', accounts[0]);

  const result =  await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode })
      .send({gas:'1000000',from: accounts[0]});

      console.log('Contract deploy to', result.options.address);

};

deploy();
