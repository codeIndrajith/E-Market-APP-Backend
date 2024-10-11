const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const bitRoutes = require('./routes/bitRoutes');
const winProductRoutes = require('./routes/winProductRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
dotenv.config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/database');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connector
connectDB();

// user routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bits', bitRoutes);
app.use('/api/winProduct', winProductRoutes);
app.use('/api/checkout', checkoutRoutes);

// app.use('/', (req, res) => {
//   res.send('Server is running');
// });

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
