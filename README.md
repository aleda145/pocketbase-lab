# Pocketbase lab

This is my repository for playing around with pocketbase and a react SPA as the frontend.

It also uses https://litestream.io/ to replicate the sqlite databases to Cloudflare R2.

Pocketbase is hosted on fly.io and the React app is hosted on Cloudflare Pages

Check it out at https://pocketbase-lab.pages.dev/

I am not very good at React, and just picked up last month. So if you think I'm doing
weird stuff and doing things "the React way", I would really appreciate feedback! Just raise in issue!

## Deploying yourself

### Frontend

If you want to try this out for yourself all the code I use is here.

For react follow this guide: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-application/

You need to set the build root directory to /frontend for it properly build the react app.

You need to set some environment variables in the settings after deploying it on cloudflare pages:

```
NODE_VERSION=16
REACT_APP_API_URL=https://pocketbase-alex.fly.dev/
```

### Backend

Deploying on fly.io is simple. Follow their guide

https://fly.io/docs/getting-started/dockerfile/

I am including my own fly.toml file here, but you would need to change the appname or generate one yourself :)

I am using a bucket on Cloudflare R2, which you can read about and sign up for here:

https://www.cloudflare.com/products/r2/

You need to set some environment variables for the litestream replication.

They are:

```
R2_BUCKET
R2_ACCESS_KEY
R2_SECRET_KEY
R2_DATA_PATH
R2_LOGS_PATH
R2_URL
```

Put them in a secrets.env file and run `fly secrets import < secrets.env` to set all of them at the same time.

## Help!

Feel free to create an issue if you need help! I can't promise fast response times though.
