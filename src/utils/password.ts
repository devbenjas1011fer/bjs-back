import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    // Generar una sal aleatoria
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Generar el hash utilizando la contraseña y la sal
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  }
// Función para verificar si una contraseña coincide con un hash
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    // Comparar la contraseña con el hash
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }
    