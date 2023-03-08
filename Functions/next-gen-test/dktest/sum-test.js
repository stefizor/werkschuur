const sumTest = function (collection, property) {
  const { data } = collection;
  if (data.length === 0) {
    let errorMessage =
      "SUM function: You calculated the sum for an empty collection.";
    console.warn(errorMessage);
    return 0;
  }

  if (property in collection.data[0] === false) {
    let errorMessage = `The model in this collection does not have property: "${property}".`;
    console.log(errorMessage);
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

  // for (let index = 0; index < data.length; index++) {
  //   let item = data[index];
  //   let age = item[property];
  //   total += age;
  // }

  return total;
};

let t0 = {
  data: [
    { name: "Daley", age: 34 },
    { name: "Frenkie", age: 28 },
    { name: "Brian", age: 21 },
  ],
};

let t1 = { data: [] };

let t2 = {
  data: [
    {
      createdAt: "2022-11-01T12:45:44Z",
      dateOfBirth: "1938-12-01",
      firstName: "John",
      fullName: "John Law",
      id: 2,
      lastName: "Law",
      updatedAt: "2022-11-01T12:45:44Z",
    },
    {
      createdAt: "2022-11-01T15:17:20Z",
      dateOfBirth: "1971-07-13",
      firstName: "Nick",
      fullName: "Nick Leeson",
      id: 3,
      lastName: "Leeson",
      updatedAt: "2022-11-01T15:17:20Z",
    },
    {
      createdAt: "2022-11-01T15:21:40Z",
      dateOfBirth: "1976-01-11",
      firstName: "Jerome",
      fullName: "Jerome Kerviel",
      id: 4,
      lastName: "Kerviel",
      updatedAt: "2022-11-01T15:21:40Z",
    },
    {
      createdAt: "2022-11-01T15:27:34Z",
      dateOfBirth: "1947-02-08",
      firstName: "Charles",
      fullName: "Charles Ponzi",
      id: 5,
      lastName: "Ponzi",
      updatedAt: "2022-11-01T15:27:34Z",
    },
  ],
};

t3 = {
  data: [
    {
      age: 92,
      createdAt: "2022-11-02T11:29:49Z",
      dateOfBirth: "1930-01-01",
      firstName: "Donald",
      fullName: "Donald Duck",
      id: 10,
      lastName: "Duck",
      updatedAt: "2022-11-02T11:29:49Z",
    },
  ],
};

console.log(sumTest(t0, "age"));
console.log(sumTest(t1, "age"));
// console.log(sumTest(t2, "age"));
console.log(sumTest(t3, "age"));
