import Transaction from '../Model/Classes/Transaction';
import TransactionInterface from '../Model/Interfaces/TransactionInterface';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';
import { EllipticCurveCryptoInterface } from '../Model/Interfaces/EllipticCurveCryptoInterface';
export default {
  create: function TransactionFactory(
    cryptoInterface: CryptographyInterface,
    ellipticCurveCrypto: EllipticCurveCryptoInterface | null,
    fromAddress: string | null,
    toAddress: string,
    amount: number,
  ): TransactionInterface {
    return new Transaction(
      cryptoInterface,
      ellipticCurveCrypto,
      fromAddress,
      toAddress,
      amount,
    );
  },
};
