import { getCustomRepository } from 'typeorm'
import TransactionsRep from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'



class GetAllTransactions {
    public async execute(): Promise<Transaction[]> {


        const transactionRep = getCustomRepository(TransactionsRep);
        const allTransactions = transactionRep.find();

        return allTransactions;


    }
}

export default GetAllTransactions;
