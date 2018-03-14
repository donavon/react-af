import createReactAF from './createReactAF';

const Fragment = 'fragment';

class ComponentStub {}

const React15xStub = {
  Component: ComponentStub,
  PureComponent: ComponentStub,
  PropTypes: true,
  createClass: true,
  other: 'other',
};

const React162Stub = {
  Component: ComponentStub,
  PureComponent: ComponentStub,
  Fragment,
};

const React163Stub = {
  StrictMode: true,
};

describe('createReactAF', () => {
  describe('when passed React 15.x', () => {
    const ReactAF = createReactAF(React15xStub);

    const component = new ReactAF.Component();
    const pureComponent = new ReactAF.PureComponent();

    test('isGetDerivedStateFromPropsEmulated is set to true', () => {
      expect(ReactAF.isGetDerivedStateFromPropsEmulated).toBe(true);
    });
    test('isFragmentEmulated is set to true', () => {
      expect(ReactAF.isFragmentEmulated).toBe(true);
    });
    test('createContext is emulated"', () => {
      expect(typeof ReactAF.createContext).toBe('function');
      expect(ReactAF.isCreateContextEmulated).toBe(true);
    });
    test('Fragment is emulated"', () => {
      expect(ReactAF.Fragment).toBe('div');
    });
    test('PropTypes is undefined"', () => {
      expect(ReactAF.PropTypes).toBe(undefined);
    });
    test('createClass is undefined"', () => {
      expect(ReactAF.createClass).toBe(undefined);
    });
    test('others properties/methods are passed through"', () => {
      expect(ReactAF.other).toBe(React15xStub.other);
    });
    test('ReactAF.Component inherits from React.Component', () => {
      expect(component instanceof React15xStub.Component).toBe(true);
    });
    test('ReactAF.PureComponent inherits from React.PureComponent', () => {
      expect(pureComponent instanceof React15xStub.PureComponent).toBe(true);
    });
  });

  describe('when passed React 16.2', () => {
    const ReactAF = createReactAF(React162Stub);

    test('isGetDerivedStateFromPropsEmulated is set to true', () => {
      expect(!!ReactAF.isGetDerivedStateFromPropsEmulated).toBe(true);
    });
    test('isFragmentEmulated is set to false', () => {
      expect(!!ReactAF.isFragmentEmulated).toBe(false);
    });
    test('Fragment is NOT emulated"', () => {
      expect(ReactAF.Fragment).toBe(React162Stub.Fragment);
    });
  });

  describe('when passed React 16.3', () => {
    const ReactAF = createReactAF(React163Stub);

    test('React is returned as-is', () => {
      expect(ReactAF).toBe(React163Stub);
    });
  });
});
