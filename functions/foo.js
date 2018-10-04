let contentful = null;
try {
  contentful = require("contentful");
} catch (error) {
  contentful = error;
}

exports.handler = function(event, context, callback) {
  console.log("contentful typeof", typeof contentful);
  console.log("contentful", contentful);
  const statusCode = 200;
  const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  callback(null, {
    statusCode,
    headers,
    body: `foo: ${process.env.LAMBDA_ENDPOINT}`
  });
}