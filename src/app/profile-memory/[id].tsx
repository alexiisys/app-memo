import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useMemory } from 'src/lib/storage/modules/memories';

import { colors, Image, SafeAreaView, Text, View } from '@/components/ui';
import { Close } from '@/components/ui/icons';
import { ArrowLeft } from '@/components/ui/icons/arrow-left';
import { AvatarIcon } from '@/components/ui/icons/avatar-icon';
import { PinIcon } from '@/components/ui/icons/pin-icon';
import { useSelectedTheme } from '@/lib';
import { EYE_COLORS, getAge, HAIR_COLORS } from '@/lib/consts';

export default function ProfileMemoryScreen() {
  const router = useRouter();
  const local = useLocalSearchParams<{ id: string }>();

  const memory = useMemory.use.getMemory()(local.id);
  const deleteMemory = useMemory.use.deleteMemory();
  const { selectedTheme } = useSelectedTheme();
  const isDark = selectedTheme === 'dark';

  const onBack = () => {
    router.back();
  };
  return (
    <SafeAreaView className="flex-1 bg-lightOrange2 dark:bg-[#1F1E1D]">
      <View className="flex-row items-center gap-2">
        <TouchableOpacity className="p-2" onPress={onBack}>
          <ArrowLeft
            width={22}
            height={22}
            color={isDark ? colors.white : colors.black}
          />
        </TouchableOpacity>
        <Text className="font-gilroy-700 text-xl text-black">Back</Text>
      </View>
      <View className="relative my-6 items-center">
        {memory?.image ? (
          <Image
            source={memory.image}
            className="h-64 w-48"
            contentFit="cover"
          />
        ) : (
          <View className="size-36 items-center justify-center rounded-full bg-light">
            <AvatarIcon width={44} height={44} color={colors.orange} />
          </View>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        className="m-4 bg-lightOrange3 p-4 dark:bg-[#47403C]"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-orange dark:text-orange">
              {memory?.title || ''},{' '}
              {getAge(new Date(memory?.birth ?? Date.now()))}
            </Text>
            <View className="mt-1 flex-row items-center">
              <PinIcon color={colors.dirty} />
              <Text className="ml-1 font-gilroy-500 text-dirty dark:text-dirty">
                {memory?.city || ''}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="rounded-full bg-white p-3 dark:bg-[#1F1E1D]"
            onPress={() => {
              deleteMemory(local.id);
              router.back();
            }}
          >
            <Close width={24} height={24} color={colors.orange} />
          </TouchableOpacity>
        </View>

        {memory?.description && (
          <Text className="mb-4 mt-6 text-base text-dirty dark:text-dirty">
            {memory.description}
          </Text>
        )}
        {(memory?.interests ?? []).length > 0 && (
          <>
            <Text className="mt-6 font-gilroy-700 text-2xl text-black">
              Interests
            </Text>
            <View className="mb-4 flex-row flex-wrap gap-2">
              <View className=" mt-2 flex-row flex-wrap gap-2">
                {memory?.interests.map((interest) => (
                  <View
                    key={interest}
                    className="bg-white px-4 py-2 dark:bg-[#1F1E1D]"
                  >
                    <Text className="font-gilroy-600 text-black">
                      {interest}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        <View className="shadow-xs flex-row flex-wrap divide-y divide-gray-100 rounded-2xl">
          {memory?.hairColor && (
            <ProfileMemoryRow
              label="Hair color"
              value={
                HAIR_COLORS.find((item) => item.value === memory.hairColor)
                  ?.label || ''
              }
            />
          )}
          {memory?.eyeColor && (
            <ProfileMemoryRow
              label="Eye color"
              value={
                EYE_COLORS.find((item) => item.value === memory.eyeColor)
                  ?.label || ''
              }
            />
          )}
          <ProfileMemoryRow label="Weight" value={memory?.weight || '0'} />
          <ProfileMemoryRow label="Height" value={memory?.height || '0'} />
          <ProfileMemoryRow
            label="Relationships"
            value={memory?.relationships ? 'Dating' : 'Free'}
          />
          <ProfileMemoryRow
            label="Orientation"
            value={memory?.orientation ?? ''}
          />
          <ProfileMemoryRow
            label="Smoking"
            value={memory?.smoking ? 'Yes' : 'No'}
          />
          <ProfileMemoryRow
            label="Alcohol"
            value={memory?.alcohol ? 'Yes' : 'No'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Строка характеристики
function ProfileMemoryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="w-1/2 justify-between px-2 py-4">
      <Text className="font-gilroy-700 text-xl text-[#0604078A] dark:text-[#F4F2EEAA]">
        {label}
      </Text>
      <Text className="font-gilroy-700 text-xl text-black">{value}</Text>
    </View>
  );
}
