import Block from '../App/Classes/Block';
import BlockInterface from '../App/Interfaces/BlockInterface';
import CryptographyInterface from '../App/Interfaces/CryptographyInterface';
import TransactionInterface from '../App/Interfaces/TransactionInterface';
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
