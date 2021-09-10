import SHA256 from 'crypto-js/sha256';
import CryptographyInterface from '../Model/Interfaces/CryptographyInterface';

class CryptoJSAdapter implements CryptographyInterface {
  getSHA256(value: string): string {
    return SHA256(value).toString();
  }
}

export default CryptoJSAdapter;
