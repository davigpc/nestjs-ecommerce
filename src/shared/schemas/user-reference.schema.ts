import mongoose from 'mongoose';

/**
 * Visão de leitura da coleção `users`.
 *
 * Depois da extração de Clientes, o dono do dado passou a ser o serviço em
 * `services/ecommerce/clientes`. O carrinho e o pedido continuam validando o
 * comprador na mesma coleção porque o banco segue compartilhado nesta fase do
 * Strangler Fig.
 *
 * O schema não repete os campos do usuário — só precisa existir como modelo
 * para `exists` e para a referência `ref: 'User'`. Com `strict: false`, os
 * campos gravados pelo serviço continuam visíveis.
 *
 * Este acoplamento de dados sai quando o banco for separado no snapshot final.
 */
export const UserReferenceSchema = new mongoose.Schema(
  {},
  { collection: 'users', strict: false },
);
