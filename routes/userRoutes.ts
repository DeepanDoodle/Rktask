import * as express from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', async (req:express.Request, res:express.Response) => {
  try {
    await createUser(req, res);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req:express.Request, res:express.Response) => {
  try {
    await getAllUsers(req, res);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req:express.Request, res:express.Response) => {
  try {
    await getUserById(req, res);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req:express.Request, res:express.Response) => {
  try {
    await updateUser(req, res);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req:express.Request, res:express.Response) => {
  try {
    await deleteUser(req, res);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
