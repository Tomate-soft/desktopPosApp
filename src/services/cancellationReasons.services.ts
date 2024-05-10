import axios from "axios";

export const getReasonsAction = async () => {
  const response = await axios(
    "https://tomate-server.onrender.com/cancellation-reason"
  );
  return response;
};
