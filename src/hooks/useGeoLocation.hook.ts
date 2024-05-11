import { useEffect, useState } from "react";

export interface GeolocationError {
  code: number;
  message: string;
}

export type GeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export interface GeolocationState {
  location: GeolocationPosition | null;
  error: GeolocationError | Error | null;
}

export const useGeoLocation = (): GeolocationState => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationError | Error | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setLocation({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      } catch (error) {
        setError(error as GeolocationError); // Type assertion for clarity
      }
    };

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            getLocation();
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (position) => getLocation(),
              (err) => setError(err as GeolocationError) // Type assertion
            );
          } else {
            setError(new Error("Geolocation permission denied"));
          }
        })
        .catch((err) => setError(err as GeolocationError)); // Type assertion
    } else {
      setError(new Error("Geolocation is not supported by this browser."));
    }
  }, []);

  return { location, error };
};

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
