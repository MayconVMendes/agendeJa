import axios from "axios";

export default function useDisplayCategory() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function displayCategory() {
    let url = `${apiUrl}:8000/agenda/category/`;
      const response = await axios.get(url);
      return response.data;
  }

  return {
    displayCategory,
  };
}
