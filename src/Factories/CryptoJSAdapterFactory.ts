import CryptoJSAdapter from '../Infra/CryptoJsAdapter';
import CryptographyInterface from '../App/Interfaces/CryptographyInterface';
export default {
  create: function CryptoJSAdapterFactory(): CryptographyInterface {
    return new CryptoJSAdapter();
  },
};
