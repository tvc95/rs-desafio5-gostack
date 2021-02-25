import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

/**
 * Essa rota deve retornar uma listagem com todas as transações que foram
 * cadastradas até agora, junto com o valor de soma de entradas, retiradas
 * e total de crédito.
 */
transactionRouter.get('/', (request, response) => {
  try {
    const transactionsList = transactionsRepository.all();
    const balance = transactionsRepository.getBalance(transactionsList);
    const output = {
      transactions: transactionsList,
      balance
    }

    return response.json(output);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

/**
 * A rota deve receber title, value e type dentro do corpo da requisição, sendo
 * type o tipo da transação, que deve ser income para entradas (depósitos) e
 * outcome para saídas (retiradas).
 */
transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(transactionsRepository);

    const transaction = createTransaction.execute({
      title,
      value,
      type
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
