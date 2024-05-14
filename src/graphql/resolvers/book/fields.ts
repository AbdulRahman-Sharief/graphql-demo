const bookFields = {
  Book: {
    author: async (book: { author: any }, _: any, { loaders }: any) =>
      loaders.author.one(book.author),
  },
};
export default bookFields;
