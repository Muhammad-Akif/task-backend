const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userControllers')
const protect = require('../middleware/authMiddleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of user
 *         email:
 *           type: string
 *           description: user email
 *       example:
 *         name: Muhammad Akif
 *         email: muhammadakif2917@gmail.com
 */

 /**
  * @swagger
  * tags:
  *   name: User Api's
  *   description: All user related api's
  */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Returns the list of all the Users
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       description: an authorization header
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router