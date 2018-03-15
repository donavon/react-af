# react-af
[![Build Status](https://travis-ci.org/donavon/react-af.svg?branch=master)](https://travis-ci.org/donavon/react-af) [![npm version](https://img.shields.io/npm/v/react-af.svg)](https://www.npmjs.com/package/react-af)

![React AF graffiti wall](https://user-images.githubusercontent.com/887639/37485417-c7c50fb8-2861-11e8-8e64-363c0e02372a.png)

## TL;DR

- Allows you to code using certain React.next features today!
- Perfect for component library maintainers.
- It does for React what Babel does for JavaScript.
- Support `getDerivedStateFromProps` on older versions of React.
- Supports `Fragment` on older versions of React.
- Supports `createContext` (the new context API) on older versions of React.

## What is this project?

Starting with React 17, several class component lifecycles will be deprecated:
`componentWillMount`, `componentWillReceiveProps`, and `componentWillUpdate` (see [React RFC 6](https://github.com/reactjs/rfcs/pull/6)). 

One problem that React component library developers face is that they don't control the version of React that they run on —
this is controlled by the consuming application.
This leaves library developers in a bit of a quandary.
Should they use feature detection or 
code to the lowest denominator?

`react-af` emulates newer features of React on older versions,
allowing developers to concentrate on the business problem
and not the environment.

## Install

Install `react-af` using npm:
```sh
$ npm install react-af --save
```

or with Yarn:
```sh
$ yarn add react-af
```

## Import

In your code, all you need to do is change the React import from this:
```js
import React from 'react';
```

To this:
```js
import React from 'react-af';
```

That's it! You can now code your library components as though
they are running on a modern React (not all features supported... yet), 
even though your code may be running on an older version.

`react-af` imports from `react` under the hood
(it has a `peerDependency` of React >=15),
patching or passing through features where necessary.

## API

Here are the modern React features that you can use, even if yur code is running
on older version of React 15 or React 16.

### `getDerivedStateFromProps`

`react-af` supports new static lifecycle `getDerivedStateFromProps`. 

Here is an example component written using
`componentWillReceiveProps`.
```js
class ExampleComponent extends React.Component {
  state = { text: this.props.text };

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.setState({
        text: nextProps.text
      });
    }
  }
}
```

And here it is after converting to be compatible with modern React.
```js
class ExampleComponent extends React.Component {
  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.text !== nextProps.text
      ? {
        text: nextProps.text
      }
      : null;
  }
}
```

### Fragment

Starting with React 16.2, there is a new `<Fragment />` component
that allows you to return multiple children.
Prior to 16.2, you needed to wrap multiple children in a wrapping `div`.

With `react-af`, you can use `React.Fragment` on older versions of React as well.

```jsx
import React, { Fragment } from 'react-af';

const Weather = ({ city, degrees }) => (
  <Fragment>
    <div>{city}</div>
    <div>{degrees}℉</div>
  </Fragment>
);
```

The code above works natively in React 16.2 and greater. 
In lesser versions of React, `Fragment` is replaced with a `div` automatically.

### createContext

React 16.3 also added support for the new context API.
Well `react-af` supports that as well.

Here's an example take from Kent Dodds's article
[React’s new Context API](https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b).

```js
import React, { createContext, Component } from 'react-af';

const ThemeContext = createContext('light')
class ThemeProvider extends Component {
  state = {theme: 'light'}
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}
class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <ThemeContext.Consumer>
          {val => <div>{val}</div>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    )
  }
}
```

## Other projects

### `react-lifecycles-compat`

You might also want to take a look at
`react-lifecycles-compat` by the
[React team](https://github.com/reactjs/react-lifecycles-compat).
It doesn't support `Fragment` or `createContext` and it requires additional
plumbing to setup, but it's lighter and may be adequate for some projets.

### `create-react-context`

If all you need is context support, consider using
[`create-react-context`](https://github.com/jamiebuilds/create-react-context),
which is what this package uses to emulate `createContext()`.

## What's with the name?

ReactAF  stands for React Always Fresh (or React As F&#%!).
Your choice.
