import BlockchainInterface from './Model/Interfaces/BlockchainInterface';
import EllipticAdapter from './Infra/EllipticAdapter';
import TransactionFactory from './Factories/TransactionFactory';
import BlockchainFactory from './Factories/BlockchainFactory';
import CryptoJSAdapterFactory from './Factories/CryptoJSAdapterFactory';

const cryptographyService = CryptoJSAdapterFactory.create();
const ellipticService = new EllipticAdapter();
const currentKeys = ellipticService.createKeys();
const myWalletAddress = currentKeys.publicKey;
const walletAddressB = ellipticService.createKeys().publicKey;

const myCoin: BlockchainInterface = BlockchainFactory.create(
  cryptographyService,
);

const trx1 = TransactionFactory.create(
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

// myCoin.chain[1].transactions[0].amount = 1000000;

console.log('is valid: ' + myCoin.isChainValid());
