import Blockchain from '../Model/Classes/Blockchain';
import BlockchainInterface from '../Model/Interfaces/BlockchainInterface';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';

export default {
  create: function BlockchainFactory(
    cryptography: CryptographyInterface,
  ): BlockchainInterface {
    return new Blockchain(cryptography);
  },
};
