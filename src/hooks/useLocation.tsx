import {useEffect, useState} from 'react';
import GetLocation, {Location, LocationError} from 'react-native-get-location';

type LocationState = {
  loading: boolean;
  location: Location | null;
  error: string | null;
};

const useCurrentLocation = () => {
  const [locationState, setLocationState] = useState<LocationState>({
    loading: true,
    location: null,
    error: null,
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        setLocationState({
          loading: false,
          location,
          error: null,
        });
      } catch (error) {
        // @ts-ignore
        const {code, message} = error;
        setLocationState({
          loading: false,
          location: null,
          error: `${code}: ${message}`,
        });
      }
    };

    getLocation();

    return () => {}; // Clean up if needed
  }, []);

  return locationState;
};

export default useCurrentLocation;
