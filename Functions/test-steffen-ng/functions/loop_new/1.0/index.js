/* eslint-disable no-await-in-loop */
const loop = async ({ jsondb_length }, steps) => {
  for (let index = 0; index < jsondb_length; index += 1) {
    await steps({ iterator: index, index });
  }
};

export default loop;
