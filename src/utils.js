/* eslint-disable import/prefer-default-export */

const setKeyOnTarget = setFn => (target, key) => {
  // eslint-disable-next-line no-param-reassign
  target[key] = setFn(key);
  return target;
};

export const objectWithoutProperties = (obj, keysArr) => {
  const keys = keysArr.reduce(setKeyOnTarget(key => key), {});
  return Object.keys(obj)
    .filter(key => !keys[key])
    .reduce(setKeyOnTarget(key => obj[key]), {});
};
