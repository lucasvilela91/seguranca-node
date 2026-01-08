const database = require('../models');

class authService {
  async login(dto) {
    const usuario = await database.Usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: { email: dto.email },
    });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
  }
}

module.exports = authService;
