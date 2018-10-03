let TOML = null;
try {
  TOML = require("@iarna/toml");
} catch (error) {
  TOML = error;
}

exports.handler = function(event, context, callback) {  
  console.log("TOML type", typeof TOML);
  console.log("TOML keys", Object.keys(TOML));
  console.log("TOML.code", TOML.code);
  console.log("TOML.parse", TOML.parse);
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