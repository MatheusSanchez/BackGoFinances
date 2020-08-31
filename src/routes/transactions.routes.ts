import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import uploadConfig from '../config/upload';
import ImportTransactionsService from '../services/ImportTransactionsService';

const upload = multer(uploadConfig);
const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRep = getCustomRepository(TransactionsRepository);
  const transactions = await transactionRep.find();
  const balance = await transactionRep.getBalance();
  // console.log(transactions);

  return response.status(200).json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;

  const CreateTransaction = new CreateTransactionService();
  const newTransaction = await CreateTransaction.execute({
    title,
    type,
    value,
    category,
  });

  return response.status(200).json(newTransaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const DeleteTransaction = new DeleteTransactionService();
  await DeleteTransaction.execute(id);

  return response.status(204).send();
  // TODO
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactions = new ImportTransactionsService();
    const transactions = await importTransactions.execute(request.file.path);

    return response.status(200).json(transactions);
    // TODO
  },
);

export default transactionsRouter;
