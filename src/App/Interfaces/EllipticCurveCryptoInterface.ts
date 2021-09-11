export interface EllipticCurveCryptoInterface {
  createKeys(): TypeKeys;
  sign(value: string, privateKey: string): string;
  getPublicKeyFromPrivate(key: string): string;
  signatureIsValid(
    value: string,
    publicKey: string,
    signature: string,
  ): boolean;
}

export interface TypeKeys {
  privateKey: string;
  publicKey: string;
}
