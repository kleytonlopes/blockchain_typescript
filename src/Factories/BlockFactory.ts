import Block from '../Model/Classes/Block';
import BlockInterface from '../Model/Interfaces/BlockInterface';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';
import TransactionInterface from '../Model/Interfaces/TransactionInterface';
import CryptoJSAdapter from '../Infra/CryptoJsAdapter';
export default {
  create: function BlockFactory(
    previousHash: string,
    transactions: TransactionInterface[] = [],
    cryptography: CryptographyInterface = new CryptoJSAdapter(),
  ): BlockInterface {
    return new Block(cryptography, Date.now(), transactions, previousHash);
  },
};
