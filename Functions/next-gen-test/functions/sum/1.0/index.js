const sum = async ({ collection, property }) => {
  const { data } = collection;

  if (data.length === 0) {
    let warningMessage =
      "SUM function: You calculated the sum for an empty collection.";
    console.warn(warningMessage);
    return {
      result: 0,
    };
  }

  if (property in data[0] === false) {
    let errorMessage = `SUM function: The model in this collection does not have property: ${property}.`;
    console.error(errorMessage);
    throw Error(errorMessage);
  }

  if (typeof data[0][property] !== "number") {
    let errorMessage = `SUM function: The property you selected (${property}) is not of type number.`;
    console.error(errorMessage);
    throw Error(errorMessage);
  }

  let total = 0;
  for (let record of data) {
    total += record[property];
  }

  return {
    result: total,
  };
};

export default sum;
