import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async all(): Promise<Transaction[]> {
    const allTransactions = await this.find();

    return allTransactions;
  }

  public async getBalance(): Promise<Balance> {
    const allTransactions = await this.find();
    console.log(allTransactions);

    const { income, outcome } = allTransactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type == 'income') {
          accumulator.income += transaction.value;
        } else {
          accumulator.outcome += transaction.value;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }
}

export default TransactionsRepository;
