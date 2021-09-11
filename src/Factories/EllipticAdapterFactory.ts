import EllipticAdapter from '../Infra/EllipticAdapter';
import { EllipticCurveCryptoInterface } from '../App/Interfaces/EllipticCurveCryptoInterface';
export default {
  create: function EllipticAdapterFactory(): EllipticCurveCryptoInterface {
    return new EllipticAdapter();
  },
};
