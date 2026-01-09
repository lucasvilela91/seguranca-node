const database = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { secret } = require('../config/jsonSecret');

class authService {
  async login(dto) {
    const usuario = await database.usuarios.findOne({
      attributes: ['id', 'email', 'senha'],
      where: { email: dto.email },
    });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaIguais = await compare(dto.senha, usuario.senha);
    if (!senhaIguais) {
      throw new Error('Senha inválida');
    }

    const accessToken = sign({
      id: usuario.id,
      email: usuario.email,
      
    }, secret, { 
      expiresIn: 86400 
    });
    return { accessToken };

  }
}

module.exports = authService;
