require("dotenv").config();

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode,
    headers,
    body: `foo: ${process.env.LAMBDA_ENDPOINT}`
  });
}