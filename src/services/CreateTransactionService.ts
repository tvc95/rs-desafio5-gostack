import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    const transactions = this.transactionsRepository.all();
    const totalBalance = this.transactionsRepository.getBalance(transactions);
    if (type !== 'income') {
      if (type !== 'outcome') {
        throw Error('Invalid operation');
      }
    }

    if(type === 'outcome' && value > totalBalance.total) {
      throw Error('Transação inválida: valor da transação maior que o saldo do usuário!');
    }

    const transaction = this.transactionsRepository.create({ title, value, type });
    return transaction;
  }
}

export default CreateTransactionService;
