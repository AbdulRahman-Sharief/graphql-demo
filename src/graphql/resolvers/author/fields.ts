import { Publisher, WorksAt } from "../../../../db/models";

const authorFields = {
  Author: {
    publishers: async (author: any, _: any, { loaders }: any) => {
      const worksAt = await WorksAt.find({ author: author.id });

      return loaders.publisher.many(worksAt.map(({ publisher }) => publisher));
    },
  },
};
export default authorFields;
