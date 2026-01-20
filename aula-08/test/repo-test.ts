// test/repo-test.ts

import { UserRepository } from '../src/userRepository';
import { IUser } from '../src/types';

async function runTests() {
  const userRepository = new UserRepository();

  try {
    // Teste 1: Adicionar um novo usuário
    console.log('--- Teste 1: Adicionando novo usuário ---');
    const newUser: IUser = {
      id: 4,
      name: "Pedro Teste",
      email: "pedro.teste@example.com",
      isActive: true
    };
    const createdUser = await userRepository.create(newUser);
    console.log('Usuário criado:', createdUser);

    // Teste 2: Buscar todos os usuários
    console.log('\n--- Teste 2: Buscando todos os usuários ---');
    const allUsers = await userRepository.findAll();
    console.log('Todos os usuários:', allUsers);

    // Teste 3: Buscar um usuário pelo ID
    console.log('\n--- Teste 3: Buscando usuário pelo ID 4 ---');
    const foundUser = await userRepository.findById("4");
    console.log('Usuário encontrado:', foundUser);

    // Teste 4: Atualizar um usuário
    console.log('\n--- Teste 4: Atualizando usuário 4 ---');
    const updatedUser = await userRepository.update("4", { name: "Pedro Atualizado" });
    console.log('Usuário atualizado:', updatedUser);

    // Teste 5: Deletar um usuário
    console.log('\n--- Teste 5: Deletando usuário 4 ---');
    const numDeleted = await userRepository.delete("4");
    console.log('Número de usuários deletados:', numDeleted);

  } catch (err) {
    console.error('Erro no teste:', err);
  }
}

runTests();