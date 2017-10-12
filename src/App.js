import React, { Component } from 'react';
// import styled from 'styled-components';
import { Layout, Gutter } from 'react-components-kit';

import withAPIs from './init/withAPIs';
import TeamListMenu from './teams/listmenu';
import Playlist from './videos/playlist';
import VideoDetails from './videos/details';

class App extends Component {
  render() {
    return (
      <Layout>
        <TeamListMenu />
        <Gutter amount='60px' />
        <Layout.Box flex='2'>
          <Playlist />
        </Layout.Box>
        <Layout.Box flex='3'>
          <VideoDetails />
        </Layout.Box>
      </Layout>
    );
  }
}

export default withAPIs(App);
