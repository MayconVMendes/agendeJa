import axios from "axios";

export default function useDisplayHours() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function displayHours(date, portfolioJobId, token) {
    let url = `${apiUrl}:8000/agenda/hours/filter`;
    const response = await axios.get(
      url,
      {
        date: date,
        portfolioJobId: portfolioJobId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }

  return {
    displayHours,
  };
}
