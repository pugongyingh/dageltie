const https = require("https");
const url = require("url");

exports.handler = (event, context, callback) => {
  const { identity } = context.clientContext;
  const usersUrl = `${identity.url}/admin/users`;
  const adminAuthHeader = "Bearer " + identity.token;
  const parsedUrl = url.parse(usersUrl);
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
      data += chunk;
    });
    response.on("end", () => {
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
      callback(null, {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        body: error.message
      });
    });
  });
}
