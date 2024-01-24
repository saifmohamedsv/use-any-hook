import { useState, useEffect } from 'react';

function useGeoLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { coords } = await getCurrentPosition();
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      } catch (error) {
        setError(error);
      }
    };

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            getLocation();
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(
              () => getLocation(),
              (err) => setError(err)
            );
          } else {
            setError(new Error('Geolocation permission denied'));
          }
        })
        .catch((err) => setError(err));
    } else {
      setError(new Error('Geolocation is not supported by this browser.'));
    }
  }, []);

  return { location, error };
}

export default useGeoLocation;

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
