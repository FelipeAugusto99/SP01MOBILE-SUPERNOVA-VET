export function obterPermissoes(perfil) {
  const equipeClinica = perfil === 'ADMIN' || perfil === 'VETERINARIO';

  return {
    verTodosPets: equipeClinica,
    editarPets: equipeClinica,
    excluirPets: perfil === 'ADMIN',
    gerenciarTutores: perfil === 'ADMIN',
  };
}
