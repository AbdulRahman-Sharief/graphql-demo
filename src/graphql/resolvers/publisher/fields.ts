import { Author, WorksAt } from "../../../../db/models";

const publisherFields = {
  Publisher: {
    authors: async (publisher: { id: any }, _: any, { loaders }: any) => {
      const worksAt = await WorksAt.find({ publisher: publisher.id });

      return loaders.author.many(worksAt.map(({ author }) => author));
    },
  },
};
export default publisherFields;
