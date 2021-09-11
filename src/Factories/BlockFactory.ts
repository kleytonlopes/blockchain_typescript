import Block from '../Model/Classes/Block';
import BlockInterface from '../Model/Interfaces/BlockInterface';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';
import TransactionInterface from '../Model/Interfaces/TransactionInterface';
export default {
  create: function BlockFactory(
    cryptography: CryptographyInterface,
    transactions: TransactionInterface[],
    previousHash: string,
  ): BlockInterface {
    return new Block(cryptography, Date.now(), transactions, previousHash);
  },
};
