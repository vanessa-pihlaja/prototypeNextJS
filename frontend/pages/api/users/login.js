import dbConnect from '../../../src/utils/dbConnect';
import User from '../../../src/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }

      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) {
        return res.status(401).json({ error: 'invalid username or password' });
      }

      // Replace 'your_jwt_secret' with your actual secret key
      const token = jwt.sign({ id: user._id, username: user.username }, 'ba67b720d047a8c39ebe8c751167ccd7', {
        expiresIn: '1h', // Token expires in 1 hour
      });

      // Setting the JWT in an HTTP-only cookie
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=${60 * 60};`);

      res.status(200).json({ username: user.username, name: user.name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}