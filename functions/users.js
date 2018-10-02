const https = require("https");
const url = require("url");

exports.handler = (event, context, callback) => {
  console.log("event", event);
  console.log("context", context);
  console.log("context.clientContext", context.clientContext);
  const { identity, user } = context.clientContext;
  console.log("identity", identity);
  console.log("user", user);
  const usersUrl = `${identity.url}/admin/users`;
  const adminAuthHeader = "Bearer " + identity.token;
  console.log("usersUrl", usersUrl);
  console.log("adminAuthHeader", adminAuthHeader);
  console.log("url.parse(usersUrl)", url.parse(usersUrl));

  https.get("https://www.google.com/", (response) => {
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