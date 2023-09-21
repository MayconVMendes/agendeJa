import axios from "axios";

export default function useGetAddress() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function getAddress(cep) {
    let url = `${apiUrl}:8000/agenda/address/by/${cep}`;

    const response = await axios.get(url);
    return response.data;
  }

  return {
    getAddress,
  };
}
