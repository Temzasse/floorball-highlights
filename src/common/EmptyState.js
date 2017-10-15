import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from 'react-components-kit/dist/Heading';
import Layout from 'react-components-kit/dist/Layout';
import theme from '../assets/theme';

const propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

const EmptyState = ({ text, img }) => (
  <Wrapper align='center' justify='center' column>
    <Image src={img} />
    <CenterHeading h4 color={theme.secondaryColor} size='22px' >
      {text}
    </CenterHeading>
  </Wrapper>
);

const Wrapper = styled(Layout)`
  padding: 16px;
`;

const Image = styled.img`
  max-width: 200px;
  width: 100%;
`;

const CenterHeading = styled(Heading)`
  text-align: center;
`;

EmptyState.propTypes = propTypes;

export default EmptyState;
