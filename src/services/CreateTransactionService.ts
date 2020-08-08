// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import CreateCategoryService from './CreateCategoryService'

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

    //creating caregory from this transaction
    const createCategory = new CreateCategoryService();
    const actualCategory = await createCategory.execute({ category });


    //creating transaction with this category
    const trasactionRep = getRepository(Transaction);

    const newTransaction = trasactionRep.create({
      title, type, value, category_id: actualCategory.id, category: actualCategory
    });

    await trasactionRep.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
