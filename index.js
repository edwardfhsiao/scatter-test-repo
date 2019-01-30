import 'babel-polyfill';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
ScatterJS.plugins(new ScatterEOS());

const network = {
  blockchain: 'eos',
  host: 'api1.eosasia.one',
  port: '443',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  protocol: 'https',
};

ScatterJS.scatter.connect('APP_NAME').then(connected => {
  if (!connected) {
    return false;
  }
  ScatterJS.scatter.eos(network, Eos);
  return true;
});

const getAccount = () => {
  ScatterJS.scatter
    .getIdentity({ accounts: [network] })
    .then(res => {
      const account = res.accounts.find(account => account.blockchain === 'eos');
      account['publicKey'] = res.publicKey;
      document.getElementById('login').innerHTML = account.name;
      document.getElementById('logout').innerHTML = 'logout';
    })
    .catch(error => {
      if (error.code) {
        console.log(`${error.code}: ${error.message}`);
        return;
      }
    });
};

document.getElementById('login').addEventListener('click', () => {
  getAccount();
});

document.getElementById('logout').addEventListener('click', () => {
  ScatterJS.scatter.forgetIdentity().then(() => {
    document.getElementById('login').innerHTML = 'login';
    document.getElementById('logout').innerHTML = '';
  });
});
