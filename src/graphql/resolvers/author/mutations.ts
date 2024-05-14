import { Author, WorksAt } from "../../../../db/models";

const authorMutations = {
  createAuthor: async (_: any, { author }: any) => {
    const newAuthor = new Author(author);

    const savedAuthor = await newAuthor.save();
    return savedAuthor;
  },
  updateAuthor: async (_: any, { id, author }: any, { loaders }: any) => {
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        $set: { ...author },
      },
      { new: true }
    );

    return loaders.author.one(id);
  },
  addAuthorToPublisher: async (
    _: any,
    { id, publisher }: any,
    { loaders }: any
  ) => {
    const author = await Author.findById(id);

    if (author) {
      const newWorksAt = new WorksAt({ publisher, author: id });
      await newWorksAt.save();
    }

    return loaders.author.one(id);
  },
};

export default authorMutations;
