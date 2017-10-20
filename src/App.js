import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'react-components-kit/dist/Layout';
import Gutter from 'react-components-kit/dist/Gutter';
import media from 'react-components-kit/dist/media';
import Icon from 'react-components-kit/dist/Icon';

import { getSelectedTeam } from './teams/teams.ducks';
import { init } from './init/init.ducks';
import {
  getSelectedVideo,
  getFilteringStatus,
  toggleFiltering,
  getVideoActiveStatus,
} from './videos/videos.ducks';

import goalImg from './assets/goal.svg';
import withAPIs from './init/withAPIs';
import theme from './assets/theme';
import TeamListMenu from './teams/listmenu';
import Playlist from './videos/playlist';
import VideoDetails from './videos/details';
import EmptyState from './common/EmptyState';
import GuideModal from './common/GuideModal';

class App extends Component {
  static propTypes = {
    filtering: PropTypes.bool.isRequired,
    toggleFiltering: PropTypes.func.isRequired,
    videoActive: PropTypes.bool.isRequired,
    selectedTeam: PropTypes.object,
    selectedVideo: PropTypes.object,
  }

  state = {
    showInfo: false, // TODO: move this to Redux
  }

  componentWillMount() {
    this.props.init();
  }

  toggleInfo = () => {
    this.setState(prev => ({ showInfo: !prev.showInfo }));
  }

  render() {
    const { selectedTeam, selectedVideo, filtering, videoActive } = this.props;
    const { showInfo } = this.state;

    return (
      <Content>
        <TeamListMenu />
        <Gutter amount='60px' />

        {(selectedTeam || selectedVideo) ?
          [
            <PlaylistWrapper disableScroll={videoActive}>
              <Playlist />
            </PlaylistWrapper>,
            <VideoDetailsWrapper flex='1'>
              <VideoDetails />
            </VideoDetailsWrapper>
          ] :
          <EmptyWrapper flex='1'>
            <EmptyState
              img={goalImg}
              text='Valitse ensin joukkue klikkaamalla logoa'
            />
          </EmptyWrapper>
        }

        <Info>
          <Icon
            name='information-circled'
            size='24px'
            onClick={this.toggleInfo}
            color={theme.primaryColor}
          />
        </Info>

        <GuideModal
          onToggleFiltering={this.props.toggleFiltering}
          filteringToggled={filtering}
          visible={showInfo}
          hide={this.toggleInfo}
        />

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
    ${props => props.disableScroll && 'overflow-y: hidden;'}
  `}
`;

const VideoDetailsWrapper = styled(Layout.Box)`
  padding: 16px 32px 16px 0px;

  ${media.tablet`
    flex: none;
    padding: 0px;
  `}
`;

const EmptyWrapper = styled(Layout.Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const mapStateToProps = state => ({
  selectedVideo: getSelectedVideo(state),
  selectedTeam: getSelectedTeam(state),
  filtering: getFilteringStatus(state),
  videoActive: getVideoActiveStatus(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleFiltering,
  init,
}, dispatch);

const AppEnhanced = withAPIs(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppEnhanced);
