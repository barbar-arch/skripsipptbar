import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextAreaInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor="#718096"
      underlineColor="#A0AEC0"
      multiline={true}
      dense={true}
      numberOfLines={5}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    color: '#2D3748',
    backgroundColor: '#EDF2F7',
    fontSize: 12,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextAreaInput);
