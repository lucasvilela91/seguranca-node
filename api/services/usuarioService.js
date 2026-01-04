const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await database.usuarios.findOne({
      where: { email: dto.email },
    });

    if (usuario) {
      throw new Error('Usuário já existe');
    }

    try {
      const senhaHash = await hash(dto.senha, 8);

      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });

      return novoUsuario;
    } catch (error) {
      throw new Error('Erro ao cadastrar usuário: ' + error.message);
    }
  }

  async buscarTodosUsuarios() {
    try {
      const usuarios = await database.usuarios.findAll();
      return usuarios;
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error.message);
    }
  }

  async buscarUsuarioPorId(id) {
    try {
      const usuario = await database.usuarios.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message);
    }
  }

  async editarUsuario(id, dto) {
    try {
      const usuario = await database.usuarios.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }

      if (dto.email && dto.email !== usuario.email) {
        const usuarioExistente = await database.usuarios.findOne({
          where: { email: dto.email },
        });
        if (usuarioExistente) {
          throw new Error('Email já está em uso');
        }
      }

      const atualizacoes = {};
      if (dto.nome) atualizacoes.nome = dto.nome;
      if (dto.email) atualizacoes.email = dto.email;
      if (dto.senha) atualizacoes.senha = await hash(dto.senha, 8);

      await usuario.update(atualizacoes);
      return usuario;
    } catch (error) {
      throw new Error('Erro ao editar usuário: ' + error.message);
    }
  }

  async deletarUsuario(id) {
    try {
      const usuario = await database.usuarios.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      await usuario.destroy();
      return { mensagem: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
}

module.exports = UsuarioService;
