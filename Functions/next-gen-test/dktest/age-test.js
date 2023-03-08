const ageTest = function (dataString) {
  const dateOfBirth = new Date(dataString);
  const today = new Date();
  // using 365.25 days per year to account for leap years
  const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
  return Math.floor((today - dateOfBirth) / millisecondsPerYear);
};

console.log(ageTest("2005-07-17"));
console.log(ageTest("2007-03-29"));
console.log(ageTest("2021-11-02"));
console.log(ageTest("2021-11-03"));
