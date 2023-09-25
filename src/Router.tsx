import { BrowserRouter, Route, Switch } from "react-router-dom";
import Weapons from "./routes/Weapons";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Weapons />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
