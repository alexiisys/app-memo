import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { View } from 'react-native';

import { Button, colors, Input, Modal } from '@/components/ui';
import { ArrowRight } from '@/components/ui/icons';

type FilterModalProps = {};

const FilterModal = forwardRef<BottomSheetModal, FilterModalProps>((_, ref) => {
  return (
    <Modal ref={ref} index={0} snapPoints={['50%']} title={'Filter'}>
      <View className="mx-4 flex-1 grow gap-4">
        <Input
          label={'City'}
          require
          outlined
          icon={
            <ArrowRight
              color={colors.grey}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          }
        />
        <Input
          label={'Gender'}
          require
          outlined
          icon={
            <ArrowRight
              color={colors.grey}
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          }
        />
        <Button label={'Search'} className="mt-4" />
      </View>
    </Modal>
  );
});

export default FilterModal;
