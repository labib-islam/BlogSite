# BlogSite [Frontend]

## Set up Development Server with Proxy

### Update **vite.config.js**

    export default defineConfig({
      plugins: [react()],
      server: {
        port: 3000,                           # Frontend Port
        proxy: {
          "/api": {
            target: "http://localhost:8800",  # Backend Server
            changeOrigin: true,
          },
        },
      },
    });

- Request that starts with `/api` will be redirected to the backend at `http://localhost:8800`

### Why use a proxy?

- **Avoid CORS issues:** If your backend (`localhost:8800`) has a different port than your frontend (`localhost:3000`), your browser may block requests due to **CORS (Cross-Origin Resource Sharing)**. This proxy makes the request look like it's coming from the same origin (`localhost:3000`).

- **Shorter API URLs:** You can use `/api/users` instead of `http://localhost:8800/api/users` in your frontend code.

## Packages

- react-router → `npm install react-router`
