import { useState } from "react";
import axios from "axios";

export default function useDisplayJobAll() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;
  const [data, setData] = useState(null);

  async function displayJobAll() {
    let url = `${apiUrl}:8000/agenda/job/`;

    if (data == null) {
      const response = await axios.get(url);
      setData(response.data);
      return response.data;
    }
  }

  return {
    displayJobAll,
  };
}
