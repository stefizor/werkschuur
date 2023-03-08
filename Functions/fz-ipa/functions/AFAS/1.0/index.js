import camelCase from "lodash/camelCase";

var debug = 0;
console.log("Step: "+debug);
debug = debug + 1;


const sapdata = async ({ name, params, collection }) => {
  const prefixlessName = name.replace("all", "");
  const select = params["select"];
  const info = params["data_source_info"];
  const filters = params['conditions'];//[0]['filters']
  const url =
    info.source.host +
    info.model.meta_info.methods[0].endpoint;

  const token = info.source.api_key;

  const skiptake = "?skip=0&take=10";
  var fieldnames = "&filterfieldids="
  var employeeids = "&filtervalues="
  var order = "&orderbyfieldids=StartDate"
  console.log(collection);

  for (let user in collection.data){
    console.log("User: ",user);
    
    fieldnames = fieldnames + "EmployeeId;";
    employeeids = employeeids  + collection.data[user].employeeid.toString()+ ";";
  }

  const reqfilter = skiptake + fieldnames + employeeids + order;


  const fullurl = url + reqfilter;

  console.log("Step: "+debug);
  debug = debug + 1;
 
  const reqheaders = {
    "Authorization": "AfasToken " + token,
    "Content-Type": "application/json",
  };

  console.log("Step: "+debug);
  debug = debug + 1;
  console.log(reqfilter);
  console.log(fullurl,"---",token);
  console.log(reqheaders);
  console.log("method: ",info.model.meta_info.methods[0].method)

  const response = await fetch(fullurl, {
    method: info.model.meta_info.methods[0].method,
    headers: reqheaders,
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response.status,response.statusText,response.body,response);
        throw new Error(); 
      }
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });

  console.log("Step: "+debug);
  debug = debug + 1;
  console.log("Response: ");
  console.log(response);

  
  const results = response.rows.map((object) => {
    const record = Object.keys(object).reduce(
      (o, k) => {
        o[camelCase(k)] = object[k];
        return o;
      },
      {
        id: parseInt(object["LeaveId"]),
        // createdAt: (new Date(Date.now())).toISOString(),
        // updatedAt: (new Date(Date.now())).toISOString(),
      }
    );
    return record
  });


  console.log("Step: "+debug);
  debug = debug + 1;
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

  

  console.log("Results: ")
  console.log(results)


  return {
    response: {
      results: results,
      totalCount: parseInt(results.length),
    },
  };
};

export default sapdata;