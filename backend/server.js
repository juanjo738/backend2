const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
