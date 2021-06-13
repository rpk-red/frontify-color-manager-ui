import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ColorDashboard, Error } from "Pages";
import { PAGE_COLOR_DASHBOARD, PAGE_ERROR } from "Constants";

const App = (): React.ReactElement => {
  return (
    <Switch>
      <Route path={[PAGE_COLOR_DASHBOARD]} component={ColorDashboard} />
      <Route path={PAGE_ERROR} component={Error} />
      <Route
        exact
        path="/"
        component={() => <Redirect to={PAGE_COLOR_DASHBOARD} />}
      />
      <Route path="*" component={() => <Redirect to={PAGE_ERROR} />} />
    </Switch>
  );
};

export default App;
