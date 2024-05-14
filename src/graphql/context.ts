import DataLoader from "dataloader";
import { Author, Book, Publisher } from "../../db/models";

const createLoader = (Model: {
  find: (arg0: { _id: { $in: readonly unknown[] } }) => any;
}) => {
  const loader = new DataLoader(async (keys) => {
    const data = await Model.find({ _id: { $in: keys } });

    // DataLoaders depends on the order of the input to return the result
    // So, it is needed to map results in order to create a correct output
    const dataMap = data.reduce(
      (acc: { [x: string]: any }, curr: { _id: string | number }) => {
        acc[curr._id] = curr;
        return acc;
      },
      {}
    );

    return keys.map((id: any) => dataMap[id]);
  });

  return {
    one: async (id: { toString: () => unknown }) => loader.load(id.toString()),
    many: async (ids: any[]) =>
      loader.loadMany(ids.map((id: { toString: () => any }) => id.toString())),
  };
};

const context = async () => {
  const loaders = {
    author: createLoader(Author),
    book: createLoader(Book),
    publisher: createLoader(Publisher),
  };

  return { loaders };
};

export default context;
