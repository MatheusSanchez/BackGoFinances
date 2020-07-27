import { Router } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // TODO
});

transactionsRouter.post('/', async (request, response) => {
  try {

    const { title, type, value, category_id } = request.body;

    const CreateTransaction = new CreateTransactionService();
    const newTransaction = await CreateTransaction.execute({ title, type, value, category_id });

    return response.status(200).json(newTransaction)

  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
