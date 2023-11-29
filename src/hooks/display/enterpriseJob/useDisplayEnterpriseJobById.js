import axios from "axios";

export default function useDisplayEnterpriseJobById() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function displayEnterpriseJobById(id) {
    let url = `${apiUrl}:8000/agenda/userjob/${id}`;
    const response = await axios.get(url);
    return response.data;
  }

  return {
    displayEnterpriseJobById,
  };
}
