const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONE = /^\d{10,11}$/;

export function validarTutor({ nome, email, telefone, senha }, editando) {
  if (!nome.trim() || !email.trim() || !telefone.trim()) {
    return 'Preencha todos os campos.';
  }

  if (!REGEX_EMAIL.test(email.trim())) {
    return 'Informe um e-mail válido.';
  }

  if (!REGEX_TELEFONE.test(telefone.trim())) {
    return 'O telefone deve conter 10 ou 11 números.';
  }

  if (!editando && !senha) {
    return 'Informe uma senha.';
  }

  if (senha && senha.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }

  return null;
}

export function validarCadastro(formulario) {
  const erro = validarTutor(formulario, false);

  if (erro) {
    return erro;
  }

  if (formulario.senha !== formulario.confirmacaoSenha) {
    return 'As senhas não conferem.';
  }

  return null;
}

export function montarDadosTutor({ nome, email, telefone, senha }) {
  const dados = {
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    telefone: telefone.trim(),
  };

  if (senha) {
    dados.senha = senha;
  }

  return dados;
}
