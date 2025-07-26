import axios from "axios";
interface props {
  imageUrl: string;
  prompt: string;
}

export const generateFromHuggingFaceModel = async ({
  imageUrl,
  prompt,
}: props) => {
  try {
    const response = await axios.post("/api/generate", { imageUrl, prompt });
    if (!response.data.success) {
      console.log("somthing went wrong while fetching data from server!");
    }

    return response.data.image;
  } catch (error) {
    console.error("Faild to generate image:",error);
    throw error;
  }
};
