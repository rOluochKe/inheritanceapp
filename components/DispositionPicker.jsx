import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DispositionPicker = ({ value, onChange }) => {
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
        <Picker.Item label="Keep" value="Keep" />
        <Picker.Item label="Sell" value="Sell" />
        <Picker.Item label="Donate" value="Donate" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
    </View>
  );
};

export default DispositionPicker;
