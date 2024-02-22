import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SentimentalPicker = ({ value, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (itemValue) => {
    setSelectedValue(itemValue);
    onChange(itemValue);
  };

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleChange}
        style={{ flex: 1 }}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>
    </View>
  );
};

export default SentimentalPicker;
