import axios from "axios";

export default function useRegisterPortifolioJob() {
  const apiUrl = process.env.REACT_APP_API_AGENDEJA_AWS;

  async function registerPortifolioJob(
    name,
    portfolioId,
    jobId,
    price,
    description,
    duration,
    image1,
    image2,
    image3,
    token
  ) {
    let url = `${apiUrl}:8000/agenda/userjob/`;

    const response = await axios.post(url, {
      name: name,
      portfolioId: portfolioId,
      jobId: jobId,
      price: price,
      description: description,
      duration: `0${duration}:00`,
      coverImage: "",
      restricted: false,
      images: [image1, image2, image3]
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  }

  return {
    registerPortifolioJob,
  };
}
