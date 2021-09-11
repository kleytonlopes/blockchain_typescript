import TransactionInterface from './TransactionInterface';

export default interface BlockchainInterface {
  addTransaction(transaction: TransactionInterface): void;
  isChainValid(): boolean;
  minePendingTransactions(miningRewardAddress: string): void;
  getBalanceOfAddress(address: string): number;
}
