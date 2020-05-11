module.exports = {
  userId: {
    type: 'integer',
    example: 7
  },
  firstName: {
    type: 'string',
    example: 'tom'
  },
  lastName: {
    type: 'string',
    example: 'hanks'
  },
  mail: {
    type: 'string',
    example: 'tom.hanks@wolox.com.ar'
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/userId'
      },
      username: {
        $ref: '#/components/schemas/username'
      },
      email: {
        $ref: '#/components/schemas/userEmail'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
