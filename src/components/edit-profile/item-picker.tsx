import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ArrowRight } from '@/components/ui/icons';

import { Input, Options, type OptionType, useModal } from '../ui';

type ItemPickerProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
  values: { label: string; value: string }[];
};

const ItemPicker = ({ label, values, value, onChange }: ItemPickerProps) => {
  const modal = useModal();
  const onSelect = React.useCallback(
    (option: OptionType) => {
      onChange(option.value as string);
      modal.dismiss();
    },
    [modal, onChange]
  );

  const selectedItem = React.useMemo(
    () => values.find((item) => item.value === value),
    [values, value]
  );

  return (
    <>
      <TouchableOpacity className="flex-1" onPress={modal.present}>
        <Input
          label={label}
          value={selectedItem?.label}
          editable={false}
          icon={<ArrowRight className="rotate-90" />}
        />
      </TouchableOpacity>
      <Options ref={modal.ref} options={values} onSelect={onSelect} />
    </>
  );
};

export default ItemPicker;
