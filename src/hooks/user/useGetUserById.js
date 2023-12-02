import axios from "axios";

export default function useGetUserById() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;
  const addUser = async (user, token) => {
    let url = `${apiUrl}:8000/agenda/user/${user}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    addUser,
  };
}
