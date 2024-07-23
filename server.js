const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
dotenv.config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/database');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connector
connectDB();

// user routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use('/', (req, res) => {
  res.send('Server is running');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
