'use client';

import React, { useState, useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import MapPopup from './popup/MapPopup';

// TMDB FUNCTION
import { Icons } from '@/components/icons';
// import MapFilter from './mapfilters/MapFiltersOLD';
import { MapFilters } from './mapfilters/mapfilters';
import { Metadata } from 'next';

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);

  const mapContainer = useRef<any>('');
  const map = useRef<any>(null);
  const [viewport, setViewport] = useState<any>({
    longitude: 2.5,
    latitude: 48.5,
    zoom: 8,
    maxZoom: 20,
    minZoom: 7,
    bearing: 0,
    pitch: 0,
    padding: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
  });
  const [limitShowingMarkers, setLimitShowingMarkers] = useState(7);

  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  // SELECT MARKER
  const handleSelectMovie = (marker: any) => {
    console.log('CLICK SUR ', marker);
    setSelectedMovie(marker); // DEFINE NEW SELECTED MOVIE
  };
  // UNSELECT MARKER
  const handleUnselectMovie = () => {
    console.log('UNSELECT');
    setSelectedMovie(null); // DELETE SELECTED MOVIE
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/loupqhc/clfe6uszy007x01rxt0epzrio',
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      maxZoom: viewport.maxZoom,
      minZoom: viewport.minZoom,
    });
  });

  useEffect(() => {
    map.current.on('load', () => {
      // ADD SUBTITLE
      map.current.addControl(
        new mapboxgl.AttributionControl({
          customAttribution: 'Map design by Paradise Pictures',
        })
      );

      // ADD SOURCE
      map.current.addSource('markersooooo', {
        type: 'geojson',
        data: 'movielist.geojson',
      });

      map.current.loadImage('profile-picture.jpg', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('next', image);
      });

      map.current.loadImage('test.jpg', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('test', image);
      });

      // ADDING MOVIES MARKERS
      map.current.addLayer({
        id: 'markers-layer',
        type: 'symbol',
        source: 'markersooooo',
        minzoom: limitShowingMarkers,
        layout: {
          'text-field': ['get', 'Titre Film'],
          'text-size': 10,
          'text-anchor': 'left',
          'text-offset': [1.5, 0],
          'icon-image': [
            'match',
            ['get', 'Genre'],
            'Animation',
            'test',
            'next',
          ],
          'icon-size': 0.05,
        },
        paint: {
          'text-color': 'yellow',
        },
      });

      // map.current.on('click', (e: any) => {
      //   handleUnselectMovie()
      // })

      // CLICK EVENT
      map.current.on('click', 'markers-layer', (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const movieId = e.features[0].properties.id;
        const movieTitle = e.features[0].properties['Titre Film'];
        handleSelectMovie({
          id: movieId,
          title: movieTitle,
        });
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }
        // new mapboxgl.Popup()
        //   .setLngLat(coordinates)
        //   .setHTML(movieTitle)
        //   .addTo(map.current);
      });

      // Changez le curseur lorsqu'il survole le layer des markers
      map.current.on('mouseenter', 'markers-layer', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      // Rétablissez le curseur par défaut lorsqu'il quitte le layer des markers
      map.current.on('mouseleave', 'markers-layer', () => {
        map.current.getCanvas().style.cursor = '';
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [map.current]);

  return (
    <>
      {isLoading && (
        <div className="bg-background absolute w-full h-full z-20 flex items-center justify-center">
          <Icons.spinner className="animate-spin" />
        </div>
      )}
      <div className="w-full h-full flex flex-col relative bg-blue-950 bg-opacity-20">
        {/* HEADER MAP */}
        <div className="absolute z-10  pt-4 px-4 gap-2  w-full pointer-events-none flex flex-col justify-between lg:flex-row">
          <div className="bg-green-500 pointer-events-auto">SEARCHBAR</div>
          <div className="flex justify-end pointer-events-auto">
            <MapFilters
              closePopupMovie={handleUnselectMovie}
              map={map.current}
            />
          </div>
        </div>
        {selectedMovie && (
          <MapPopup
            selectedMovie={selectedMovie}
            onClose={handleUnselectMovie}
          />
        )}
        {/* MAP CONTAINER */}
        <div ref={mapContainer} className="map-container h-full w-full" />
      </div>
    </>
  );
}
