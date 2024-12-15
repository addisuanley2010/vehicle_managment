import jwt from 'jsonwebtoken';
export const generateToken = (user: any): string => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      user_name: user.user_name,
      full_name: user.full_name,
      verified: user.verified,
      role: user.role,
      gender: user.gender,
      phone: user.phone,
      address: user.address,
      qualification: user.qualification,
    },
    secret,
    { expiresIn: '1h' }
  );
};
