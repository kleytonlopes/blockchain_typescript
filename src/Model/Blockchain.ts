import Block from './Block';
import Transaction from './Transaction';

class Blockchain{
    chain: Block[]
    pendingTransactions: Transaction[]
    difficulty: number
    miningReward: number


    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = []
        this.difficulty = 2
        this.miningReward = 100
    }

    createGenesisBlock(){
        return new Block(Date.now(),[], '0');
    }

    getLatestBlock(){
        return [... this.chain].pop()
    }

    // addBlock(newBlock: Block){
    //     newBlock.previousHash = this.getLatestBlock()!.hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    minePendingTransactions(miningRewardAddress: string){
        const block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);

        //finish
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction: Transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address: string){
        let balance = 0;
        this.chain.forEach(block => {
            block.transactions.forEach((transaction: Transaction) => {
                if(transaction.toAddress === address){
                    balance += transaction.amount
                }else if(transaction.fromAddress === address){
                    balance -= transaction.amount
                }
            });
        });
        return balance;
    }


    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

export default Blockchain