import axios from "axios";

export default function useDisplayJobById() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function displayJobById(id) {
    let url = `${apiUrl}:8000/agenda/job/${id}`;
    const response = await axios.get(url);
    return response.data;
  }

  return {
    displayJobById,
  };
}
