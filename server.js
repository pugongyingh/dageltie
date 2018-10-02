require("dotenv").config();

const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const TOML = require("@iarna/toml");
const NETLIFY = TOML.parse(fs.readFileSync("netlify.toml"));

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
  console.log("request", request.method, request.url);

  if (request.url.startsWith("/.netlify/functions/")) {
    handleFunctions(request, response);
  } else {
    handlePublish(request, response);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function handleFunctions(request, response) {
  const pathname = url.parse(request.url).pathname;
  const pathnameParts = pathname.split("/");
  const functionName = pathnameParts[pathnameParts.length - 1];
  const module = path.join(process.cwd(), NETLIFY.build.functions, functionName);
  let handler;
  try {
    handler = require(module);
  } catch (error) {
    response.statusCode = 500;
    response.write("Function invocation failed: " + error.toString());
    response.end();
    console.log("Error during invocation: ", error);
    return;
  }

  const lambdaRequest = {
    path: request.path,
    httpMethod: request.method,
    queryStringParameters: request.query,
    headers: request.headers,
    body: request.body,
  };

  const callback = (error, lambdaResponse) => {
    if (error) {
      response.statusCode = 500;
      response.write("Function invocation failed: " + error.toString());
      response.end();
      console.log("Error during invocation: ", error);
      return;  
    } else {
      response.statusCode = lambdaResponse.statusCode;
      for (const key in lambdaResponse.headers) {
        response.setHeader(key, lambdaResponse.headers[key]);
      }
      response.write(lambdaResponse.body);
      response.end();
      return;
    }
  }

  const context = {
    clientContext: {
      identity: {
        url: "",
        token: ""
      },
      user: {
        
      }
    }
  };
  const promise = handler.handler(lambdaRequest, context, callback);
  if (!promise) { return; }
  if (typeof promise.then !== "function") { return; }
  if (typeof callback !== "function") { return; }
  promise.then(
    (data) => { return callback(null, data); },
    (error) => { return callback(error, null); }
  );
}

function handlePublish(request, response) {
  let filename = path.join(NETLIFY.build.publish, url.parse(request.url).pathname);

  if (filename.endsWith("/")) {
    filename += "index.html";
  }

  if (filename.endsWith(".html")) {
    response.setHeader("Content-Type", "text/html");
  } else if (filename.endsWith(".js")) {
    response.setHeader("Content-Type", "application/javascript");
  } else if (filename.endsWith(".ico")) {
    response.setHeader("Content-Type", "image/x-icon");
  }

  fs.exists(filename, function (exist) {
    if (exist) {
      fs.readFile(filename, function(error, data) {
        if (error) {
          response.statusCode = 500;
          response.end(`Error getting the file: ${error}.`);
        } else {
          response.statusCode = 200;
          response.end(data);
        }
      });
    } else {
      response.statusCode = 404;
      response.end(`File ${filename} not found!`);
    }
    return;
  });
}
