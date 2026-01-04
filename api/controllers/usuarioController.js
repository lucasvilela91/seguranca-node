const UsuarioService = require('../services/usuarioService');

const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async buscarTodosUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.buscarTodosUsuarios();

      res.status(200).send(usuarios);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async buscarUsuarioPorId(req, res) {
    const { id } = req.params;

    try {
      const usuario = await usuarioService.buscarUsuarioPorId(id);

      res.status(200).send(usuario);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async editarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
      const usuario = await usuarioService.editarUsuario(id, {
        nome,
        email,
        senha,
      });

      res.status(200).send(usuario);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async deletarUsuario(req, res) {
    const { id } = req.params;

    try {
      const resultado = await usuarioService.deletarUsuario(id);

      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = UsuarioController;
