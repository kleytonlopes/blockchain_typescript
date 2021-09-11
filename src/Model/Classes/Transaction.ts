import CryptographyInterface from '../Interfaces/CryptographyInterface';
import { EllipticCurveCryptoInterface } from '../Interfaces/EllipticCurveCryptoInterface';
import TransactionInterface from '../Interfaces/TransactionInterface';

class Transaction implements TransactionInterface {
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
  calculateAmount(address: string): number {
    switch (address) {
      case this.toAddress:
        return this.amount;
      case this.fromAddress:
        return -1 * this.amount;
      default:
        return 0;
    }
  }

  private calculateHash(): string {
    return this.cryptographyService.getSHA256(
      this.fromAddress + this.toAddress + this.amount,
    );
  }

  signTransaction(privateKey: string): void {
    if (!this.ellipticCurveService) {
      throw new Error('The private key was not provided!');
    }
    const ellipticCurve = this.ellipticCurveService;
    const publicKey = ellipticCurve.getPublicKeyFromPrivate(privateKey);
    if (publicKey !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }
    const hashTransaction = this.calculateHash();
    this.signature = ellipticCurve.sign(hashTransaction, privateKey);
  }

  isValid(): boolean {
    if (this.fromAddress === null) return true;
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No Signature in this transaction!');
    }
    if (!this.ellipticCurveService) {
      return true;
    }
    return this.ellipticCurveService?.signatureIsValid(
      this.calculateHash(),
      this.fromAddress,
      this.signature,
    );
  }
}

export default Transaction;
