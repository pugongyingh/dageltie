const https = require("https");
const url = require("url");

exports.handler = (event, context, callback) => {
  const { identity } = context.clientContext;
  console.log("identity", identity);
  const usersUrl = `${identity.url}/admin/users`;
  const adminAuthHeader = "Bearer " + identity.token;
  const parsedUrl = url.parse(usersUrl);
  console.log("usersUrl", usersUrl); // https://dangeltie.netlify.com/.netlify/identity/admin/users
  console.log("adminAuthHeader", adminAuthHeader); // Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mzg0NjA1NjksInN1YiI6IjAifQ.TBBrA-Bg8mpkwpI4cBPNrGgEuim7U87kfWZM6mOEBSc
  console.log("parsedUrl", parsedUrl);
  // Url {
  //   protocol: 'https:',
  //   slashes: true,
  //   auth: null,
  //   host: 'dangeltie.netlify.com',
  //   port: null,
  //   hostname: 'dangeltie.netlify.com',
  //   hash: null,
  //   search: null,
  //   query: null,
  //   pathname: '/.netlify/identity/admin/users',
  //   path: '/.netlify/identity/admin/users',
  //   href: 'https://dangeltie.netlify.com/.netlify/identity/admin/users' }

  const options = {
    method: "GET",
    protocol: parsedUrl.protocol,
    host: parsedUrl.host,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    headers: {
      Authorization: adminAuthHeader
    }
  };
  https.get(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      // console.log("data");
      data += chunk;
    });
    response.on("end", () => {
      // console.log("end");
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: data
      });
    });
    response.on("error", (error) => {
      console.log("Error: " + error.message);
    });
  });
}

// exports.handler = (event, context, callback) => {
//   console.log("event", event);
//   console.log("context", context);
//   console.log("context.clientContext", context.clientContext);
//   const { identity, user } = context.clientContext;
//   const usersUrl = `${identity.url}/admin/users`;
//   const adminAuthHeader = "Bearer " + identity.token;

//   return fetch(usersUrl, {
//     method: "GET",
//     headers: { Authorization: adminAuthHeader }
//   })
//   http.request(
//     usersUrl,
//     {
//       method: "GET",
//       headers: { Authorization: adminAuthHeader },
//     },
//   )
//     .then(responseonse => {
//       return responseonse.json();
//     })
//     .then(data => {
//       console.log("data", JSON.stringify(data));
//       return { statusCode: 204 };
//     })
//     .catch(e => {
//       return {
//         statusCode: 500,
//         body: "Internal Server Error: " + e
//       };
//     });
// };