# Vending machine demo

---

# Pre-requisites:

```
Node.js
Mongodb
```

## Libraries used:

    - Express as server middleware
    - Mongoose as Mongo ODM
    - Bunyan as logger

## Directory structure

    - commons for common and helper functions
    - config for storing all the configurations files and values.
    - log for maintaining log files
    - services for maintaining various service calls
    - test for storing all the test cases

## Instructions for setting-up using this boilerplate

    - Clone/Fork this project.
    - Copy .env.example to .env and store the configurations.
    - Install node dependencies

>     	npm install

    - Setup git remote to point to your repo
    - For migrations: use `node src/db/seeder.js` command

    - Via Docker: use `docker-compose` command. Note that it uses env file so make sure the env file is properly setup (Check env.example for instructions)

## How-to

Check postman collection to understand apis.
Check stateDefinition file to get basic state definition info.

Since this project uses state-machine approach, the function expects proper state information which is to be sent in parameters. Send the response body for one state as request body for another state. (Format given in the postman collection)


---

### Run Project

> Dev mode : npm run dev

> Test: npm run test

> Run lint: npm run lint

> Run formatter: npm run format

### Configure project

- nodemon.json for making changes to app watch mode
- .eslinrc.js file to change linter rules
- .prettierrc file for configuring styling rules
- package.json for configuring project related scripts
