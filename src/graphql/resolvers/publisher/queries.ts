import { Publisher } from "../../../../db/models";

const publisherQueries = {
  publishers: async (
    _: any,
    { params = { page: 1, pageSize: 20 } }: any,
    { loaders }: any
  ) => {
    const { pageSize, page } = params;

    return {
      results: async () => {
        const publishers = await Publisher.find()
          .skip(pageSize * (page - 1))
          .limit(pageSize);

        return loaders.publisher.many(publishers.map(({ id }) => id));
      },
      info: async () => {
        const count = await Publisher.countDocuments();

        const pages = Math.ceil(count / pageSize);
        const prev = page > 1 ? page - 1 : null;
        const next = page < pages ? page + 1 : null;

        return {
          count,
          pages,
          prev,
          next,
        };
      },
    };
  },
  publisher: async (_: any, { id }: any, { loaders }: any) =>
    loaders.publisher.one(id),
};

export default publisherQueries;
