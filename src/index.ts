import Blockchain from './Model/Classes/Blockchain';
import Transaction from './Model/Classes/Transaction';
import CryptoJSAdapter from './Infra/CryptoJsAdapter';
import EllipticAdapter from './Infra/EllipticAdapter';

const cryptographyService = new CryptoJSAdapter();
const ellipticService = new EllipticAdapter();
const currentKeys = ellipticService.createKeys();
const myWalletAddress = currentKeys.publicKey;
const walletAddressB = ellipticService.createKeys().publicKey;

const myCoin = new Blockchain(cryptographyService);

const trx1 = new Transaction(
  cryptographyService,
  ellipticService,
  myWalletAddress,
  walletAddressB,
  10,
);
trx1.signTransaction(currentKeys.privateKey);
myCoin.addTransaction(trx1);

console.log('--> starting mining');

myCoin.minePendingTransactions(myWalletAddress);

console.log('Balance: ' + myCoin.getBalanceOfAddress(myWalletAddress));

myCoin.chain[1].transactions[0].amount = 1000000;

console.log('is valid: ' + myCoin.isChainValid());
