module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'New user was created'
        },
        503: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'User mail tom.hanks@wolox.com.ar already exists',
                internal_code: 'invalid_params'
              }
            }
          }
        },
        422: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Password length is less than 8 characters',
                internal_code: 'invalid_params'
              }
            }
          }
        },
        500: {
          description: 'Database error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'first_name/last_name field is missing',
                internal_code: 'database_error'
              }
            }
          }
        }
      }
    }
  }
};
