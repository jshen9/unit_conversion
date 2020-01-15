import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {volumeConverter, valueEqual, temperatureConverter} from './service/converter';
import {nameToSymbol, getValueByName} from './service/temperature';

test('Test volume convert from liter to tablespoons', () => {
  const result = volumeConverter(12, 'l', 'in3');
  const v = valueEqual(result, 732.3);
  expect(v).toBe(true);
});

test('Test volume convert from cups to tablespoons', () => {
  const result = volumeConverter(14, 'cup', 'tsp');
  const v = valueEqual(result, 672.0);
  expect(v).toBe(true);
});

test('Test temperature convert from Rankine to Kevin', () => {
  const result = temperatureConverter(12, 'Rankine');
  const targetValue = getValueByName('Kelvin', result);
  const v = valueEqual(targetValue, 6.7);
  expect(v).toBe(true);
});

test('Test temperature convert from Celsius to Kevin', () => {
  const result = temperatureConverter(12, 'Celsius');
  const targetValue = getValueByName('Kelvin', result);
  const v = valueEqual(targetValue, 285.1);
  expect(v).toBe(true);
});

test('Test temperature convert from Celsius to Fahrenheit', () => {
  const result = temperatureConverter(12, 'Celsius');
  const targetValue = getValueByName('Fahrenheit', result);
  const v = valueEqual(targetValue, 53.6);
  expect(v).toBe(true);
});

test('Test volume convert from liters to Fahrenheit', () => {
  const result = volumeConverter(12, 'l', 'Fahrenheit');
  expect(result).toBe(null);
});

test('Test volume convert from cubic-inch to gallon', () => {
  const result = volumeConverter(12, 'in3', 'gal');
  const v = valueEqual(result, 0.1);
  expect(v).toBe(true);
});

test('Test volume convert from cup to gallon', () => {
  const result = volumeConverter(12, 'cup', 'gal');
  const v = valueEqual(result, 0.8);
  expect(v).toBe(true);
});

test('Test volume convert from cup to gallon', () => {
  const result = volumeConverter(12, 'ft3', 'tsp');
  const v = valueEqual(result, 68940.4);
  expect(v).toBe(true);
});