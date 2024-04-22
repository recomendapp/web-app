'use client';

import React, { useState, useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import maplibre, { StyleSpecification, LngLatBoundsLike } from 'maplibre-gl';

import movies from '@/components/Map/OLD/style/movies/movies.json';
// MAP STYLE
import style from '@/components/Map/OLD/style/style.json';
// MAP LAYERS
import mapBase from '@/components/Map/OLD/style/layers/base.json';
import mapBeach from '@/components/Map/OLD/style/layers/beach.json';
import mapDesert from '@/components/Map/OLD/style/layers/desert.json';
import mapGrass from '@/components/Map/OLD/style/layers/grass.json';
import mapContour from '@/components/Map/OLD/style/layers/contour.json';
import mapHighway from '@/components/Map/OLD/style/layers/highway.json';
import mapTrain from '@/components/Map/OLD/style/layers/train.json';
import mapPrimaryRoad from '@/components/Map/OLD/style/layers/primary-road.json';
import mapSecondaryRoad from '@/components/Map/OLD/style/layers/secondary-road.json';
import mapTrail from '@/components/Map/OLD/style/layers/trail.json';
import mapSportsField from '@/components/Map/OLD/style/layers/sports-field.json';
import mapEnvironmentItems from '@/components/Map/OLD/style/layers/environment-items.json';
import mapEnvironmentSymbols from '@/components/Map/OLD/style/layers/environment-symbols.json';
import mapBuildings from '@/components/Map/OLD/style/layers/buildings.json';
import mapZones from '@/components/Map/OLD/style/layers/zones.json';
// MAP ICONS
import mapIconRailway from '@/components/Map/style/icons/railway.png';
// import 'maplibre-gl/dist/maplibre-gl.css';

import MapPopup from './popup/MapPopup';

// TMDB FUNCTION
import { Icons } from '@/components/icons';
// import MapFilter from './mapfilters/MapFiltersOLD';
import { MapFilters } from './mapfilters/mapfilters';
import { useLocale } from 'next-intl';
import { MapSearchbar } from './MapSearchbar';

const environment_items = [
  'bush.png',
  'cactus_1.png',
  'cactus_2.png',
  'crater.png',
  'dune_1.png',
  'eywa.png',
  'fir.png',
  'haystack.png',
  'mountain_1.png',
  'palm.png',
  'parasol.png',
  'rock_1.png',
  'rock_2.png',
  'rock_mass_1.png',
  'rock_mass_2.png',
  'shark.png',
  'smoke_1.png',
  'smoke_2.png',
  'street_lamp.png',
  'tree.png',
  'whale.png',
];
const environment_symbols = [''];
const buildings = [
  'aircraft_carrier.png',
  'airship.png',
  'arena.png',
  'arrival.png',
  'barracks.png',
  'big_wheel.png',
  'bioclimatic_sphere.png',
  'building_1.png',
  'building_2.png',
  'building_3.png',
  'building_4.png',
  'carousel.png',
  'castle_1.png',
  'castle_2.png',
  'castle_3.png',
  'church.png',
  'circus.png',
  'city_building_1.png',
  'city_building_2.png',
  'city_building_3.png',
  'city_building_4.png',
  'control_tower.png',
  'country_house_1.png',
  'country_house_2.png',
  'country_house_3.png',
  'eiffel_tower.png',
  'factory.png',
  'farm.png',
  'farm_wind_turbine.png',
  'futuristic_tower_1.png',
  'futuristic_tower_2.png',
  'grand_budapest_hotel.png',
  'hospital.png',
  'igloo.png',
  'jungle_house.png',
  'las_vegas.png',
  'lighthouse.png',
  'low_rent_housing.png',
  'manor.png',
  'mill.png',
  'modest_house.png',
  'monastery.png',
  'motel.png',
  'movie_theater.png',
  'oil_drilling.png',
  'palace.png',
  'pirate_ship.png',
  'port_crane.png',
  'prison.png',
  'psychiatric_hospital.png',
  'radio_antenna.png',
  'radio_ship.png',
  'restaurant.png',
  'rocket_launch.png',
  'ruin_1.png',
  'ruin_2.png',
  'ruin_3.png',
  'saloon.png',
  'school.png',
  'settlers_house.png',
  'silo.png',
  'stadium.png',
  'stage.png',
  'statue_of_liberty.png',
  'stratosphere_tower.png',
  'suburban_house_1.png',
  'suburban_house_2.png',
  'supermarket.png',
  'tower_1.png',
  'tower_2.png',
  'train_station.png',
  'tunnel.png',
  'villa.png',
  'white_house.png',
  'yurt.png',
];

export function Map() {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const mapContainer = useRef<any>('');
  const map = useRef<any>(null);
  const viewport = {
    longitude: 2.5,
    latitude: 48.5,
    zoom: 8,
    maxZoom: 20,
    minZoom: 6,
    bearing: 0,
    pitch: 0,
    padding: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    mapBounds: [
      [0.5, 47],
      [4.5, 50],
    ] as LngLatBoundsLike | undefined,
    baseZoom: 8,
  };
  const limitShowingMarkers = 8.5;

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
      maxBounds: viewport.mapBounds,
    });
  });

  useEffect(() => {
    map.current.on('load', () => {
      // MOVIES
      map.current.addSource('movies', {
        type: 'geojson',
        data: movies,
      });
      // BASE LAYER
      map.current.addSource('base', {
        type: 'geojson',
        data: mapBase,
      });
      // BEACH LAYER
      map.current.addSource('beach', {
        type: 'geojson',
        data: mapBeach,
      });
      // DESERT LAYER
      map.current.addSource('desert', {
        type: 'geojson',
        data: mapDesert,
      });
      // GRASS LAYER
      map.current.addSource('grass', {
        type: 'geojson',
        data: mapGrass,
      });
      // CONTOUR LAYER
      map.current.addSource('contour', {
        type: 'geojson',
        data: mapContour,
      });
      // HIGHWAY LAYER
      map.current.addSource('highway', {
        type: 'geojson',
        data: mapHighway,
      });
      // TRAIN LAYER
      map.current.addSource('train', {
        type: 'geojson',
        data: mapTrain,
      });
      // PRIMARY ROAD LAYER
      map.current.addSource('primary-road', {
        type: 'geojson',
        data: mapPrimaryRoad,
      });
      // SECONDARY ROAD LAYER
      map.current.addSource('secondary-road', {
        type: 'geojson',
        data: mapSecondaryRoad,
      });
      // TRAIL LAYER
      map.current.addSource('trail', {
        type: 'geojson',
        data: mapTrail,
      });
      // SPORTS FIELD LAYER
      map.current.addSource('sports-field', {
        type: 'geojson',
        data: mapSportsField,
      });
      // ENVIRONMENT ITEMS LAYER
      map.current.addSource('environment-items', {
        type: 'geojson',
        data: mapEnvironmentItems,
      });
      // ENVIRONMENT SYMBOLS LAYER
      map.current.addSource('environment-symbols', {
        type: 'geojson',
        data: mapEnvironmentSymbols,
      });
      // BUILDINGS LAYER
      map.current.addSource('buildings', {
        type: 'geojson',
        data: mapBuildings,
      });
      // ZONE LAYER
      map.current.addSource('zones', {
        type: 'geojson',
        data: mapZones,
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
      // ENVIRONEMENT ITEMS
      environment_items.forEach((imagePath) => {
        const name = imagePath.replace(/\.[^/.]+$/, '');
        map.current.loadImage(
          `map/environment-items/${imagePath}`,
          (error: any, image: any) => {
            if (error) throw error;
            map.current.addImage(`envItems_${name}`, image);
          }
        );
      });
      environment_symbols.forEach((imagePath) => {
        const name = imagePath.replace(/\.[^/.]+$/, '');
        map.current.loadImage(
          `map/environment-symbols/${imagePath}`,
          (error: any, image: any) => {
            if (error) throw error;
            map.current.addImage(`envSymbols_${name}`, image);
          }
        );
      });
      /* BUILDINGS */
      buildings.forEach((imagePath) => {
        const name = imagePath.replace(/\.[^/.]+$/, '');
        map.current.loadImage(
          `map/buildings/${imagePath}`,
          (error: any, image: any) => {
            if (error) throw error;
            map.current.addImage(`buildings_${name}`, image);
          }
        );
      });

      map.current.addLayer({
        id: 'beach',
        type: 'fill',
        source: 'beach',
        paint: {
          'fill-color': '#333333',
          'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        id: 'base',
        type: 'fill',
        source: 'base',
        paint: {
          'fill-color': '#292929',
          'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        id: 'grass',
        type: 'fill',
        source: 'grass',
        paint: {
          // 'fill-pattern': 'patternDot',
          // 'fill-pattern-width': 1,
          'fill-color': '#56513a',
          'fill-opacity': 0.5,
        },
      });
      map.current.addLayer({
        id: 'desert',
        type: 'fill',
        source: 'desert',
        paint: {
          'fill-color': '#333333',
          'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        id: 'sports-field',
        type: 'fill',
        source: 'sports-field',
        paint: {
          'fill-color': '#56513a',
          'fill-outline-color': '#e86a37',
          'fill-opacity': 1,
        },
      });
      map.current.addLayer({
        id: 'contour',
        type: 'line',
        source: 'contour',
        layout: {
          'line-join': 'miter',
          'line-cap': 'butt',
        },
        // 'paint': {
        //   'line-color': '#4d4d4d',
        //   'line-width': 1
        // }
        paint: {
          'line-color': '#4d4d4d',
          'line-width': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 0.25 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 0.25 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
        },
      });
      map.current.addLayer({
        id: 'trail',
        type: 'line',
        source: 'trail',
        layout: {
          'line-join': 'miter',
          'line-cap': 'butt',
        },
        paint: {
          'line-color': '#e86a37',
          'line-width': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 0.5 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 0.5 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
        },
      });
      map.current.addLayer({
        id: 'secondary-road',
        type: 'line',
        source: 'secondary-road',
        layout: {
          'line-join': 'miter',
          'line-cap': 'butt',
        },
        paint: {
          'line-color': '#e86a37',
          'line-width': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 0.5 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 0.5 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
        },
      });
      map.current.addLayer({
        id: 'primary-road',
        type: 'line',
        source: 'primary-road',
        layout: {
          'line-join': 'miter',
          'line-cap': 'butt',
        },
        paint: {
          'line-color': '#e86a37',
          'line-width': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 1 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 1 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
        },
      });
      map.current.addLayer({
        id: 'highway',
        type: 'line',
        source: 'highway',
        layout: {
          'line-join': 'miter',
          'line-cap': 'butt',
        },
        paint: {
          'line-pattern': 'highway',
          'line-width': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 5 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 5 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
        },
      });
      map.current.addLayer({
        id: 'train',
        type: 'line',
        source: 'train',
        layout: {
          'line-join': 'miter',
          'line-cap': 'butt',
        },
        paint: {
          'line-pattern': 'railway',
          'line-width': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 2 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 2 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
        },
      });

      // ENVIRONMENT ITEMS
      map.current.addLayer({
        id: 'environment-items',
        type: 'symbol',
        source: 'environment-items',
        layout: {
          'icon-image': [
            'match',
            ['get', 'Type', ['properties']],
            'Potager',
            'envItems_bush',
            'Cactus 1',
            'envItems_cactus_1',
            'Cactus 2',
            'envItems_cactus_2',
            'Cratere',
            'envItems_crater',
            'Dune 1',
            'envItems_dune_1',
            'Sapin',
            'envItems_fir',
            'Meule de foin',
            'envItems_haystack',
            'Montagne 1',
            'envItems_mountain_1',
            'Palmier',
            'envItems_palm',
            'Parasol',
            'envItems_parasol',
            'Roche 1',
            'envItems_rock_1',
            'Roche 2',
            'envItems_rock_2',
            'Massif rocheux 1',
            'envItems_rock_mass_1',
            'Massif rocheux 2',
            'envItems_rock_mass_2',
            'Aileron requin',
            'envItems_shark',
            'Fumee 1',
            'envItems_smoke_1',
            'Fumee 2',
            'envItems_smoke_2',
            'Bonhomme de neige',
            'envItems_snowman',
            'Baleine',
            'envItems_whale',
            'Arbre',
            'envItems_tree',
            'none',
          ],
          'icon-size': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 0.008 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 0.008 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
          'icon-allow-overlap': true,
        },
      });

      // BUILDINGS
      map.current.addLayer({
        id: 'buildings',
        type: 'symbol',
        source: 'buildings',
        layout: {
          'icon-image': [
            'match',
            ['get', 'Nom', ['properties']],
            'Porte avion',
            'buildings_aircraft_carrier',
            'Dirigeable',
            'buildings_airship',
            'Arène',
            'buildings_arena',
            'premier contact',
            'buildings_arrival',
            'Caserne',
            'buildings_barracks',
            'Grande roue',
            'buildings_big_wheel',
            'Sphère bioclimatique',
            'buildings_bioclimatic_sphere',
            'Immeuble 1',
            'buildings_building_1',
            'Immeuble 2',
            'buildings_building_2',
            'Immeuble 3',
            'buildings_building_3',
            'Immeuble 4',
            'buildings_building_4',
            'Manège',
            'buildings_carousel',
            'Chateau 1',
            'buildings_castle_1',
            'Chateau 2',
            'buildings_castle_2',
            'Chateau 3',
            'buildings_castle_3',
            'Eglise',
            'buildings_church',
            'Cirque',
            'buildings_circus',
            'Immeuble 1 Ville',
            'buildings_city_building_1',
            'Immeuble 2 Ville',
            'buildings_city_building_2',
            'Immeuble 3 Ville',
            'buildings_city_building_3',
            'Immeuble 4 Ville',
            'buildings_city_building_4',
            'Tour controle',
            'buildings_control_tower',
            'Maison campagne 1',
            'buildings_country_house_1',
            'Maison campagne 2',
            'buildings_country_house_2',
            'Maison campagne 3',
            'buildings_country_house_3',
            'Tour eiffel',
            'buildings_eiffel_tower',
            'Usine',
            'buildings_factory',
            'Ferme',
            'buildings_farm',
            'Eolienne ferme',
            'buildings_farm_wind_turbine',
            'Tour dysto 1',
            'buildings_futuristic_tower_1',
            'Tour dysto 2',
            'buildings_futuristic_tower_2',
            'Grand Budapest Hotel',
            'buildings_grand_budapest_hotel',
            'Hopital',
            'buildings_hospital',
            'Igloo',
            'buildings_igloo',
            'Maison jungle',
            'buildings_jungle_house',
            'Panneau Las Vegas',
            'buildings_las_vegas',
            'Phare',
            'buildings_lighthouse',
            'HLM',
            'buildings_low_rent_housing',
            'Manoir',
            'buildings_manor',
            'Moulin',
            'buildings_mill',
            'Maison modeste',
            'buildings_modest_house',
            'Monastère',
            'buildings_monastery',
            'Motel',
            'buildings_motel',
            'Cinema',
            'buildings_movie_theater',
            'Forage pétrole',
            'buildings_oil_drilling',
            'Palais',
            'buildings_palace',
            'Bateau pirate',
            'buildings_pirate_ship',
            'Grue Port',
            'buildings_port_crane',
            'Tour prison',
            'buildings_prison',
            'Hopital psychiatrique',
            'buildings_psychiatric_hospital',
            'Antenne radio',
            'buildings_radio_antenna',
            'Bateau radio',
            'buildings_radio_ship',
            'Restaurant',
            'buildings_restaurant',
            'Lancement fusée',
            'buildings_rocket_launch',
            'Ruine 1',
            'buildings_ruin_1',
            'Ruine 2',
            'buildings_ruin_2',
            'Ruine 3',
            'buildings_ruin_3',
            'Saloon',
            'buildings_saloon',
            'Ecole',
            'buildings_school',
            'Maison coloniale',
            'buildings_settlers_house',
            'Ferme silot',
            'buildings_silo',
            'Stade',
            'buildings_stadium',
            'Scène',
            'buildings_stage',
            'Statue liberté',
            'buildings_statue_of_liberty',
            'Tour Las Vegas',
            'buildings_stratosphere_tower',
            'Pavillon 1',
            'buildings_suburban_house_1',
            'Pavillon 2',
            'buildings_suburban_house_2',
            'Supermarché',
            'buildings_supermarket',
            'Tour 1',
            'buildings_tower_1',
            'Tour 2',
            'buildings_tower_2',
            'Station train',
            'buildings_train_station',
            'Tunnel',
            'buildings_tunnel',
            'Villa',
            'buildings_villa',
            'Maison blanche',
            'buildings_white_house',
            'Case africaine',
            'buildings_yurt',
            'none',
          ],
          'icon-size': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 0.02 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 0.02 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
          'icon-allow-overlap': true,
        },
      });

      // ENVIRONMENT SYMBOLS
      map.current.addLayer({
        id: 'environment-symbols',
        type: 'symbol',
        source: 'environment-symbols',
        layout: {
          'icon-image': [
            'match',
            ['get', 'Nom', ['properties']],
            'Porte avion',
            'buildings_aircraft_carrier',
            'none',
          ],
          'icon-size': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 0.02 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 0.02 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
          'icon-allow-overlap': true,
        },
      });

      // ZONE
      map.current.addLayer({
        id: 'zones',
        type: 'symbol',
        source: 'zones',
        layout: {
          // 'symbol-placement': 'line',
          // 'text-size': 2,
          'text-field': ['get', 'Nom US', ['properties']],
          'text-size': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 5 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 5 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
          'text-transform': 'uppercase',
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#ee78ac',
        },
      });

      // ADD SUBTITLE
      // map.current.addControl(
      //   new mapboxgl.AttributionControl({
      //     customAttribution: 'Map design by Paradise Pictures',
      //   })
      // );

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
      map.current.addLayer({
        id: 'movies',
        type: 'symbol',
        source: 'movies',
        minzoom: limitShowingMarkers,
        layout: {
          // 'text-field': ['step', ['zoom'], "", 10, ['get', 'title']],
          // 'text-field': ['get', 'title', ['get','fr', ['properties']]],
          'text-field': ['get', 'title_fr', ['properties']],
          'text-size': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 2 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 2 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
          // 'text-allow-overlap': true,
          'text-overlap': 'cooperative',
          // 'text-size': 10,
          'text-anchor': 'left',
          'text-offset': [1.5, 0],
          'icon-image': 'vegetationTree',
          'icon-size': 0.05,
        },
        paint: {
          'text-color': '#ffe974',
          'text-halo-color': 'black',
          'text-halo-width': {
            type: 'exponential',
            base: 2,
            stops: [
              [0, 0.01 * Math.pow(2, 0 - viewport.baseZoom)],
              [24, 0.01 * Math.pow(2, 24 - viewport.baseZoom)],
            ],
          },
          'text-halo-blur': 1,
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
      <div className="w-full h-full flex flex-col relative bg-black">
        {/* HEADER MAP */}
        <div className="absolute  pt-4 px-4 gap-2  w-full pointer-events-none flex flex-col justify-between lg:flex-row">
          <MapSearchbar />
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
