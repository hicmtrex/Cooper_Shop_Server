import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_CODE, {
    expiresIn: '30d',
  });
};

export default generateToken;
