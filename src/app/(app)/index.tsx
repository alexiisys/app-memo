import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image, Text, View } from '@/components/ui';
import { HeartIcon, Plus } from '@/components/ui/icons';
import { PinIcon } from '@/components/ui/icons/pin-icon';
import { useMemory } from 'src/lib/storage/modules/memories';
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
      className="mx-3 mb-4 flex-row items-center overflow-hidden rounded-3xl bg-light shadow-md  dark:bg-dark"
    >
      <View className="relative">
        <Image
          source={memory.image}
          className="size-40 rounded-l-3xl"
          contentFit="cover"
        />
        <TouchableOpacity
          className="absolute left-0 top-0 z-10 items-center justify-center rounded-br-2xl rounded-tl-2xl bg-pink-500 p-2"
          activeOpacity={0.8}
        >
          <HeartIcon width={20} height={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 gap-1 px-4 py-1">
        <Text className="font-gilroy-700 text-lg" numberOfLines={1}>
          {memory.title}
        </Text>
        <View className=" flex-row items-center">
          <PinIcon />
          <Text className="ml-1 font-gilroy-500 text-blue">{memory.city}</Text>
        </View>
        <Text className=" h-12 font-gilroy-500 " numberOfLines={2}>
          {memory.description}
        </Text>

        <Text className=" font-gilroy-500 text-base  text-grey">
          {new Date(memory.birth).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Contacts() {
  const router = useRouter();
  const onNew = () => {
    router.navigate('/new-profile-memory');
  };
  const memories = useMemory.use.memories();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-6 pb-3 pt-2">
        <Text className="font-gilroy-700 text-2xl">Search</Text>
        <TouchableOpacity onPress={onNew}>
          <Plus color="#FF426F" width={26} height={26} />
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
    </SafeAreaView>
  );
}
