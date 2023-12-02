import { useState } from "react";
import axios from "axios";

export default function useTokenVerify() {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  const searchTokenUser = async (token) => {
    try {
      setLoading(true);
      let url = `${apiUrl}:8000/agenda/verify`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setLoading(false);

      return response.data;
    } catch (error) {
      setLoading(false);

      throw error;
    }
  };

  return {
    loading,
    searchTokenUser,
  };
}
