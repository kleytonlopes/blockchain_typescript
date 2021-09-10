import EC from 'elliptic';
const ec = new EC.ec('secp256k1');
import EllipticCurveCryptoInterface from '../Model/Interfaces/EllipticCurveCryptoInterface';

class EllipticAdapter implements EllipticCurveCryptoInterface {
  publicKey: string;
  privateKey: string;
  private keyPar: EC.ec.KeyPair;

  constructor(privateKey?: string) {
    this.keyPar = privateKey ? ec.keyFromPrivate(privateKey) : ec.genKeyPair();
    this.privateKey = this.keyPar.getPrivate('hex');
    this.publicKey = this.keyPar.getPublic('hex');
  }
  signatureIsValid(value: string, signature: string): boolean {
    const publicKey = ec.keyFromPublic(this.publicKey, 'hex');
    return publicKey.verify(value, signature);
  }

  sign(value: string): string {
    const signature = this.keyPar.sign(value, 'base64');
    return signature.toDER('hex');
  }
}

export default EllipticAdapter;
