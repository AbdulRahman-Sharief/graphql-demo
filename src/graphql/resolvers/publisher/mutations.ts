import { Publisher } from "../../../../db/models";

const publisherMutations = {
  createPublisher: async (_: any, { publisher }: any, { loaders }: any) => {
    const newPublisher = new Publisher(publisher);

    const savedPublisher = await newPublisher.save();

    return loaders.publisher.one(savedPublisher._id);
  },
  updatePublisher: async (_: any, { id, publisher }: any, { loaders }: any) => {
    const updatedPublisher = await Publisher.findByIdAndUpdate(
      id,
      {
        $set: { ...publisher },
      },
      { new: true }
    );

    return loaders.publisher.one(id);
  },
};

export default publisherMutations;
