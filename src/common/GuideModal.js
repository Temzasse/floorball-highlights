import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-components-kit/dist/Button';
import ToggleSwitch from 'react-components-kit/dist/ToggleSwitch';
import Divider from 'react-components-kit/dist/Divider';
import Heading from 'react-components-kit/dist/Heading';
import Text from 'react-components-kit/dist/Text';
import Modal from 'react-components-kit/dist/Modal';
import Layout from 'react-components-kit/dist/Layout';
import Gutter from 'react-components-kit/dist/Gutter';
import theme from '../assets/theme';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  filteringToggled: PropTypes.bool.isRequired,
  onToggleFiltering: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
};

const GuideModal = ({ visible, filteringToggled, onToggleFiltering, hide }) => (
  <Modal
    visible={visible}
    hide={hide}
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
            isToggled={filteringToggled}
            onToggle={onToggleFiltering}
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
        <Button flat onClick={hide}>OK</Button>
      </Modal.Footer>
    </Modal.Body>
  </Modal>
);

GuideModal.propTypes = propTypes;

export default GuideModal;
