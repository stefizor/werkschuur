const age = async ({ dateOfBirthString }) => {
  const dateOfBirth = new Date(dateOfBirthString);
  const today = new Date();
  // using 365.25 days per year to account for leap years
  const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const age = Math.floor((today - dateOfBirth) / millisecondsPerYear);
  return {
    result: age,
  };
};

export default age;
