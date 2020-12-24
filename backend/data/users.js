import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Bulkart Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isVendor: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users