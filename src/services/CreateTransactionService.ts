// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';
import transactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: RequestDTO): Promise<Transaction> {
    if (type !== 'income' && type !== 'outcome') {
      throw new AppError("Type of Transaction isn't valid", 400);
    }

    const trasactionRep = getCustomRepository(transactionRepository);
    const categoryRepo = getRepository(Category);

    const { total } = await trasactionRep.getBalance();

    // verifying if we have balance
    if (type === 'outcome' && total < value) {
      throw new AppError("You Don't have enough balance", 400);
    }

    // creating caregory from this transaction
    let transactionCategory = await categoryRepo.findOne({
      where: {
        title: category,
      },
    });

    if (!transactionCategory) {
      transactionCategory = categoryRepo.create({
        title: category,
      });
      await categoryRepo.save(transactionCategory);
    }

    // creating transaction with this category
    const newTransaction = trasactionRep.create({
      title,
      type,
      value,
      category: transactionCategory,
    });

    await trasactionRep.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
