import camelCase from "lodash/camelCase";

const sapdata = async ({ name, params }) => {
  // interpret parameters
  const prefixlessName = name.replace("all", "");
  const select = params["select"];
  const info = params["data_source_info"];
  const filters = params['conditions'][0]['filters']
  const url =
    info.source.host +
    info.model.meta_info.methods[0].endpoint;


  const auth = info.source.api_key.split(':')
  const appID = auth[0];
  const appKey = auth[1];
  const VendorNumber = filters.find((obj) => {
    return obj.field === "id"
  }).value.toString();//auth[2];
  const username = auth[3];
  const password = auth[4];
  
// setup body & headers
  const prebody = {
    "username": username,
    "password": password
  };
  if (name == "allVendor"){
    prebody.VendorNumber = VendorNumber;
  }else if (name == "allInvoice"){
    prebody.Vendor = VendorNumber;
  }else{
    console.log("name didnt match")
    throw new Error();
  }
  
  const reqbody = JSON.stringify(prebody);
  
  const reqheaders = {
    "app_key": appKey,
    "app_id": appID,
    "Content-Type": "application/json",
  };

// do api call
  const response = await fetch(url, {
    method: "POST",
    headers: reqheaders,
    body: reqbody
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

// format results
  const results = response.rows.map((object) => {
    const record = Object.keys(object).reduce(
      (o, k) => {
        o[camelCase(k)] = object[k];
        return o;
      },
      {
        id: parseInt(object["INVOICE"]),
        // createdAt: (new Date(Date.now())).toISOString(),
        // updatedAt: (new Date(Date.now())).toISOString(),
      }
    );
    return record
  });




  return {
    response: {
      results: results,
      totalCount: parseInt(results.length),
    },
  };
};

export default sapdata;
