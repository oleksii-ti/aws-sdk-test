import { LambdaRequest } from '../src/lambda/lambdaRequest'
import { S3Request } from '../src/s3/s3Request'

describe('Lambda to S3', () => {
  let lambda: LambdaRequest
  let s3: S3Request
  const testFileName = 'filename.txt'
  const bucketName = process.env.BUCKET_NAME!
  const config = {
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
  const functionName = process.env.AWS_LAMBDA_S3_FUNCTION!

  beforeAll(async () => {
    lambda = new LambdaRequest(config)
    s3 = new S3Request(config)
  })

  beforeEach(async () => {
    await s3.deleteAllFilesFromBucket(bucketName)
  })

  it('should write "Hello world" to S3 file successfully', async () => {
    const params = {
      FunctionName: functionName,
    }
    const response = await lambda.invoke(params)
    const s3Files = await s3.getAllFilesInBucket(bucketName)
    const fileContent = await s3.getFileContent(bucketName, testFileName)

    expect(response.StatusCode).toBe(200)
    expect(s3Files).toEqual([testFileName])
    expect(fileContent).toEqual('Hello World')
  })

  it(`should not create more than one ${testFileName} for several lambda calls`, async () => {
    const params = {
      FunctionName: functionName,
    }
    await lambda.invoke(params)
    await lambda.invoke(params)
    const s3Files = await s3.getAllFilesInBucket(bucketName)
    const fileContent = await s3.getFileContent(bucketName, testFileName)

    expect(s3Files).toEqual([testFileName])
    expect(fileContent).toEqual('Hello World')
  })

  it(`should replace text in the ${testFileName} if it's already exists`, async () => {
    await s3.createFile(bucketName, 'filename.txt', 'Test text')

    const params = {
      FunctionName: functionName,
    }
    await lambda.invoke(params)
    await lambda.invoke(params)
    const s3Files = await s3.getAllFilesInBucket(bucketName)
    const fileContent = await s3.getFileContent(bucketName, testFileName)

    expect(s3Files).toEqual([testFileName])
    expect(fileContent).toEqual('Hello World')
  })
})
