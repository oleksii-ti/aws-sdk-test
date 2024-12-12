import { Lambda } from 'aws-sdk'
import { AWSConfig } from '../types/awsConfig'

export class LambdaRequest {
  private lambda: AWS.Lambda

  constructor(config: AWSConfig) {
    this.lambda = new Lambda(config)
  }

  async invoke(params: AWS.Lambda.InvocationRequest): Promise<AWS.Lambda.InvocationResponse> {
    try {
      const data = await this.lambda.invoke(params).promise()
      return data
    } catch (err) {
      throw err
    }
  }
}
