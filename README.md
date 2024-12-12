## AWS Sample apps test framework

This is samle of test automation framework for testing the following applications:

- [API Gateway REST API with Lambda authorizer](https://serverlessland.com/patterns/apigw-lambda-authorizer-sam-nodejs)
Testing for this app is done by [Axios](https://github.com/axios/axios) library


- [Lambda to S3](https://serverlessland.com/patterns/lambda-s3)
Testing for this app is done by [aws-sdk](https://github.com/aws/aws-sdk-js) library


## Setup

- Install [Node.js](https://nodejs.org/en/download/) v20.*
- Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) v.1.22 or newer 

## Install dependencies

```
  yarn install
```

## Setup local Environment variable
Copy ./.exmple.env as .test.env and fill yout own aws credentials, api endpoint and lambda function name

## Run tests

-   Run all tests:

```
  yarn run aws:test
```
-   Run specific tests:

```
  yarn run aws:test {fileName1} {fileName2}
```
   where {fileName1} is a name of the file in ./tests folder
