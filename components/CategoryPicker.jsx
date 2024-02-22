import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CategoryPicker = ({ value, onChange }) => {
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
        <Picker.Item label="Heirloom" value="1" />
        <Picker.Item label="Vehicle" value="2" />
        <Picker.Item label="Artwork" value="3" />
        <Picker.Item label="Investment" value="4" />
      </Picker>
    </View>
  );
};

export default CategoryPicker;
