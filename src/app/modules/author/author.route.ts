import express from 'express';
import { AuthorController } from './author.controller';

const router = express.Router();

router.get('/', AuthorController.getAuthor);
router.get('/:email', AuthorController.getSingleAuthor);
router.patch('/:viewerId', AuthorController.updateAuthor);
router.delete('/:id', AuthorController.deleteAuthor);

export const AuthorRoute = router;
