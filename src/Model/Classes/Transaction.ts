import EC from 'elliptic';
import CryptographyInterface from '../Interfaces/CryptographyInterface';
const ec = new EC.ec('secp256k1');

class Transaction {
  cryptographyService: CryptographyInterface;
  fromAddress: string | null;
  toAddress: string;
  amount: number;
  signature?: string;

  constructor(
    cryptographyService: CryptographyInterface,
    fromAddress: string | null,
    toAddress: string,
    amount: number,
  ) {
    this.cryptographyService = cryptographyService;
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash(): string {
    return this.cryptographyService.getSHA256(
      this.fromAddress + this.toAddress + this.amount,
    );
  }

  signTransaction(signingKey: EC.ec.KeyPair): void {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }
    const hashTransaction = this.calculateHash();
    const signature = signingKey.sign(hashTransaction, 'base64');
    this.signature = signature.toDER('hex');
  }

  isValid(): boolean {
    if (this.fromAddress === null) return true;
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No Signature in this transaction!');
    }
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

export default Transaction;
