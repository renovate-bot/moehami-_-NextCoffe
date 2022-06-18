
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
})

const getUrlForCoffeeStors = (latLong, query, limit) => {
  return `https://api.foursquare.com/v2/venues/search?ll=${latLong}&query=${query}=&client_id=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET}&v=20210525&limit=${limit}`;
};

const getListOfCoffeeStorePhoto = async ()=>{
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  })
  const usplashResults = photos.response?.results || []
  console.log();
  return usplashResults.map(result => result.urls['small'])
}

export const fetchCoffeeStores = async (latLong = '43.65267326999575,-79.39545615725015', limit=6) => {
 const photos = await getListOfCoffeeStorePhoto()
  const response = await fetch(
    getUrlForCoffeeStors(
      latLong,
      'coffee stores',
      limit
    )
  );

  const data = await response.json();
  return data.response.venues.map((venue, idx)=>{
    return {
      ...venue,
      imgUrl: photos[idx]
    }
  })
};


