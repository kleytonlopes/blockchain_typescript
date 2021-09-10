import EC from 'elliptic';
const ec = new EC.ec('secp256k1');
import {
  EllipticCurveCryptoInterface,
  TypeKeys,
} from '../Model/Interfaces/EllipticCurveCryptoInterface';

class EllipticAdapter implements EllipticCurveCryptoInterface {
  private keyParFromPrivate(key: string) {
    return ec.keyFromPrivate(key);
  }

  createKeys(): TypeKeys {
    const keyPar = ec.genKeyPair();
    return {
      privateKey: keyPar.getPrivate('hex'),
      publicKey: keyPar.getPublic('hex'),
    };
  }

  sign(value: string, privateKey: string): string {
    const keyPar = this.keyParFromPrivate(privateKey);
    const signature = keyPar.sign(value, 'base64');
    return signature.toDER('hex');
  }

  getPublicKeyFromPrivate(key: string): string {
    const keyPar = this.keyParFromPrivate(key);
    return keyPar.getPublic('hex');
  }

  signatureIsValid(
    value: string,
    publicKey: string,
    signature: string,
  ): boolean {
    const keyPar = ec.keyFromPublic(publicKey, 'hex');
    return keyPar.verify(value, signature);
  }
}

export default EllipticAdapter;
