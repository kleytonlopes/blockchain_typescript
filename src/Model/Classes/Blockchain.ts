import CryptographyInterface from '../Interfaces/CryptographyInterface';
import Block from './Block';
import Transaction from './Transaction';
import TransactionInterface from '../Interfaces/TransactionInterface';

class Blockchain {
  cryptographyService: CryptographyInterface;
  chain: Block[];
  pendingTransactions: TransactionInterface[];
  difficulty: number;
  miningReward: number;

  constructor(cryptographyService: CryptographyInterface) {
    this.cryptographyService = cryptographyService;
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 2;
    this.miningReward = 100;
  }

  createGenesisBlock(): Block {
    return new Block(this.cryptographyService, Date.now(), [], '0');
  }

  getLatestBlock(): Block | undefined {
    return [...this.chain].pop();
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const lastBlock = this.getLatestBlock();
    if (lastBlock) {
      const rewardTransaction = new Transaction(
        this.cryptographyService,
        null,
        null,
        miningRewardAddress,
        this.miningReward,
      );
      this.pendingTransactions.push(rewardTransaction);

      const block = new Block(
        this.cryptographyService,
        Date.now(),
        this.pendingTransactions,
        lastBlock.hash,
      );
      block.mineBlock(this.difficulty);

      console.log('Block successfully mined!');
      this.chain.push(block);
      this.pendingTransactions = [];
    }
  }

  addTransaction(transaction: Transaction): void {
    if (!transaction.toAddress || !transaction.fromAddress) {
      throw new Error('Transaction must include to and from Address!');
    }
    if (!transaction.isValid()) {
      throw new Error('Transaction must be valid!');
    }
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;
    this.chain.forEach(block => {
      balance += block.calculateBalance(address);
    });
    return balance;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }
    }
    return true;
  }
}

export default Blockchain;
