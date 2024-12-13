import bcrypt from 'bcrypt'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
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



// chắc cần phải thêm trường cart cho tk này sau đó gen lại từ đầu bộ dữ liệu mới 
export default users