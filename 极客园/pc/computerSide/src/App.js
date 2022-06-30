import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import { AuthRoute } from "@/components/AuthRoute";
import { customHistory } from '@/utils'

import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <AuthRoute path="/home" component={GeekLayout}></AuthRoute>
          <Route path="/login" component={Login} history={customHistory}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
