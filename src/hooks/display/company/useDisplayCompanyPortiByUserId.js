import axios from "axios";

export default function useDisplayCompanyPortiByUserId() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function displayCompanyPortiByUserId(id) {
    let url = `${apiUrl}:8000/agenda/portfolio/user/${id}`;

    const response = await axios.get(url);
    return response.data;
  }

  return {
    displayCompanyPortiByUserId,
  };
}
