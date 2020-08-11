import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import transactionRepository from '../repositories/TransactionsRepository'

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {

    const transactionRepo = getCustomRepository(transactionRepository);
    const transaction = await transactionRepo.findOne(id);

    if (!transaction) {
      throw new AppError("Transactions doesn't exist", 400);
    }

    await transactionRepo.remove(transaction);

  }
}

export default DeleteTransactionService;
