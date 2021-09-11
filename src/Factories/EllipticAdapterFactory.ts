import EllipticAdapter from '../Infra/EllipticAdapter';
export default {
  create: function EllipticAdapterFactory(): EllipticAdapter {
    return new EllipticAdapter();
  },
};
