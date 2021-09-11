import Blockchain from '../App/Classes/Blockchain';
import BlockchainInterface from '../App/Interfaces/BlockchainInterface';
import CryptographyInterface from '../App/Interfaces/CryptographyInterface';

export default {
  create: function BlockchainFactory(): BlockchainInterface {
    return new Blockchain();
  },
};
