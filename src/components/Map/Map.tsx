'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useMap } from '@/context/map-context';
import { Interface } from './Interface';
import { Icons } from '../icons';
import MapContainer, { Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useLocale } from 'next-intl';

export function Map() {
  const locale = useLocale();
  const {
    mapInitialized,
    setMapInitialized,
    data,
    setMovieId,
    filters,
  } = useMap();

  const [cursor, setCursor] = useState<string>('auto');
  const mapSettings = useRef({
    baseZoom: 8,
  }).current;

  const filtersRendered = useMemo(() => {
    const startDate = new Date(`${filters.date.value[0]}`);
    const endDate = new Date(`${filters.date.value[1]}`);
    endDate.setFullYear(endDate.getFullYear() + 1);
    const filtersRendered:any = [
      'all',
      ['>=', ['get', 'release_date'], startDate.toISOString().slice(0, 10)],
      ['<=', ['get', 'release_date'], endDate.toISOString().slice(0, 10)],
      [">=", ["get", "runtime"], filters.runtime.value[0]],
      ["<=", ["get", "runtime"], filters.runtime.value[1]],
    ];
    return filtersRendered;
  }, [filters]);

  if (!data) return null;

  return (
    <div className="w-full h-full flex flex-col relative bg-black">
      {!mapInitialized && (
        <div className="bg-background absolute w-full h-full z-20 flex items-center justify-center">
          <Icons.spinner className="animate-spin" />
        </div>
      )}
      <MapContainer
        initialViewState={{
          longitude: 2.5,
          latitude: 48.5,
          zoom: 8,
        }}
        maxBounds={[
          [0.5, 47],
          [4.5, 50]
        ]}
        maxZoom={12}
        minZoom={6}
        bearing={0}
        pitch={0}
        padding={{
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
        mapStyle="/map/style.json"
        attributionControl={false}
        interactiveLayerIds={['movies']}
        onClick={(e) => {
          const isMoviesLayer = e.features?.find((feature) => feature.layer.id === 'movies');
          if (isMoviesLayer) {
            const movieId = isMoviesLayer.properties.id;
            setMovieId(movieId);
          }
        }}
        onMouseMove={(e) => {
          const isMoviesLayer = e.features?.find((feature) => feature.layer.id === 'movies');
          if (isMoviesLayer) {
            setCursor('pointer');
          } else {
            setCursor('auto');
          } 
        }}
        cursor={cursor}
        onLoad={() => {
          setMapInitialized(true);
        }}
        locale={locale}
      >
          <Source id="movies" type="geojson" data={data.moviesDataset}>
            <Layer
              id="movies"
              type="symbol"
              layout={{
                'text-field': ['get', 'title', ['get', locale]],
                'text-font': ['Open Sans Bold'],
                'text-size': [
                  "interpolate",
                  ["exponential", 2],
                  ["zoom"],
                  0,
                  1.5 * Math.pow(2, 0 - mapSettings.baseZoom),
                  24,
                  1.5 * Math.pow(2, 24 - mapSettings.baseZoom)
                ],
                'text-overlap': 'cooperative',
                'text-allow-overlap': true,
                'text-variable-anchor': ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                'text-offset': [1, 0],
                'icon-image': [
                  'match',
                  ['at', 0, ['get', 'genres']],
                  ...data.genres.flatMap(({ id }) => [id, `genres/${id}`]),
                  'none'
                ] as any,
                'icon-size': [
                  "interpolate",
                  ["exponential", 2],
                  ["zoom"],
                  0,
                  0.08 * Math.pow(2, 0 - mapSettings.baseZoom),
                  24,
                  0.08 * Math.pow(2, 24 - mapSettings.baseZoom)
                ]
              }}
              paint={{
                'text-color': '#ffe974',
                'text-halo-color': 'black',
                'text-halo-width': [
                  'interpolate',
                  ['exponential', 2],
                  ['zoom'],
                  0,
                  0.01 * Math.pow(2, 0 - mapSettings.baseZoom),
                  24,
                  0.01 * Math.pow(2, 24 - mapSettings.baseZoom)
                ],
                'text-halo-blur': 1,
              }}
              filter={filtersRendered}
            />
          </Source>
          <Interface />
      </MapContainer>
    </div>
  );
}

