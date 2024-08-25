import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    

    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  }

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {

    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }
    