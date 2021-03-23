import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import GuestSignup from "./GuestSignup";
import OwnerSignup from "./OwnerSignup";
import OwnerLogin from "./OwnerLogin";
import GuestLogin from "./GuestLogin";
import GuestDashboard from "./GuestDashboard";
import OwnerDashboard from "./OwnerDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";
import OwnerRoute from "./OwnerRoute";
import NotFound from "./NotFound";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Switch>
        {/* switch will execute the first child of the match */}
        <Route exact path="/" component={Home} />
        <Route exact path="/guestsignup" component={GuestSignup} />
        <Route exact path="/ownersignup" component={OwnerSignup} />
        <Route exact path="/guestlogin" component={GuestLogin} />
        <Route exact path="/ownerlogin" component={OwnerLogin} />
        <GuestRoute exact path="/guest/dashboard" component={GuestDashboard} />
        <OwnerRoute exact path="/owner/dashboard" component={OwnerDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
