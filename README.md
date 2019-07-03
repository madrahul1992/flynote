# Flynote
Express server to evaluate bodmas expression 

## Dependencies
 1. `Mongo Db`
 2. `Redis`
 
To start application run below commands:

1. `npm install`
2. `npm start`


**Endpoint:**

`POST: http://localhost:3000/exp/`

`{`
    `expression: "((2 + 1 * (4 - 2) - 15 / 5))"`
`}`

Result:

`{ answer: 1}`


Tests:

`npm run test`