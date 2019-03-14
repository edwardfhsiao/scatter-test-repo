import 'babel-polyfill';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
ScatterJS.plugins(new ScatterEOS());

const network = [
  {
    blockchain: 'eos',
    host: 'api1.eosasia.one',
    port: '443',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    protocol: 'https',
  },
  {
    blockchain: 'eos',
    host: 'api.eoseoul.io',
    port: '443',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    protocol: 'https',
  },
];

let account;
let connected = false;
let eos;
ScatterJS.scatter.connect('APP_NAME').then(c => {
  connected = c;
  if (!connected) {
    return false;
  }
  initScatter(0);
});

const initScatter = index => {
  console.log('eos start');
  eos = ScatterJS.scatter.eos(network[index], Eos);
  console.log('error would occure above with desktop version');
  return true;
};

const getAccount = index => {
  ScatterJS.scatter
    .getIdentity({ accounts: [network[index]] })
    .then(res => {
      account = res.accounts.find(item => item.blockchain === 'eos');
      account['publicKey'] = res.publicKey;
      document.getElementById('login').innerHTML = account.name;
      document.getElementById('transfer').innerHTML = 'Transfer';
      document.getElementById('logout').innerHTML = 'logout';
    })
    .catch(error => {
      if (error.code) {
        console.log(`${error.code}: ${error.message}`);
        return;
      }
    });
};

document.getElementById('networkIndexSelection').addEventListener('change', e => {
  const index = e.currentTarget.value;
  document.getElementById('networkIndex').innerHTML = index;
  initScatter(index);
});

document.getElementById('login').addEventListener('click', () => {
  getAccount(document.getElementById('networkIndexSelection').value);
});

document.getElementById('logout').addEventListener('click', () => {
  ScatterJS.scatter.forgetIdentity().then(() => {
    document.getElementById('login').innerHTML = 'login';
    document.getElementById('logout').innerHTML = '';
  });
});

document.getElementById('transfer').addEventListener('click', () => {
  if (!account) {
    alert('login first');
    return;
  }
  eos.transfer(account.name, '1', '0.1000 EOS', 'memo', {
    authorization: [`${account.name}@${account.authority}`],
  });
});
