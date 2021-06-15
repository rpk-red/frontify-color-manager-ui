import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ColorDashboard, Error } from "Pages";
import { PATH_PAGE_ERROR, PATH_PAGE_COLOR_DASHBOARD } from "Constants";

const App = (): React.ReactElement => {
  return (
    <Switch>
      <Route path={PATH_PAGE_COLOR_DASHBOARD} component={ColorDashboard} />
      <Route path={PATH_PAGE_ERROR} component={Error} />
      <Route
        exact
        path="/"
        component={() => <Redirect to={PATH_PAGE_COLOR_DASHBOARD} />}
      />
      <Route path="*" component={() => <Redirect to={PATH_PAGE_ERROR} />} />
    </Switch>
  );
};

export default App;
