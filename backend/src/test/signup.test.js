const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authController = require('../controllers/authController');

jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('authController', () => {
  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      // Arrange
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
      };
      const user = {
        _id: '123',
        save: jest.fn().mockResolvedValue()
      };
      User.mockReturnValue(user);
      jwt.sign.mockReturnValue('token');

      // Act
      await authController.signup(req, res);

      // Assert
      expect(user.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith({ _id: user._id }, 'secretkey');
      expect(res.json).toHaveBeenCalledWith({ message: 'User Created', token: 'token' });
    });

    it('should return a 500 error if an exception is thrown', async () => {
      // Arrange
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res)
      };
      const user = {
        _id: '123',
        save: jest.fn().mockRejectedValue(new Error('Test error'))
      };
      User.mockReturnValue(user);

      // Act
      await authController.signup(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});
