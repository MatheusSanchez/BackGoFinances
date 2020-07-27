// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category_id: string;
}


class CreateTransactionService {
  public async execute({ title, type, value, category_id }: RequestDTO): Promise<Transaction> {
    if (type != "income" && type != "outcome") {
      throw new AppError("Type of Transaction isn't valid", 400);
    }

    const trasactionRep = getRepository(Transaction);

    const newTransaction = trasactionRep.create({
      title, type, value, category_id
    });

    await trasactionRep.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
