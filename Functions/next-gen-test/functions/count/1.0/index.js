const count = async ({ collection }) => {
  const counter = collection.data.length;
  return {
    result: counter,
  };
};

export default count;
