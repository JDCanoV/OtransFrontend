import React, { useEffect, useRef } from 'react';

const HereMapComponent = ({ originCoords, destinationCoords }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.H || !mapRef.current) return;

    const platform = new window.H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: originCoords || { lat: 4.73245, lng: -74.26419 },
        zoom: 6,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    if (originCoords && destinationCoords) {
      const router = platform.getRoutingService(null, 8);
      const routingParameters = {
        mode: 'fastest;car',
        waypoint0: `geo!${originCoords.lat},${originCoords.lng}`,
        waypoint1: `geo!${destinationCoords.lat},${destinationCoords.lng}`,
        representation: 'display',
      };

      router.calculateRoute(routingParameters, (result) => {
        if (result.response.route) {
          const route = result.response.route[0];
          const lineString = new window.H.geo.LineString();

          route.shape.forEach((point) => {
            const parts = point.split(',');
            lineString.pushLatLngAlt(+parts[0], +parts[1], 0);
          });

          const routeLine = new window.H.map.Polyline(lineString, {
            style: { strokeColor: 'blue', lineWidth: 5 },
          });

          map.addObject(routeLine);
          map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
        }
      });
    }

    return () => map.dispose();
  }, [originCoords, destinationCoords]);

  return <div ref={mapRef} style={{ height: '100%', borderRadius: '20px' }} />;
};

export default HereMapComponent;
