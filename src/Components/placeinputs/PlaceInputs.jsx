import React, { useRef } from 'react';

const PlaceInputs = ({ setOriginCoords, setDestinationCoords }) => {
  const originRef = useRef();
  const destRef = useRef();

  const handlePlaceChange = async (inputRef, setCoords) => {
    const query = inputRef.current.value;
    const apiKey = process.env.REACT_APP_HERE_API_KEY;

    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${apiKey}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const { lat, lng } = data.items[0].position;
      setCoords({ lat, lng });
    }
  };

  return (
    <div>
      <input
        ref={originRef}
        type="text"
        placeholder="Punto de partida"
        onBlur={() => handlePlaceChange(originRef, setOriginCoords)}
        style={{ width: '100%', height: 40, marginBottom: 10 }}
      />
      <input
        ref={destRef}
        type="text"
        placeholder="Destino"
        onBlur={() => handlePlaceChange(destRef, setDestinationCoords)}
        style={{ width: '100%', height: 40 }}
      />
    </div>
  );
};

export default PlaceInputs;
