import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRep = getCustomRepository(TransactionsRepository);
  const allTransactions = await transactionRep.all();

  return response.status(200).json(allTransactions);
});

transactionsRouter.post('/', async (request, response) => {


  const { title, type, value, category } = request.body;

  const CreateTransaction = new CreateTransactionService();
  const newTransaction = await CreateTransaction.execute({ title, type, value, category });

  return response.status(200).json(newTransaction)


});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
