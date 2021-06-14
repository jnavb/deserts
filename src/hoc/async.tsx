import React from 'react';

const withAsync = (factoryComponent: () => Promise<any>) =>
  class extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    componentDidMount() {
      factoryComponent()
        .then((module: any) => module.default || module)
        .then((Component) => this.setState({ Component }));
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component /> : <></>;
    }
  };

export default withAsync;
