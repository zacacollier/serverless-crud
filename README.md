# crud-service
good ol' blog-like restful CRUD API service

## setup
create a new Postgres instance in RDS, then clone the repo, run `yarn`, and add a `.env` file to your local project root and set the following:
```
PGHOST
PGUSER
PGPASSWORD
PGDATABASE
PGPORT
```

### vpc configuration

When you create your Postgres instance, make a note of the default security group assignment. You'll need it later in order for your Lambda to communicate with it properly.

For the time being, navigate to the VPC console and select **Security Groups**. From here, add a new **Inbound Rule** of type **PostgresQL (5432)** and pass in [your IP address](http://whatismyip.host/).

Then, use `psql` or a similar client to test your connection and create tables for `users` and `notes`, then test the different CRUD operations in `src/services`. A `run-local` babel-node testing / debug script is included in the `package.json` for convenience:
```
    "run-local": "cross-env DEBUG=notes:* babel-node",
```

