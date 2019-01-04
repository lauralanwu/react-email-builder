/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Nav from 'components/Nav';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 1em * 2);
  margin: 0 auto;
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  height: 100%;
`;

const RouterWrapper = styled.div`
  flex-grow: 1;
`;

RouterWrapper.propTypes = {
  role: PropTypes.string,
};

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Nav />
      <RouterWrapper role="main">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </RouterWrapper>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}
