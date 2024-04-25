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

      const jwtSecret = process.env.JWT_SECRET

      // Signs a new JWT for the user
      const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
        expiresIn: '168h',
      });

      // Sets the JWT as a secure, HTTP-only cookie
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=604800;`);

      console.log(`token: ${token}`)

      res.status(200).json({ username: user.username, name: user.name });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // If any other HTTP method is used, sets the allowed method in the header and sends a 405 error
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}