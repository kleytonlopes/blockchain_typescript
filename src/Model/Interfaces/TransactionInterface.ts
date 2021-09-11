export default interface TransactionInterface {
  isValid(): boolean;
  signTransaction(privateKey: string): void;
  calculateAmount(address: string): number;
}
