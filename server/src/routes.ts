import express from 'express';

import ClassesController from './controllers/ClassesController';

const routes = express.Router();
const classesControllers = new ClassesController();

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.createClass);
routes.get('/classes/total', classesControllers.getTotalClasses);

export default routes;
