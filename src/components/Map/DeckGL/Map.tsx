"use client"

import React from 'react';
import DeckGL from '@deck.gl/react';
import {MapViewState} from '@deck.gl/core';
import {LineLayer, ScatterplotLayer} from '@deck.gl/layers';

import base from '@/components/Map/OLD/style/layers/base.json';

const INITIAL_VIEW_STATE: MapViewState = {
	longitude: 2.5,
	latitude: 48.5,
	zoom: 8,
	maxZoom: 20,
	minZoom: 6,
	bearing: 0,
	pitch: 0,
};

type DataType = {
	from: [longitude: number, latitude: number];
	to: [longitude: number, latitude: number];
  };

export const Map = () => {
	const layers = [
		new ScatterplotLayer<DataType>({
			id: 'layer-base',
			data: '/map/layers/base.json',
			getPosition: [48.8, 1.25],
			getFillColor: [255, 0, 0],
			getRadius: 1000,
		}),
		// new LineLayer<DataType>({
		//   id: 'layer-base',
		//   data: '/map/layers/base.json',
		//   getSourcePosition: (d: DataType) => d.from,
		//   getTargetPosition: (d: DataType) => d.to,
		//   getColor: [0, 128, 200],
		//   getWidth: 5,
		// }),
	  ];

	return (
		<DeckGL
			initialViewState={INITIAL_VIEW_STATE}
			controller
			layers={layers}
		>
		</DeckGL>
	)
}