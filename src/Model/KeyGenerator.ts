import EC from 'elliptic';
const ec = new EC.ec('secp256k1');

interface TypeKeys {
  privateKey: string;
  publicKey: string;
}
class KeyGenerator {
  static generateKeys(): TypeKeys {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    return { privateKey, publicKey };
  }
}

export default KeyGenerator;
