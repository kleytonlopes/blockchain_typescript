import BlockFactory from '../../Factories/BlockFactory';
import BlockInterface from '../Interfaces/BlockInterface';
import TransactionFactory from '../../Factories/TransactionFactory';
import TransactionInterface from '../Interfaces/TransactionInterface';
import BlockchainInterface from '../Interfaces/BlockchainInterface';

class Blockchain implements BlockchainInterface {
  chain: BlockInterface[];
  pendingTransactions: TransactionInterface[];
  difficulty: number;
  miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 2;
    this.miningReward = 100;
  }

  createGenesisBlock(): BlockInterface {
    return BlockFactory.create('0');
  }

  getLatestBlock(): BlockInterface | undefined {
    return [...this.chain].pop();
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const lastBlock = this.getLatestBlock();
    if (lastBlock) {
      const rewardTransaction = TransactionFactory.create(
        miningRewardAddress,
        this.miningReward,
        null,
        null,
      );
      this.pendingTransactions.push(rewardTransaction);

      const block = BlockFactory.create(
        lastBlock.hash,
        this.pendingTransactions,
      );
      block.mineBlock(this.difficulty);

      console.log('Block successfully mined!');
      this.chain.push(block);
      this.pendingTransactions = [];
    }
  }

  addTransaction(transaction: TransactionInterface): void {
    if (transaction.adressesAreValid()) {
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
