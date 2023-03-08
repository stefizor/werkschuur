const defaultName = async ({ supplied, left, right }) => {
  if (supplied !== "") {
    return {
      result: supplied,
    };
  }
  const composed = `${left} - ${right}`;
  return {
    result: composed,
  };
};

export default defaultName;
