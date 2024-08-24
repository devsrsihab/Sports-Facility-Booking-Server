import express from 'express';
import { ViewerController } from './viewer.controller';

const router = express.Router();

router.get('/', ViewerController.getViewer);
router.get('/:id', ViewerController.getSingleViewer);
router.patch('/:siewerId', ViewerController.updateViewer);
router.delete('/:id', ViewerController.deleteViewer);

export const ViewerRoute = router;
