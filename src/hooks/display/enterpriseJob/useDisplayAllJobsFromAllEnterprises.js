import axios from "axios";

export default function useDisplayAllJobsFromAllEnterprises() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function displayAllJobsFromAllEnterprises(userId, subCatId) {
    let url = `${apiUrl}:8000/agenda/userjob/`;
    const response = await axios.get(url);
    return response.data;
  }

  return {
    displayAllJobsFromAllEnterprises,
  };
}
