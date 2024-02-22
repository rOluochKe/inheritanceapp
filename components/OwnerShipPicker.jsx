import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const OwnerShipPicker = ({ value, onChange }) => {
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
        <Picker.Item label="Sole Owner" value="Sole Owner" />
        <Picker.Item label="Joint Owner" value="Joint Owner" />
        <Picker.Item label="Other" value="Other" />
      </Picker>
    </View>
  );
};

export default OwnerShipPicker;
