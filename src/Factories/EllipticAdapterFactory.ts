import EllipticAdapter from '../Infra/EllipticAdapter';
import { EllipticCurveCryptoInterface } from '../Model/Interfaces/EllipticCurveCryptoInterface';
export default {
  create: function EllipticAdapterFactory(): EllipticCurveCryptoInterface {
    return new EllipticAdapter();
  },
};
