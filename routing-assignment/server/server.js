const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());

app.get('/api/auth/verify', (req, res) => {
   const isAuthenticated = req.cookies.isAuthenticated === 'valid-token';
   res.json({ isAuthenticated });
});

app.post('/api/auth/login', (req, res) => {
    const isAuthenticated = true; 
  
    res.cookie('isAuthenticated', 'true', {
      httpOnly: true,
      secure: false, 
      sameSite: 'strict', 
    });
  
    res.json({ message: 'Login successful' });
  });
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: 'Logged out successfully' });
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

