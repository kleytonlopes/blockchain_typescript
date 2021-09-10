import CryptographyInterface from '../Interfaces/CryptographyInterface';
import EllipticCurveCryptoInterface from '../Interfaces/EllipticCurveCryptoInterface';

class Transaction {
  cryptographyService: CryptographyInterface;
  ellipticCurveService: EllipticCurveCryptoInterface | null;
  fromAddress: string | null;
  toAddress: string;
  amount: number;
  signature?: string;

  constructor(
    cryptographyService: CryptographyInterface,
    ellipticCurveService: EllipticCurveCryptoInterface | null,
    fromAddress: string | null,
    toAddress: string,
    amount: number,
  ) {
    this.cryptographyService = cryptographyService;
    this.ellipticCurveService = ellipticCurveService;
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash(): string {
    return this.cryptographyService.getSHA256(
      this.fromAddress + this.toAddress + this.amount,
    );
  }

  signTransaction(): void {
    if (this.ellipticCurveService) {
      if (this.ellipticCurveService.publicKey !== this.fromAddress) {
        throw new Error('You cannot sign transactions for other wallets!');
      }
      const hashTransaction = this.calculateHash();
      this.signature = this.ellipticCurveService.sign(hashTransaction);
    } else {
      throw new Error('The private key was not provided!');
    }
  }

  isValid(): boolean {
    if (this.fromAddress === null) return true;
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No Signature in this transaction!');
    }
    if (this.ellipticCurveService) {
      return this.ellipticCurveService?.signatureIsValid(
        this.calculateHash(),
        this.signature,
      );
    }
    return true;
  }
}

export default Transaction;
