import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'react-components-kit/dist/Layout';
import Gutter from 'react-components-kit/dist/Gutter';
import media from 'react-components-kit/dist/media';
import Modal from 'react-components-kit/dist/Modal';
import Icon from 'react-components-kit/dist/Icon';
import Button from 'react-components-kit/dist/Button';
import ToggleSwitch from 'react-components-kit/dist/ToggleSwitch';
import Divider from 'react-components-kit/dist/Divider';
import Heading from 'react-components-kit/dist/Heading';
import Text from 'react-components-kit/dist/Text';

import { getSelectedTeam } from './teams/teams.ducks';
import { init } from './init/init.ducks';
import {
  getSelectedVideo,
  getFilteringStatus,
  toggleFiltering,
} from './videos/videos.ducks';
import goalImg from './assets/goal.svg';
import playImg from './assets/play.svg';
import withAPIs from './init/withAPIs';
import TeamListMenu from './teams/listmenu';
import Playlist from './videos/playlist';
import VideoDetails from './videos/details';
import EmptyState from './common/EmptyState';
import theme from './assets/theme';

class App extends Component {
  static propTypes = {
    filtering: PropTypes.bool.isRequired,
    toggleFiltering: PropTypes.func.isRequired,
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
    const { selectedTeam, selectedVideo, filtering } = this.props;
    const { showInfo } = this.state;

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

        <Modal
          visible={showInfo}
          hide={this.toggleInfo}
          backdropBg='rgba(33, 37, 96, 0.8)'
          elevation={99999}
        >
          <Modal.Body>
            <Heading color={theme.secondaryColor} style={{ marginTop: 0 }}>
              Asetukset:
            </Heading>
            <Layout align='center'>
              <Layout.Box flex='1'>
                Yritä näyttää vain maalikoosteet:
              </Layout.Box>
              <Layout.Box>
                <ToggleSwitch
                  isToggled={filtering}
                  onToggle={this.props.toggleFiltering}
                />
              </Layout.Box>
            </Layout>
            <Divider />
            <Text bold color={theme.secondaryColor}>
              HUOM!&nbsp;
            </Text>
            <Text p>
              Suosittelemme sinua lisäämään tämän sovelluksen puhelimesi kotivalikkoon,
              jotta käyttökokemuksesi olisi mahdollisimman hyvä.
            </Text>
            <Gutter vertical />
            <Text p>
              Kotivalikkoon lisääminen onnistuu selaimesi asetuksista kohdasta&nbsp;
              <Text i>Lisää kotivalikkoon</Text> tai <Text i>Add to Homescreen</Text>.
            </Text>
            <Gutter vertical />
            <Modal.Footer>
              <Button flat onClick={this.toggleInfo}>OK</Button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>

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

const Info = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const mapStateToProps = state => ({
  selectedVideo: getSelectedVideo(state),
  selectedTeam: getSelectedTeam(state),
  filtering: getFilteringStatus(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleFiltering,
  init,
}, dispatch);

const AppEnhanced = withAPIs(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppEnhanced);
