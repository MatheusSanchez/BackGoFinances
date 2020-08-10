// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'
import CreateCategoryService from './CreateCategoryService'
import transactionRepository from '../repositories/TransactionsRepository'

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}


class CreateTransactionService {
  public async execute({ title, type, value, category }: RequestDTO): Promise<Transaction> {

    if (type != "income" && type != "outcome") {
      throw new AppError("Type of Transaction isn't valid", 400);
    }

    const trasactionRep = getCustomRepository(transactionRepository);
    const { total } = await trasactionRep.getBalance();

    //verifying if we have balance
    if (type == "outcome" && total < value) {
      throw new AppError("You Don't have enough balance", 400);
    }

    //creating caregory from this transaction
    const createCategory = new CreateCategoryService();
    const actualCategory = await createCategory.execute({ category });

    //creating transaction with this category
    const newTransaction = trasactionRep.create({
      title, type, value, category: actualCategory
    });

    await trasactionRep.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
