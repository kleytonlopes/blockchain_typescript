export default interface EllipticCurveCryptoInterface {
  publicKey: string;
  privateKey: string;
  sign(value: string): string;
  signatureIsValid(value: string, signature: string): boolean;
}
