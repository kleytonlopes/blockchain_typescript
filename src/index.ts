import BlockchainInterface from './Model/Interfaces/BlockchainInterface';
import EllipticAdapterFactory from './Factories/EllipticAdapterFactory';
import TransactionFactory from './Factories/TransactionFactory';
import BlockchainFactory from './Factories/BlockchainFactory';
const ellipticService = EllipticAdapterFactory.create();
const currentKeys = ellipticService.createKeys();
const myWalletAddress = currentKeys.publicKey;
const walletAddressB = ellipticService.createKeys().publicKey;

const myCoin: BlockchainInterface = BlockchainFactory.create();

const trx1 = TransactionFactory.create(walletAddressB, 10, myWalletAddress);
trx1.signTransaction(currentKeys.privateKey);
myCoin.addTransaction(trx1);

console.log('--> starting mining');

myCoin.minePendingTransactions(myWalletAddress);

console.log('Balance: ' + myCoin.getBalanceOfAddress(myWalletAddress));

// myCoin.chain[1].transactions[0].amount = 1000000;

console.log('is valid: ' + myCoin.isChainValid());
