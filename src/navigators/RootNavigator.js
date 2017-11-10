import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import Home from './../components/Home';
import SampleA from './../components/SampleA';
import SampleB from './../components/SampleB';

const tabScenes = {
  Home: { screen: Home },
  ScreenA: { screen: SampleA },
  ScreenB: { screen: SampleB },
};

const tabOptions = {
  initialRouteName: 'Home',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#083352',
    inactiveTintColor: '#cfedff',
    labelStyle: {
      fontSize: 20,
    },
  },
};

export const RootNavigator = TabNavigator(tabScenes, tabOptions);

const TabRouter = ({ dispatch, nav }) => (
  <RootNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })} />
);

TabRouter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

export default connect(state => ({
  nav: state.nav
}))(TabRouter);
