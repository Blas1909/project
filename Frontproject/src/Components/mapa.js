import React, { useEffect, useMemo, useRef } from "react";
import mapboxgl from 'mapbox-gl';


export default function Mapa() {
  const longitude = useMemo(()=>-0.11710975710196347, [])
  const latitude = useMemo(()=>38.53964055070113, [])
  const zoom = useMemo(()=>13, [])
  const mapContainer = useRef(null)

  useEffect(()=>{
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: zoom
    })
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);
    return ()=>map.remove()
  }, [latitude, longitude, zoom])

  return (
    <div className="map-container" ref={mapContainer}>      
    </div>
  );
}
