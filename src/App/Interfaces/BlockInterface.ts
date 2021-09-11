export default interface BlockInterface {
  readonly hash: string;
  readonly previousHash: string;
  calculateBalance(address: string): number;
  hasValidTransactions(): boolean;
  calculateHash(): string;
  mineBlock(difficulty: number): void;
}
