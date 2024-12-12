import axios from 'axios'

describe('API Gateway REST API with Lambda authorizer', () => {
  const awsGatewayAPIEndpoint = process.env.AWS_GATEWAY_API_ENDPOINT!

  it('should return 200 OK if "authorizationToken" header value is "Bearer allow"', async () => {
    const response = await axios.get(awsGatewayAPIEndpoint, {
      headers: {
        authorizationToken: 'Bearer allow',
      },
    })
    expect(response.status).toBe(200)
  })

  it('should return 401 Forbidden if "authorizationToken" header is missing', async () => {
    const response = await axios.get(awsGatewayAPIEndpoint)
    expect(response.status).toBe(401)
  })

  it('should return 401 Forbidden if "authorizationToken" header value is empty', async () => {
    const response = await axios.get(awsGatewayAPIEndpoint, {
      headers: {
        authorizationToken: '',
      },
    })
    expect(response.status).toBe(401)
  })

  it('should return 401 Unauthorized if "authorizationToken" header value is "unauthorized"', async () => {
    const response = await axios.get(awsGatewayAPIEndpoint, {
      headers: {
        authorizationToken: 'unauthorized',
      },
    })
    expect(response.status).toBe(401)
  })

  it('should return 403 Forbidden if "authorizationToken" header value is "Bearer deny"', async () => {
    const response = await axios.get(awsGatewayAPIEndpoint, {
      headers: {
        authorizationToken: 'Bearer deny',
      },
    })
    expect(response.status).toBe(403)
  })

  it('should return 500 Internal Server Error for any other "authorizationToken" header value', async () => {
    const response = await axios.get(awsGatewayAPIEndpoint, {
      headers: {
        authorizationToken: 'Bearer deny Bearer allow',
      },
    })
    expect(response.status).toBe(500)
  })
})
