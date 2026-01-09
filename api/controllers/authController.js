const AuthService = require('../services/authSevice');

const authService = new AuthService();

class authController {
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const login = await authService.login({ email, senha });

      return res.status(200).send(login);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
}

module.exports = authController;
