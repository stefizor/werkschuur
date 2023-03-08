import camelCase from "lodash/camelCase";

const sapdata = async ({ name, params }) => {
  const prefixlessName = name.replace("all", "");
  const select = params["select"];
  const info = params["data_source_info"];
  const skip = params["skip"];
  const take = params["take"];

  const url =
    info.source.host +
    info.model.meta_info.odata_endpoint +
    "?$skip=" +
    skip +
    "&$top=" +
    take +
    "&$inlinecount=allpages";

  const apiKey = info.source.api_key;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      APIKey: apiKey,
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });

  const results = response.d.results.map((object) => {
    const record = Object.keys(object).reduce(
      (o, k) => {
        o[camelCase(k)] = object[k];
        return o;
      },
      {
        id: object[prefixlessName],
        createdAt: "2020-08-25T15:26:40+02:00",
        updatedAt: "2020-08-25T15:26:40+02:00",
      }
    );

    return select.reduce((o, k) => {
      o[k] = record.hasOwnProperty(k) ? record[k] : "";
      return o;
    }, {});
  });
  console.log(JSON.stringify(results));
  return {
    response: {
      results: results,
      totalCount: parseInt(response.length),
    },
  };
};

export default sapdata;