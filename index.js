import 'babel-polyfill';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
ScatterJS.plugins(new ScatterEOS());

// const eos = Eos({
//   httpEndpoint: `https://api1.eosasia.one:443`,
//   chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
// });

const getAccount = () => {
  ScatterJS.scatter.connect('APP_NAME').then(connected => {
    if (!connected) {
      return false;
    }
    const network = {
      blockchain: 'eos',
      host: 'api1.eosasia.one',
      port: '443',
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      protocol: 'https',
    };
    const eos = ScatterJS.scatter.eos(network, Eos);
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
    return true;
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
