import Transaction from '../Model/Classes/Transaction';
import TransactionInterface from '../Model/Interfaces/TransactionInterface';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';
import { EllipticCurveCryptoInterface } from '../Model/Interfaces/EllipticCurveCryptoInterface';
import CryptoJSAdapter from '../Infra/CryptoJsAdapter';
import EllipticAdapter from '../Infra/EllipticAdapter';
export default {
  create: function TransactionFactory(
    toAddress: string,
    amount: number,
    fromAddress: string | null = null,
    ellipticCurveCrypto: EllipticCurveCryptoInterface | null = new EllipticAdapter(),
    crypto: CryptographyInterface = new CryptoJSAdapter(),
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
