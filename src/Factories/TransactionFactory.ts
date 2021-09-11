import Transaction from '../App/Classes/Transaction';
import TransactionInterface from '../App/Interfaces/TransactionInterface';
import CryptographyInterface from '../App/Interfaces/CryptographyInterface';
import { EllipticCurveCryptoInterface } from '../App/Interfaces/EllipticCurveCryptoInterface';
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
