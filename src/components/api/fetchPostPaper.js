import axiosInstance from "utils/axiosInstance";

const fetchPostPaper = async (recipientData) => {
  try {
    const response = await axiosInstance.post("recipients/", recipientData);
    return response.data;
  } catch (error) {
    throw new Error(`"Error fetching data:", ${error.message}`);
  }
};

export default fetchPostPaper;
