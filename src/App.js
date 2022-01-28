import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import UserProvider from "./providers/UserProvider";


function App() {
return (
    <UserProvider>
        <Router>
            <Switch>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    </UserProvider>
);
}

export default App;