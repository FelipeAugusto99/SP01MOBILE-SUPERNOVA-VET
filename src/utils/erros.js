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

  const mensagemApi = error.response.data?.message;

  if (status === 400 && typeof mensagemApi === 'string') {
    return mensagemApi;
  }

  return mensagens.padrao || 'Ocorreu um erro inesperado.';
}
