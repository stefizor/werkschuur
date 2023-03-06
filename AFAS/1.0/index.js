import camelCase from "lodash/camelCase";

const sapdata = async ({ name, params }) => {
  const prefixlessName = name.replace("all", "");
  const select = params["select"];
  const info = params["data_source_info"];
  const filters = params['conditions'][0]['filters']
  const url =
    info.source.host +
    info.model.meta_info.methods[0].endpoint;

  const token = info.source.api_key


 
  const reqheaders = {
    "Authorization": "AfasToken" + token,
    "Content-Type": "application/json",
  };

  // console.log(url)

  const response = await fetch(url, {
    method: info.model.meta_info.methods[0].method,
    headers: reqheaders,
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response.status,response.statusText);
        throw new Error(); 
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });

  // console.log("Response: ")
  // console.log(response)

  const results = response.rows.map((object) => {
    const record = Object.keys(object).reduce(
      (o, k) => {
        o[camelCase(k)] = object[k];
        return o;
      },
      {
        // id: parseInt(object["INVOICE"]),
        // createdAt: (new Date(Date.now())).toISOString(),
        // updatedAt: (new Date(Date.now())).toISOString(),
      }
    );
    return record
  });

  //vendorinfoblock
  // const results = [Object.keys(response).reduce(
  //   (o, k) => {
  //     o[camelCase(k)] = response[k];
  //     return o;
  //   },
  //   {
  //     id: response["Vendor Number"],
  //     createdAt: (new Date(Date.now())).toISOString(),
  //     updatedAt: (new Date(Date.now())).toISOString(),
  //   }
  // )];

  

  // console.log("Results: ")
  // console.log(results)



  return {
    response: {
      results: results,
      totalCount: parseInt(results.length),
    },
  };
};

export default sapdata;