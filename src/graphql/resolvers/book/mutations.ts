import { Book } from "../../../../db/models";

const bookMutations = {
  createBook: async (_: any, { book }: any, { loaders }: any) => {
    const newBook = new Book(book);

    const savedBook = await newBook.save();

    return loaders.book.one(savedBook._id);
  },
  updateBook: async (_: any, { id, book }: any, { loaders }: any) => {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        $set: { ...book },
      },
      { new: true }
    );

    return loaders.book.one(id);
  },
};

export default bookMutations;
