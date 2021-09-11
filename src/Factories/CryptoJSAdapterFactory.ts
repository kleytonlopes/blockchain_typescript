import CryptoJSAdapter from '../Infra/CryptoJsAdapter';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';
export default {
  create: function CryptoJSAdapterFactory(): CryptographyInterface {
    return new CryptoJSAdapter();
  },
};
