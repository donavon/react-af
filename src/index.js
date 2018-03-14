import React from 'react';
import createReactAF from './createReactAF';

const ReactAF = createReactAF(React);

module.exports = ReactAF.default ? ReactAF.default : ReactAF;
