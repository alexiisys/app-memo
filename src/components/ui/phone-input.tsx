import React from 'react';
import { View } from 'react-native';
import PhoneInput, {
  type ICountry,
} from 'react-native-international-phone-number';

import { colors } from '@/components/ui/index';
import { Text } from '@/components/ui/text';
import { useSelectedTheme } from '@/lib';

type PhoneInputProps = {
  label: string;
  onChange?: (value: string) => void;
};

const _PhoneInput = ({ label, onChange }: PhoneInputProps) => {
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';
  const [selectedCountry, setSelectedCountry] = React.useState<null | ICountry>(
    null
  );
  const [inputValue, setInputValue] = React.useState('');

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
    onChange &&
      onChange(`${selectedCountry?.callingCode || ''} ${phoneNumber}`);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }
  return (
    <View>
      <Text className="mb-2 font-gilroy-500 text-grey">{label}</Text>
      <View className="relative flex-row">
        <PhoneInput
          defaultCountry={'US'}
          phoneInputStyles={{
            container: {
              borderColor: isDark ? colors.dark : colors.light,
              borderRadius: 10,
              backgroundColor: isDark ? colors.dark : colors.light,
            },
            flag: {},
            caret: {
              display: 'none',
            },
            flagContainer: {
              backgroundColor: isDark ? colors.dark : colors.light,
            },
            divider: {
              display: 'none',
            },
            callingCode: {
              color: isDark ? colors.white : undefined,
              fontWeight: 'normal',
            },
            input: {
              fontFamily: 'Roboto_400Regular',
              color: isDark ? colors.white : colors.black,
            },
          }}
          placeholder={'*** *** ***'}
          value={inputValue}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
        />
      </View>
    </View>
  );
};

export default _PhoneInput;
