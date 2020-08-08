// import AppError from '../errors/AppError';

import Category from '../models/Category';
import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'

interface RequestDTO {
    category: string;
}


class CreateCategoryService {
    public async execute({ category }: RequestDTO): Promise<Category> {

        //searching in db from the category
        const categoryRep = getRepository(Category);
        const categoryExists = await categoryRep.findOne({
            where: { "category_name": category }
        })


        // if we have this specific category, just retun. Else, creat it
        if (categoryExists) {
            return categoryExists;
        } else {
            const newCategory = categoryRep.create({
                "title": category
            })
            await categoryRep.save(newCategory);
            return newCategory;
        }

    }
}

export default CreateCategoryService;
