const express = require('express');
const bodyParser = require('body-parser');
const nodeCron = require('node-cron');  // Import node-cron
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const orders = require('./data/orders');  // Access orders data

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);

// CRON job to automatically update order status every 10 seconds (for example)
nodeCron.schedule('*/10 * * * * *', () => {
  orders.forEach(order => {
    if (order.status === 'Preparing') {
      order.status = 'Out for Delivery';  // Transition from Preparing to Out for Delivery
    } else if (order.status === 'Out for Delivery') {
      order.status = 'Delivered';  // Transition from Out for Delivery to Delivered
    }
  });
  console.log('Order statuses updated');
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Food Delivery Backend!',
    routes: {
      menu: '/menu',
      orders: '/orders'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
