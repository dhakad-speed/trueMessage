import bcrypt from "bcryptjs";

export interface verify {
  password: string;
  hashPassword: string;
}
export interface hash {
  password: string;
}

export async function verifyPassword({ password, hashPassword }: verify) {
  const comparedPassword: boolean = await bcrypt.compare(
    password,
    hashPassword
  );
  return comparedPassword;
}

export async function encryptPassword({ password }: hash) {
  const encryptUserPassword: string = await bcrypt.hash(password, 10);
  return encryptUserPassword;
}
