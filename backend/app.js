import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// routes
import userRoutes from './Routes/user.route.js'
import adminRoutes from './Routes/admin.route.js'
import cropsRoutes from './Routes/crops.route.js'



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(express.json());


app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/crops/',cropsRoutes);



app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});