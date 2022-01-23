import { hashSync } from "bcryptjs";
const hashPassword = (password: string): string => {
  password = hashSync(password, 10);
  return password;
};

export default hashPassword;
