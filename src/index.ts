import Block from './Model/Block'
import Blockchain from './Model/Blockchain'

let myCoin = new Blockchain()

console.log('Mining Block 1')
myCoin.addBlock(new Block(1, '654321', {amount: 4}));

console.log('Mining Block 2')
myCoin.addBlock(new Block(2, '789123', {amount: 10}));


