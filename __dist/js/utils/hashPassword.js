import { hashSync } from "bcryptjs";
const hashPassword = (password) => {
    password = hashSync(password, 10);
    return password;
};
export default hashPassword;
