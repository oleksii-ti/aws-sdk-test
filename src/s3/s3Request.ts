import { S3 } from 'aws-sdk'
import { AWSConfig } from '../types/awsConfig'

export class S3Request {
  private s3: AWS.S3

  constructor(config: AWSConfig) {
    this.s3 = new S3(config)
  }

  async getAllFilesInBucket(bucketName: string): Promise<string[]> {
    const files: string[] = []
    const params = {
      Bucket: bucketName,
    }

    try {
      let data
      data = await this.s3.listObjectsV2(params).promise()
      if (data.Contents) {
        for (const obj of data.Contents) {
          files.push(obj.Key!)
        }
      }
      return files
    } catch (error) {
      throw `Error getting files from '${bucketName}' bucket: ${error}`
    }
  }

  async getFileContent(bucketName: string, fileName: string): Promise<string | null> {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    }
    try {
      const data = await this.s3.getObject(params).promise()

      if (data.Body) {
        return data.Body.toString()
      } else {
        return null
      }
    } catch (error) {
      throw `Failed to read '${fileName}' file from S3: ${error}`
    }
  }

  async deleteAllFilesFromBucket(bucketName: string): Promise<void> {
    try {
      const data = await this.s3.listObjectsV2({ Bucket: bucketName }).promise()

      if (data.Contents && data.Contents.length > 0) {
        const objectsToDelete = data.Contents.map((obj) => ({ Key: obj.Key! }))

        while (objectsToDelete.length > 0) {
          const batch = objectsToDelete.splice(0, 1000)
          await this.s3
            .deleteObjects({
              Bucket: bucketName,
              Delete: { Objects: batch },
            })
            .promise()
        }
      }
    } catch (error) {
      throw `Error deleting files from bucket: ${error}`
    }
  }

  async createFile(bucketName: string, fileName: string, fileContent: string): Promise<void> {
    try {
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
      }

      await this.s3.putObject(params).promise()
    } catch (error) {
      throw `Error creating file in S3: ${error}`
    }
  }
}
