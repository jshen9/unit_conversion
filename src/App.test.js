import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {volumeConverter, valueEqual} from './service/converter';

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

