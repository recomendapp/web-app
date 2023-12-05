'use client';

import React, { useState, useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import maplibre, { StyleSpecification } from 'maplibre-gl';

import movies from '@/components/Map/style/movies/movielist.json';
// MAP STYLE
import style from '@/components/Map/style/style.json';
// MAP LAYERS
import mapBase from '@/components/Map/style/layers/base.json';
import mapBeach from '@/components/Map/style/layers/beach.json';
import mapDesert from '@/components/Map/style/layers/desert.json';
import mapGrass from '@/components/Map/style/layers/grass.json';
import mapContour from '@/components/Map/style/layers/contour.json';
import mapHighway from '@/components/Map/style/layers/highway.json';
import mapTrain from '@/components/Map/style/layers/train.json';
import mapPrimaryRoad from '@/components/Map/style/layers/primary-road.json';
import mapSecondaryRoad from '@/components/Map/style/layers/secondary-road.json';
import mapTrail from '@/components/Map/style/layers/trail.json';
import mapSportsField from '@/components/Map/style/layers/sports-field.json';
import mapTrees from '@/components/Map/style/layers/trees.json';
// MAP ICONS
import mapIconRailway from '@/components/Map/style/icons/railway.png';
// import 'maplibre-gl/dist/maplibre-gl.css';

import MapPopup from './popup/MapPopup';

// TMDB FUNCTION
import { Icons } from '@/components/icons';
// import MapFilter from './mapfilters/MapFiltersOLD';
import { MapFilters } from './mapfilters/mapfilters';
import { useLocale } from 'next-intl';

export function Map() {
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(false);

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
        baseZoom: 8,
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
    map.current = new maplibre.Map({
        container: mapContainer.current,
        style: style as StyleSpecification,
        // style: 'https://api.maptiler.com/maps/7e9212a6-3e95-4973-9818-ccdd4495cd85/style.json?key=xovgcl4cLfvN83i7rYlu',
        // style: 'https://demotiles.maplibre.org/style.json',
      // style: 'mapbox://styles/loupqhc/clfe6uszy007x01rxt0epzrio',
        // style: 'mapbox://styles/loupqhc/cloymvo2c014501praqxu1y72',
        // accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        center: [viewport.longitude, viewport.latitude],
        zoom: viewport.zoom,
        maxZoom: viewport.maxZoom,
        minZoom: viewport.minZoom,
    });
  });

  useEffect(() => {
    map.current.on('load', () => {
      // MOVIES
      map.current.addSource('movies', {
        'type': 'geojson',
        'data': movies,
      });
      // BASE LAYER
      map.current.addSource('base', {
        'type': 'geojson',
        'data': mapBase,
      });
      // BEACH LAYER
      map.current.addSource('beach', {
        'type': 'geojson',
        'data': mapBeach,
      });
      // DESERT LAYER
      map.current.addSource('desert', {
        'type': 'geojson',
        'data': mapDesert,
      });
      // GRASS LAYER
      map.current.addSource('grass', {
        'type': 'geojson',
        'data': mapGrass,
      });
      // CONTOUR LAYER
      map.current.addSource('contour', {
        'type': 'geojson',
        'data': mapContour,
      });
      // HIGHWAY LAYER
      map.current.addSource('highway', {
        'type': 'geojson',
        'data': mapHighway,
      });
      // TRAIN LAYER
      map.current.addSource('train', {
        'type': 'geojson',
        'data': mapTrain,
      });
      // PRIMARY ROAD LAYER
      map.current.addSource('primary-road', {
        'type': 'geojson',
        'data': mapPrimaryRoad,
      });
      // SECONDARY ROAD LAYER
      map.current.addSource('secondary-road', {
        'type': 'geojson',
        'data': mapSecondaryRoad,
      });
      // TRAIL LAYER
      map.current.addSource('trail', {
        'type': 'geojson',
        'data': mapTrail,
      });
      // SPORTS FIELD LAYER
      map.current.addSource('sports-field', {
        'type': 'geojson',
        'data': mapSportsField,
      });
      // TREES LAYER
      map.current.addSource('trees', {
        'type': 'geojson',
        'data': mapTrees,
      });

      // ADD IMAGES
      map.current.loadImage('map/highway.png', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('highway', image);
      });
      map.current.loadImage('map/railway.png', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('railway', image);
      });
      map.current.loadImage('map/pattern/dot.png', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('patternDot', image);
      });
      // TREES
      map.current.loadImage('map/vegetation/tree.png', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('vegetationTree', image);
      });
      map.current.loadImage('map/vegetation/palm.png', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('vegetationPalm', image);
      });
      map.current.loadImage('map/vegetation/bush.png', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('vegetationBush', image);
      });
      map.current.loadImage('map/vegetation/fir.png', (error: any, image: any) => {
        if (error) throw error;
        map.current.addImage('vegetationFIr', image);
      });

      map.current.addLayer({
        'id': 'beach',
        'type': 'fill',
        'source': 'beach',
        'paint': {
            'fill-color': '#333333',
            'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        'id': 'base',
        'type': 'fill',
        'source': 'base',
        'paint': {
            'fill-color': '#292929',
            'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        'id': 'grass',
        'type': 'fill',
        'source': 'grass',
        'paint': {
          // 'fill-pattern': 'patternDot',
          // 'fill-pattern-width': 1,
          'fill-color': '#56513a',
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        'id': 'desert',
        'type': 'fill',
        'source': 'desert',
        'paint': {
            'fill-color': '#333333',
            'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        'id': 'sports-field',
        'type': 'fill',
        'source': 'sports-field',
        'paint': {
            'fill-color': '#56513a',
            'fill-outline-color': '#e86a37',
            'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        'id': 'contour',
        'type': 'line',
        'source': 'contour',
        'layout': {
          'line-join': 'miter',
          'line-cap': 'butt'
        },
        // 'paint': {
        //   'line-color': '#4d4d4d',
        //   'line-width': 1
        // }
        'paint': {
          'line-color': '#4d4d4d',
          'line-width': {
            "type": "exponential",
            "base": 2,
            "stops": [
              [0, 0.25 * Math.pow(2, (0 - viewport.baseZoom))],
              [24, 0.25 * Math.pow(2, (24 - viewport.baseZoom))]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'trail',
        'type': 'line',
        'source': 'trail',
        'layout': {
          'line-join': 'miter',
          'line-cap': 'butt'
        },
        'paint': {
          'line-color': '#e86a37',
          'line-width': {
            "type": "exponential",
            "base": 2,
            "stops": [
              [0, 0.5 * Math.pow(2, (0 - viewport.baseZoom))],
              [24, 0.5 * Math.pow(2, (24 - viewport.baseZoom))]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'secondary-road',
        'type': 'line',
        'source': 'secondary-road',
        'layout': {
          'line-join': 'miter',
          'line-cap': 'butt'
        },
        'paint': {
          'line-color': '#e86a37',
          'line-width': {
            "type": "exponential",
            "base": 2,
            "stops": [
              [0, 0.5 * Math.pow(2, (0 - viewport.baseZoom))],
              [24, 0.5 * Math.pow(2, (24 - viewport.baseZoom))]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'primary-road',
        'type': 'line',
        'source': 'primary-road',
        'layout': {
          'line-join': 'miter',
          'line-cap': 'butt'
        },
        'paint': {
          'line-color': '#e86a37',
          'line-width': {
            "type": "exponential",
            "base": 2,
            "stops": [
              [0, 1 * Math.pow(2, (0 - viewport.baseZoom))],
              [24, 1 * Math.pow(2, (24 - viewport.baseZoom))]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'highway',
        'type': 'line',
        'source': 'highway',
        'layout': {
          'line-join': 'miter',
          'line-cap': 'butt'
        },
        'paint': {
          'line-pattern': 'highway',
          'line-width': {
            "type": "exponential",
            "base": 2,
            "stops": [
              [0, 5 * Math.pow(2, (0 - viewport.baseZoom))],
              [24, 5 * Math.pow(2, (24 - viewport.baseZoom))]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'train',
        'type': 'line',
        'source': 'train',
        'layout': {
          'line-join': 'miter',
          'line-cap': 'butt'
        },
        'paint': {
          'line-pattern': 'railway',
          'line-width': {
            "type": "exponential",
            "base": 2,
            "stops": [
              [0, 2 * Math.pow(2, (0 - viewport.baseZoom))],
              [24, 2 * Math.pow(2, (24 - viewport.baseZoom))]
            ]
          }
        }
      });
      map.current.addLayer({
        'id': 'trees',
        'type': 'symbol',
        'source': 'trees',
        'layout': {
            'icon-image': [
              'match',
              ['get', 'Nom'],
              'Sapin', 'vegetationFir',
              'Potager', 'vegetationBush',
              'Palmier', 'vegetationPalm',
              'vegetationTree'
            ],
            'icon-size': {
              "type": "exponential",
              "base": 2,
              "stops": [
                [0, 0.008 * Math.pow(2, (0 - viewport.baseZoom))],
                [24, 0.008 * Math.pow(2, (24 - viewport.baseZoom))]
              ]
            },
            'icon-allow-overlap': true,
        },
    });
        // INIT MAP
        // map.current.addLayer(

        // )


      // ADD SUBTITLE
    //   map.current.addControl(
    //     new mapboxgl.AttributionControl({
    //       customAttribution: 'Map design by Paradise Pictures',
    //     })
    //   );

      // ADD SOURCE

      // map.current.loadImage('profile-picture.jpg', (error: any, image: any) => {
      //   if (error) throw error;
      //   map.current.addImage('next', image);
      // });

      // map.current.loadImage('test.jpg', (error: any, image: any) => {
      //   if (error) throw error;
      //   map.current.addImage('test', image);
      // });

      // ADDING MOVIES MARKERS
    // ADD SOURCE
    map.current.addLayer({
        'id': 'movies',
        'type': 'symbol',
        'source': 'movies',
        'minzoom': limitShowingMarkers,
        'layout': {
            // 'text-field': ['step', ['zoom'], "", 10, ['get', 'title']],
            'text-field': ['get', 'title', ['get','fr', ['properties']]],
            'text-size': 10,
            'text-anchor': 'left',
            'text-offset': [1.5, 0],
            'icon-image': 'vegetationTree',
            'icon-size': 0.05,
        },
        'paint': {
            'text-color': '#fff',
        },
    });

      // map.current.on('click', (e: any) => {
      //   handleUnselectMovie()
      // })

      // CLICK EVENT
      map.current.on('click', 'movies', (e: any) => {
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
      map.current.on('mouseenter', 'movies', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      // Rétablissez le curseur par défaut lorsqu'il quitte le layer des markers
      map.current.on('mouseleave', 'movies', () => {
        map.current.getCanvas().style.cursor = '';
      });

      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1000);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map.current, limitShowingMarkers]);

  return (
    <>
      {isLoading && (
        <div className="bg-background absolute w-full h-full z-20 flex items-center justify-center">
          <Icons.spinner className="animate-spin" />
        </div>
      )}
      <div className="w-full h-full flex flex-col relative bg-[#110731] bg-opacity-20">
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
