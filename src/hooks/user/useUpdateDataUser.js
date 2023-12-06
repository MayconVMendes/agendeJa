import axios from "axios";
import { useSelector } from "react-redux";

export default function useUpdateDataUser() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;
  const userData = useSelector((state) => state?.userDados);
  const updateUser = async (value, token, { firstName, lastName, phone }) => {
    let url = `${apiUrl}:8000/agenda/user/${value}`;

    try {
      const response = await axios.put(
        url,
        {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          profileImage: userData.profileImage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateUser,
  };
}
