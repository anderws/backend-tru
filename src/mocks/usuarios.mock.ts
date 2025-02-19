import { Funcao, Usuario } from '@prisma/client'; // Ajuste o caminho conforme necessário

export const mockUsuarios: Usuario[] = [
  {
    id: 1,
    nome: 'Jhon Parker',
    email: 'jp@gmail.com',
    senha: '222222',
    funcao: Funcao.CLIENTE,
  },
  {
    id: 2,
    nome: 'Doe Roughan',
    email: 'd4@oi.com',
    senha: '111111',
    funcao: Funcao.ADMIN,
  },
];


export const mockUsuariosAdmin: Usuario[] = [
  {
    id: 1,
    nome: 'Jhon Parker',
    email: 'jp@gmail.com',
    senha: '222222',
    funcao: Funcao.ADMIN,
  },
  {
    id: 2,
    nome: 'Doe Roughan',
    email: 'd4@oi.com',
    senha: '111111',
    funcao: Funcao.ADMIN,
  },
];
