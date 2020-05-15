import express from 'express'

const app = express();

//Routes
import IndexRoutes from './routes/index.routes' 
import TaskRoutes from './routes/tasks.routes'
import cors from 'cors'

//Settings
app.set('port', process.env.PORT || 9000);

//Middleware
app.use(express.json());

//Routes
app.use(IndexRoutes);
app.use('/tasks', TaskRoutes);

export default app;