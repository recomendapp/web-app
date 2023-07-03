import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Marker } from 'react-map-gl';

// MARKER
import ComedyMarker from './marker/comedyMarker';

export default function MarkerMovie(props: any) {
  const router = useRouter()

  const { movieDatabase, onMarkerClick, mapBounds } = props
  // const { query: { movie } = {} } = useRouter();

  const [visibleMarkers, setVisibleMarkers] = useState<any>([])

  useEffect(() => {
    setVisibleMarkers(movieDatabase.filter((marker: any) => {
      const { latitude, longitude } = marker;
      const { lat: south, lng: west } = mapBounds._sw;
      const { lat: north, lng: east } = mapBounds._ne;
      return longitude > west && longitude < east && latitude > south && latitude < north;
    }))
  }, [mapBounds])

  return (
      <>
        {
          visibleMarkers.map((item: any) => (
            <Marker
              key={`marker-${item.title}`}
              style={{display: 'flex', flexDirection: 'column',justifyContent: 'center'}}
              longitude={item.longitude}
              latitude={item.latitude}
              anchor="bottom"
              onClick={(e: any) => { 
                  e.originalEvent.stopPropagation();
                  onMarkerClick(item)
              }}
            > 
              <div className='text-white'>
                {item.title}
              </div>
              <ComedyMarker />
            </Marker>
          ))
        }
      </>
  )
}