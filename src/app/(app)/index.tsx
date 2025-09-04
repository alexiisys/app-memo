import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { likeMemory, useMemory } from 'src/lib/storage/modules/memories';

import { colors, Image, Text, View } from '@/components/ui';
import { HeartIcon, Plus } from '@/components/ui/icons';
import { PinIcon } from '@/components/ui/icons/pin-icon';
import { getAge } from '@/lib/consts';
import { type Memory } from '@/types';

type MemoryCardProps = {
  memory: Memory;
};

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  const router = useRouter();
  const onPress = () => {
    router.navigate(`/profile-memory/${memory.id}`);
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative mx-3 mb-4 flex-row overflow-hidden bg-lightOrange shadow-md dark:bg-[#47403C]"
    >
      <Image
        source={memory.image}
        className="h-52 w-36 border border-stroke"
        contentFit="cover"
      />
      <View className="flex-1 gap-1 px-4 py-3">
        <Text
          className="font-gilroy-700 text-2xl text-orange"
          numberOfLines={1}
        >
          {memory.title}, {getAge(new Date(memory?.birth ?? Date.now()))}
        </Text>
        <View className=" flex-row items-center">
          <PinIcon color={colors.dirty} />
          <Text className="ml-1 font-gilroy-500 text-dirty">{memory.city}</Text>
        </View>
        <View className="flex-row flex-wrap gap-3">
          {memory.interests.map((item, index) => (
            <Text
              key={item + index}
              className="self-center bg-white px-2 py-1 font-gilroy-700 text-black dark:bg-[#1F1E1D] dark:text-white"
            >
              {item}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => likeMemory(memory)}
        className="absolute right-3 top-3 z-10 items-center justify-center bg-white p-2 dark:bg-[#1F1E1D]"
        activeOpacity={0.8}
      >
        <HeartIcon
          width={20}
          height={20}
          color={memory.liked ? colors.coralPink : colors.grey}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function Contacts() {
  const router = useRouter();
  const onNew = () => {
    router.navigate('/new-profile-memory');
  };
  const memories = useMemory.use.memories();

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <View
        className="flex-row items-center justify-between bg-orange px-6 pb-3"
        style={{
          paddingTop: insets.top + 12,
        }}
      >
        <Text className="font-gilroy-700 text-2xl text-white">Memora</Text>
        <TouchableOpacity className={'bg-white p-2'} onPress={onNew}>
          <Plus color={colors.orange} width={14} height={14} />
        </TouchableOpacity>
      </View>
      <View className="mb-2 h-px bg-gray-200" />
      <FlashList
        data={memories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MemoryCard memory={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
      />
    </View>
  );
}
