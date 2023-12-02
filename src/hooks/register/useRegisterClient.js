import { useState } from "react";
import axios from "axios";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;
  const url = `${apiUrl}:8000/agenda/register`;
  const registerUser = async ({
    email,
    password,
    birthday,
    phone,
    firstName,
    lastName,
    cpf,
    isJobProvider,
    profileImage
  }) => {
    try {
      setLoading(true);
      const response = await axios.post(url, {
        email: email,
        password: password,
        birthday: birthday,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        cpf: cpf,
        isJobProvider: isJobProvider,
        profileImage: profileImage,
      });
      setLoading(false);

      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const registerUserProvider = async ({
    email,
      password,
      birthday,
      phone,
      firstName,
      lastName,
      cpf,
      hasAddress,
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      numero,
      isJobProvider,
      profileImage,
      coverImage,
      fantasyName,
      category,
      subCategories,
      hours,
      is24Hours,
      description
  }) => {
    try {
      if (hasAddress === false) {
        const response = await axios.post(url, {
          email: email,
          password: password,
          birthday: birthday,
          phone: phone,
          firstName: firstName,
          lastName: lastName,
          cpf: cpf,
          hasAddress: hasAddress,
          address: {},
          isJobProvider: isJobProvider,
          profileImage: profileImage,
          coverImage: coverImage,
          fantasyName: fantasyName,
          category: category,
          subCategories: subCategories,
          hours: hours,
          is24Hours: is24Hours,
          description: description
        });

        return response.data;
      } else {
        const response = await axios.post(url, {
          email: email,
          password: password,
          birthday: birthday,
          phone: phone,
          firstName: firstName,
          lastName: lastName,
          cpf: cpf,
          hasAddress: hasAddress,
          address: {
            cep: cep,
            logradouro: logradouro,
            complemento: complemento,
            bairro: bairro,
            localidade: localidade,
            uf: uf,
            numero: numero,
          },
          isJobProvider: isJobProvider,
          profileImage: profileImage,
          coverImage: coverImage,
          fantasyName: fantasyName,
          category: category,
          subCategories: subCategories,
          hours: hours,
          is24Hours: is24Hours,
          description: description
        });

        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    registerUser,
    registerUserProvider,
    loading
  };
}
