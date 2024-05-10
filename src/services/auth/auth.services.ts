import axios from "axios";

interface User {
  employeeNumber: string;
  pinPos: number;
}

export const signIn = async (user: User) => {
  console.log(user);
  const response = await axios.post(
    "https://tomate-server.onrender.com/auth/signIn",
    user
  );
  console.log(response);

  return response;
};
