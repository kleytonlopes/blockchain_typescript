import EC from 'elliptic';
const ec = new EC.ec('secp256k1');

import Blockchain from './Model/Blockchain'
import Transaction from './Model/Transaction';
import KeyGenerator from './Model/KeyGenerator';

const addressB = 'public key b';

const keys = KeyGenerator.generateKeys();
const myKey = ec.keyFromPrivate(keys.privateKey);
const myWalletAddress = myKey.getPublic('hex');

const myCoin = new Blockchain();

const trx1 = new Transaction(myWalletAddress, addressB, 10);
trx1.signTransaction(myKey);
myCoin.addTransaction(trx1);

console.log('--> starting mining');

myCoin.minePendingTransactions(myWalletAddress);

console.log('Balance: ' + myCoin.getBalanceOfAddress(myWalletAddress));

myCoin.chain[1].transactions[0].amount = 1000000;

console.log('is valid: ' + myCoin.isChainValid());
