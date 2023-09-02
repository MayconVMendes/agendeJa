import axios from "axios";

export default function useCheckServer() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function getStatusServer() {
    let url = `${apiUrl}:5000/agenda/`;

    const response = await axios.get(url);
    return response.data;
  }

  return {
    getStatusServer,
  };
}
