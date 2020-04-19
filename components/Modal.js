import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Config from 'FinalFormReactNative/services/config';
const { Colors } = Config;

const ModalPage = (props) => {
  const { children, style = {}, onRequestClose, ...rest } = props;
  const { backgroundColor = Colors.background } = StyleSheet.flatten(style);

  return (
    <Modal onRequestClose={onRequestClose} {...rest}>
      <View style={[styles.container, style]}>
        <Header
          containerStyle={{ borderBottomWidth: undefined }}
          backgroundColor={backgroundColor}
          leftComponent={
            <Icon
              accessible
              accessibilityLabel="Close"
              testID="CloseIcon"
              name="clear"
              type="material-icons"
              color="#4d80e4"
              onPress={() => {
                onRequestClose();
              }}
            />
          }
        />
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default ModalPage;
