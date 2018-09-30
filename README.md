# dageltie

[x] Static Site 
[x] Custom Elements
[x] No Build Step
[x] Netlify Identity
[x] Netlify Functions
[ ] Netlify Forms


# Local Development

Start the local development server with `npm start`.

This will start a custom server defined in `server.js` which will serve your `public` files and Netlify `functions`.

Urls that end in `/` will get `index.html` added to the end of them.

Files in the `public` folder will be served at `/`.

Functions in the `functions` directory will be called and the response will be served at `/.netlify/functions/${functionName}`.


## Environment Variables

Netlify Functions can use Environment Variables on the current running process via `process.env`.
`dotenv` is used to define Environment Variables for local development.
Create a `.env` file with your Environment Variables for local development.