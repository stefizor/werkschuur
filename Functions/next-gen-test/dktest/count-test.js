const countTest = function (collection) {
  return collection.data.length;
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

console.log(countTest(t0));
console.log(countTest(t1));
console.log(countTest(t2));
console.log(countTest(t3));
