import { useContext, useState } from 'react';
import { ACTION_TYPES, StoreContext } from '../context/store-context';

const useTrackLocation = () => {
  const {dispatch} = useContext(StoreContext)
  const [locationErrorMassage, setLocationErrorMassage] = useState('');
 // const [latLong, setLatLong] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const success = (position) => {
    setIsFindingLocation(false);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

   // setLatLong(`${latitude},${longitude}`);
   dispatch({
    type: ACTION_TYPES.SET_LAT_LONG,
    payload: {latLong:`${latitude},${longitude}`}
   })
    setLocationErrorMassage('');
  };
  const error = () => {
    setIsFindingLocation(false);
    setLocationErrorMassage('Unable to retrieve your location');
  };
  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMassage('Geolocation is not supported by your browser');
      setIsFindingLocation(false);
    } else {
      //status.textContent = 'Locating…';

      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {  handleTrackLocation, locationErrorMassage, isFindingLocation};
};
export default useTrackLocation;
