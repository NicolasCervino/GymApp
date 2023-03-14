import background1 from "../public/workoutBanner/backdrop1.jpg";
const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const fetchWorkoutPhoto = async (): Promise<string> => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${unsplashAccessKey}&query=gym`);
    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    return background1.src;
  }
};

export default fetchWorkoutPhoto;
