import CryptographyInterface from '../Interfaces/CryptographyInterface';
import TransactionInterface from '../Interfaces/TransactionInterface';

class Block {
  cryptographyService: CryptographyInterface;
  hash: string;
  timestamp: number;
  transactions: TransactionInterface[];
  previousHash: string;
  nonce: number;

  constructor(
    cryptographyService: CryptographyInterface,
    timestamp: number,
    transactions: TransactionInterface[],
    previousHash = '',
  ) {
    this.cryptographyService = cryptographyService;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(): string {
    return this.cryptographyService.getSHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce,
    );
  }

  calculateBalance(address: string): number {
    let balance = 0;
    this.transactions.forEach((transaction: TransactionInterface) => {
      balance += transaction.calculateAmount(address);
    });
    return balance;
  }

  mineBlock(difficulty: number): void {
    while (
      this.hash.substring(0, difficulty) !== new Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: ' + this.hash);
  }

  hasValidTransactions(): boolean {
    this.transactions.forEach(transaction => {
      if (!transaction.isValid()) {
        return false;
      }
    });
    return true;
  }
}

export default Block;
