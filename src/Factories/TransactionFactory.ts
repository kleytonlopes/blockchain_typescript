import Transaction from '../Model/Classes/Transaction';
import TransactionInterface from '../Model/Interfaces/TransactionInterface';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';
import { EllipticCurveCryptoInterface } from '../Model/Interfaces/EllipticCurveCryptoInterface';
import CryptoJSAdapterFactory from './CryptoJSAdapterFactory';
import EllipticAdapterFactory from './EllipticAdapterFactory';
export default {
  create: function TransactionFactory(
    toAddress: string,
    amount: number,
    fromAddress: string | null = null,
    ellipticCurveCrypto: EllipticCurveCryptoInterface | null = EllipticAdapterFactory.create(),
    crypto: CryptographyInterface = CryptoJSAdapterFactory.create(),
  ): TransactionInterface {
    return new Transaction(
      crypto,
      ellipticCurveCrypto,
      fromAddress,
      toAddress,
      amount,
    );
  },
};
