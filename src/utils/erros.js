export function obterMensagemErro(error, mensagens = {}) {
  const status = error?.response?.status;

  if (status && mensagens[status]) {
    return mensagens[status];
  }

  if (!error?.response) {
    return 'Não foi possível conectar ao servidor.';
  }

  if (status === 403) {
    return 'Você não tem permissão para realizar esta ação.';
  }

  const mensagemApi = extrairMensagemApi(error.response.data);

  if (status === 400 && mensagemApi) {
    return mensagemApi;
  }

  return mensagens.padrao || 'Ocorreu um erro inesperado.';
}

function extrairMensagemApi(dados) {
  if (!dados || typeof dados !== 'object') {
    return null;
  }

  if (dados.message || dados.erro) {
    return dados.message || dados.erro;
  }

  if ('timestamp' in dados) {
    return null;
  }

  return Object.values(dados).find((valor) => typeof valor === 'string') || null;
}
