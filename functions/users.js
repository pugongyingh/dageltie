const https = require("https");
const url = require("url");

exports.handler = (event, context, callback) => {
  const { identity, user } = context.clientContext;
  const responseHeaders = {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (user) {
    const functionUrl = url.parse(`${identity.url}/admin/users`);
    const requestOptions = {
      method: "GET",
      protocol: functionUrl.protocol,
      host: functionUrl.host,
      hostname: functionUrl.hostname,
      port: functionUrl.port,
      path: functionUrl.path,
      headers: {
        Authorization: `Bearer ${identity.token}`,
      }
    };
    https.get(requestOptions, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        callback(null, {
          statusCode: 200,
          headers: responseHeaders,
          body: data,
        });
      });
      response.on("error", (error) => {
        console.log("Error: " + error.message);
        callback(null, {
          statusCode: 400,
          headers: responseHeaders,
          body: error.message,
        });
      });
    });  
  } else {
    callback(null, {
      statusCode: 400,
      headers: responseHeaders,
      body: "Please login first."
    });
  }
}
