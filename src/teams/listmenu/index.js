import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { css } from 'styled-components';
import Icon from 'react-components-kit/dist/Icon';

import logoMapper from '../../logoMapper';
import {
  getTeams,
  selectTeam,
  toggleTeamDetails,
  getDetailsVisibility,
  getSelectedTeam,
} from '../teams.ducks';


const propTypes = {
  toggleTeamDetails: PropTypes.func.isRequired,
  selectTeam: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
  teamDetailsVisible: PropTypes.bool.isRequired,
  selectedTeam: PropTypes.object,
};

class TeamListMenuContainer extends Component {
  render() {
    const { teams, teamDetailsVisible, selectedTeam } = this.props;

    return (
      <Wrapper expanded={teamDetailsVisible}>
        <ToggleDetails onClick={this.props.toggleTeamDetails}>
          <Icon
            name='ios-arrow-thin-right'
            color='#fff'
            size='32px'
            style={{
              transition: 'transform 0.3s ease',
              transform: teamDetailsVisible ? 'rotate(180deg)' : 'none',
            }}
          />
        </ToggleDetails>

        <Teams>
          {teams.map(team =>
            <TeamRow
              key={team.id}
              expanded={teamDetailsVisible}
              selected={selectedTeam && (team.id === selectedTeam.id)}
              onClick={() => this.props.selectTeam(team)}
            >
              <TeamLogo logo={logoMapper[team.id]} />
              <TeamName>{team.name}</TeamName>
            </TeamRow>
          )}
        </Teams>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  height: 100vh;
  width: ${props => props.expanded ? 200 : 60}px;
  will-change: width;
  transition: width 0.3s ease-in;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  box-shadow: 2px 0px 16px rgba(0,0,0,0.2);
  z-index: 999;
`;

const ToggleDetails = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primaryColor};

  &:hover {
    background-color: ${props => props.theme.primaryColorDark};
  }

  &:active {
    background-color: ${props => props.theme.primaryColorDarkest};
  }
`;

const Teams = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamLogo = styled.div`
  height: 40px;
  width: 40px;
  margin: 10px;
  display: inline-block;
  flex: none;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  background-image: url(${props => props.logo});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const TeamName = styled.div`
  padding: 0px 8px;
  opacity: 0;
  transition: opacity 0.3s linear;
  position: absolute;
  left: 60px;
  width: 140px;
`;

const TeamRow = styled.div`
  height: 60px;
  width: 100%;
  position: relative;
  flex: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &:active {
    background-color: #ccc;
  }

  ${props => props.selected && css`
    background-color: ${props.theme.primaryColorLightest};

    &:hover,
    &:active {
      background-color: ${props.theme.primaryColorLightest};
    }

    ${TeamLogo} {
      border: 1px solid ${props.theme.primaryColor};
    }
  `}

  ${props => props.expanded && css`
    ${TeamName} {
      pointer-events: none;
      opacity: 1;
    }
  `}
`;

TeamListMenuContainer.propTypes = propTypes;

const mapStateToProps = state => ({
  teams: getTeams(state),
  teamDetailsVisible: getDetailsVisibility(state),
  selectedTeam: getSelectedTeam(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectTeam,
  toggleTeamDetails,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamListMenuContainer);
