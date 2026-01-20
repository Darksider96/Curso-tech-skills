// src/userRepository.ts

import Nedb from 'nedb';
import { IUser } from './types'; // Assumindo que você tem um arquivo de tipos

// Inicializa o banco de dados. Ele salvará os dados em um arquivo 'users.db'
const db = new Nedb({ filename: 'users.db', autoload: true });

export class UserRepository {
  
  /**
   * Busca todos os usuários.
   * @returns Uma promessa que resolve para um array de usuários.
   */
  public async findAll(): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      db.find({}, (err: Error | null, docs: IUser[]) => {
        if (err) return reject(err);
        resolve(docs);
      });
    });
  }

  /**
   * Busca um usuário pelo ID.
   * @param id O ID do usuário.
   * @returns Uma promessa que resolve para o usuário encontrado ou null se não existir.
   */
  public async findById(id: string): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      db.findOne({ id }, (err: Error | null, doc: IUser | null) => {
        if (err) return reject(err);
        resolve(doc);
      });
    });
  }

  /**
   * Adiciona um novo usuário.
   * @param user O objeto do usuário a ser adicionado.
   * @returns Uma promessa que resolve para o usuário adicionado.
   */
  public async create(user: IUser): Promise<IUser> {
    return new Promise((resolve, reject) => {
      db.insert(user, (err: Error | null, newDoc: IUser) => {
        if (err) return reject(err);
        resolve(newDoc);
      });
    });
  }
  
  /**
   * Atualiza um usuário pelo ID.
   * @param id O ID do usuário a ser atualizado.
   * @param updatedData Os dados a serem atualizados.
   * @returns Uma promessa que resolve para o usuário atualizado ou null se não for encontrado.
   */
  public async update(id: string, updatedData: Partial<IUser>): Promise<IUser | null> {
    return new Promise((resolve, reject) => {
      db.update({ id }, { $set: updatedData }, {}, (err: Error | null, numReplaced: number) => {
        if (err) return reject(err);
        if (numReplaced === 0) return resolve(null);
        
        db.findOne({ id }, (findErr: Error | null, doc: IUser | null) => {
          if (findErr) return reject(findErr);
          resolve(doc);
        });
      });
    });
  }

  /**
   * Deleta um usuário pelo ID.
   * @param id O ID do usuário a ser deletado.
   * @returns Uma promessa que resolve para o número de documentos removidos.
   */
  public async delete(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      db.remove({ id }, {}, (err: Error | null, numRemoved: number) => {
        if (err) return reject(err);
        resolve(numRemoved);
      });
    });
  }
}