import Block from '../Model/Classes/Block';
import BlockInterface from '../Model/Interfaces/BlockInterface';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';
import TransactionInterface from '../Model/Interfaces/TransactionInterface';
import CryptoJSAdapterFactory from './CryptoJSAdapterFactory';
export default {
  create: function BlockFactory(
    previousHash: string,
    transactions: TransactionInterface[] = [],
    cryptography: CryptographyInterface = CryptoJSAdapterFactory.create(),
  ): BlockInterface {
    return new Block(cryptography, Date.now(), transactions, previousHash);
  },
};
