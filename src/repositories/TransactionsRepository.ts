import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(transactionsList: Transaction[]): Balance {
    const incomeReducer = (acc: number, currentValue: Transaction, index: number, array: Transaction[]) => {
      if(array[index].type === 'income') {
        return acc + currentValue.value;
      }
      return acc;
    }

    const outcomeReducer = (acc: number, currentValue: Transaction, index: number, array: Transaction[]) => {
      if(array[index].type === 'outcome') {
        return acc + currentValue.value;
      }
      return acc;
    }

    const totalIncome = transactionsList.reduce(incomeReducer, 0);
    const totalOutcome = transactionsList.reduce(outcomeReducer, 0);

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: (totalIncome - totalOutcome)
    }

    return balance;

  }

  /**
   * Creates a new Transaction
   * @param title [string]: title of the transaction
   * @param value [number]: value of the transaction
   * @param type [string]: type of the operation ("income" or "outcome")
   */
  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
