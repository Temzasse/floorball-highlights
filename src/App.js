import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Layout from 'react-components-kit/dist/Layout';
import Gutter from 'react-components-kit/dist/Gutter';
import media from 'react-components-kit/dist/media';

import { getSelectedTeam } from './teams/teams.ducks';
import { getSelectedVideo } from './videos/videos.ducks';
import fieldImg from './assets/field.svg';
import playImg from './assets/play.svg';
import withAPIs from './init/withAPIs';
import TeamListMenu from './teams/listmenu';
import Playlist from './videos/playlist';
import VideoDetails from './videos/details';
import EmptyState from './common/EmptyState';

class App extends Component {
  render() {
    const { selectedTeam, selectedVideo } = this.props;

    return (
      <Content>
        <TeamListMenu />
        <Gutter amount='60px' />

        {(selectedTeam || selectedVideo) ?
          [
            <PlaylistWrapper>
              <Playlist />
            </PlaylistWrapper>,
            <VideoDetailsWrapper flex='1'>
              <VideoDetails />
              {!selectedVideo &&
                <DesktopEmpty>
                  <EmptyState img={playImg} text='Valitse video listasta' />
                </DesktopEmpty>
              }
            </VideoDetailsWrapper>
          ] :
          <EmptyWrapper flex='1'>
            <EmptyState
              img={fieldImg}
              text='Valitse ensin joukkue klikkaamalla logoa'
            />
          </EmptyWrapper>
        }

      </Content>
    );
  }
}

const Content = styled(Layout)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const PlaylistWrapper = styled(Layout.Box)`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 32px;
  width: 450px;

  ${media.tablet`
    flex: 1;
    width: 100%;
    padding: 12px;
  `}
`;

const VideoDetailsWrapper = styled(Layout.Box)`
  padding: 16px 32px 16px 0px;

  ${media.tablet`
    flex: none;
    padding: 0px;
  `}
`;

const DesktopEmpty = styled.div`
  ${media.tablet`
    display: none;
  `}
`;

const EmptyWrapper = styled(Layout.Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mapStateToProps = state => ({
  selectedVideo: getSelectedVideo(state),
  selectedTeam: getSelectedTeam(state),
});

const AppEnhanced = withAPIs(App);

export default connect(mapStateToProps)(AppEnhanced);
