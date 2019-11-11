import React from "react";
import CollectionsOverview from "../../collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionsPage from "../collections/collections.component";

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionsPage} />
  </div>
);

export default ShopPage;
