/* eslint-disable react/no-multi-comp */
import createReactContext from 'create-react-context';
import { objectWithoutProperties } from './utils';

const EmulatedFragment = 'div';

function getDerivedStateFromProps(instance, props, prevState) {
  const state = instance.constructor.getDerivedStateFromProps(props, prevState);
  if (state) {
    instance.setState(state);
  }
}

function componentWillMount() {
  getDerivedStateFromProps(this, this.props, this.state);
}
// eslint-disable-next-line no-underscore-dangle
componentWillMount.__suppressDeprecationWarning = true;

function componentWillReceiveProps(nextProps) {
  getDerivedStateFromProps(this, nextProps, this.state);
}
// eslint-disable-next-line no-underscore-dangle
componentWillReceiveProps.__suppressDeprecationWarning = true;

function setMethodSafe(instance, method, fn) {
  if (instance[method]) {
    throw new Error(`[${instance.constructor.name}] ${method} has been deprecated`);
  }
  // eslint-disable-next-line no-param-reassign
  instance[method] = fn;
}

function enhanceComponent(instance) {
  if (instance.constructor.getDerivedStateFromProps) {
    setMethodSafe(instance, 'componentWillMount', componentWillMount);
    setMethodSafe(instance, 'componentWillReceiveProps', componentWillReceiveProps);
  }
}

const createReactAF = React => (
  React.StrictMode // 16.3 and above?
    ? React // Return as-is.
    : {
      ...(objectWithoutProperties(React, ['PropTypes', 'createClass'])), // So 15.x doesn't warn.
      Component:
      class ReactAFComponent extends React.Component {
        constructor(...args) {
          super(...args);
          enhanceComponent(this);
        }
      },
      PureComponent:
      class ReactAFPureComponent extends React.PureComponent {
        constructor(...args) {
          super(...args);
          enhanceComponent(this);
        }
      },
      isGetDerivedStateFromPropsEmulated: true,
      Fragment: React.Fragment || EmulatedFragment,
      isFragmentEmulated: !React.Fragment,
      createContext: React.createContext || createReactContext,
      isCreateContextEmulated: !React.createContext,
    }
);

export default createReactAF;
