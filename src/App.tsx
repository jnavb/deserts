import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import routes, { path } from './routes/routes';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route
              exact
              key={route.path as string}
              path={route.path}
              render={() => <route.component />}
            />
          ))}
          <Route path="*">
            <Redirect to={path.products} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
