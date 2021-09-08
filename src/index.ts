const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

import Blockchain from './Model/Blockchain'
import Transaction from './Model/Transaction';
import KeyGenerator from './Model/KeyGenerator';

const addressMiner = 'public key miner';
const addressB = 'public key b';


const keys = KeyGenerator.generateKeys();
const myKey = ec.keyFromPrivate(keys.privateKey);
const myWalletAddress = myKey.getPublic('hex');

let myCoin = new Blockchain()

const trx1 = new Transaction(myWalletAddress, addressB, 10);
trx1.signTransaction(myKey);
myCoin.addTransaction(trx1);

console.log('--> starting mining')

myCoin.minePendingTransactions(myWalletAddress);

console.log('Balance: '+ myCoin.getBalanceOfAddress(myWalletAddress));
console.log('is valid: '+ myCoin.isChainValid());

