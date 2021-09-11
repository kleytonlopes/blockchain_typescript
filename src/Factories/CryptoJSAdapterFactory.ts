import CryptoJSAdapter from '../Infra/CryptoJsAdapter';
export default {
  create: function CryptoJSAdapterFactory(): CryptoJSAdapter {
    return new CryptoJSAdapter();
  },
};
