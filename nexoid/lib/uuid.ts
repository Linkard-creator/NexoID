import { v4 as uuidv4 } from "uuid";

/**
 * Gera UUID único e imutável para cada usuário.
 * Este valor nunca deve ser alterado após a criação.
 */
export function generateUserUUID(): string {
  return uuidv4();
}

/**
 * Valida se uma string é um UUID v4 válido.
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
