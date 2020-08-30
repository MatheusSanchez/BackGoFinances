import { In, getCustomRepository, getRepository } from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

interface CSVtransactions {
  title: string;
  type: 'outcome' | 'income';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    // creating file in folder tmp
    const readStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      // creating parser from csv
      delimiter: ',',
      from_line: 2, // getting just the data of file (without header)
    });

    const transactions: CSVtransactions[] = [];
    const categories: string[] = [];

    const parseCSV = readStream.pipe(parsers);

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      ); // pull of spaces on line

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const categoriesRepo = getRepository(Category);

    // searching in db for categories that we get on fileCSV
    const existentCategories = await categoriesRepo.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitles = existentCategories.map(
      (category: Category) => category.title,
    ); // getting just the title
    const addCategories = categories
      .filter(category => !existentCategoriesTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index); // getting categories that we'll create in db

    // saving in db new categories
    const newCategories = categoriesRepo.create(
      addCategories.map(title => ({
        title,
      })),
    );

    await categoriesRepo.save(newCategories);

    const finalCategories = [...newCategories, ...existentCategories];

    const trasactionRepo = getCustomRepository(TransactionRepository);

    const createTransactions = trasactionRepo.create(
      transactions.map(t => ({
        title: t.title,
        type: t.type,
        value: t.value,
        category: finalCategories.find(c => c.title === t.category),
      })),
    );

    await trasactionRepo.save(createTransactions);

    await fs.promises.unlink(filePath);

    return createTransactions;
    // TODO
  }
}

export default ImportTransactionsService;
