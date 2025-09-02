import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useMemory } from 'src/lib/storage/modules/memories';

import { colors, Image, SafeAreaView, Text, View } from '@/components/ui';
import { Close } from '@/components/ui/icons';
import { ArrowLeft } from '@/components/ui/icons/arrow-left';
import { AvatarIcon } from '@/components/ui/icons/avatar-icon';
import { PinIcon } from '@/components/ui/icons/pin-icon';
import { EYE_COLORS, getAge, HAIR_COLORS } from '@/lib/consts';

export default function ProfileMemoryScreen() {
  const router = useRouter();
  const local = useLocalSearchParams<{ id: string }>();

  const memory = useMemory.use.getMemory()(local.id);
  const deleteMemory = useMemory.use.deleteMemory();

  const onBack = () => {
    router.back();
  };
  return (
    <SafeAreaView className="flex-1 ">
      <View className="relative">
        {memory?.image ? (
          <Image
            source={memory.image}
            className="h-64 w-full"
            contentFit="cover"
          />
        ) : (
          <View className="size-36 items-center justify-center rounded-full bg-light">
            <AvatarIcon width={44} height={44} color={colors.lightBlue} />
          </View>
        )}

        <TouchableOpacity
          className="absolute left-4 top-4 z-10 rounded-full p-2"
          onPress={onBack}
        >
          <ArrowLeft width={22} height={22} color={colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        className="px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold">
              {memory?.title || ''},{' '}
              {getAge(new Date(memory?.birth ?? Date.now()))}
            </Text>
            <View className="mt-1 flex-row items-center">
              <PinIcon />
              <Text className="ml-1 font-gilroy-500 text-grey">
                {memory?.city || ''}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="rounded-full bg-coralPink p-3"
            onPress={() => {
              deleteMemory(local.id);
              router.back();
            }}
          >
            <Close width={24} height={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text className="mb-4 mt-6 text-base text-black">
          {memory?.description || ''}
        </Text>
        <View className="mb-4 flex-row flex-wrap gap-2">
          {(memory?.interests ?? []).length > 0 && (
            <>
              <View className=" mt-2 flex-row flex-wrap gap-2">
                {memory?.interests.map((interest) => (
                  <View
                    key={interest}
                    className="rounded-full bg-blue px-4 py-2"
                  >
                    <Text className="font-gilroy-600 text-white">
                      {interest}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        <View className="shadow-xs divide-y divide-gray-100 rounded-2xl ">
          {memory?.city && (
            <ProfileMemoryRow label="I Live" value={memory.city} />
          )}
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
          {memory?.weight && (
            <ProfileMemoryRow label="Weight" value={memory.weight || ''} />
          )}
          {memory?.height && (
            <ProfileMemoryRow label="Height" value={memory.height || ''} />
          )}
          {memory?.relationships && (
            <ProfileMemoryRow
              label="Relationships"
              value={memory.relationships ? 'Dating' : 'Free'}
            />
          )}
          {memory?.orientation && (
            <ProfileMemoryRow label="Orientation" value={memory.orientation} />
          )}
          {memory?.smoking && (
            <ProfileMemoryRow
              label="Smoking"
              value={memory.smoking ? 'Yes' : 'No'}
            />
          )}
          {memory?.alcohol && (
            <ProfileMemoryRow
              label="Alcohol"
              value={memory.alcohol ? 'Yes' : 'No'}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Строка характеристики
function ProfileMemoryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between px-2 py-4">
      <Text className="font-gilroy-500 text-gray-400">{label}</Text>
      <Text className="font-gilroy-700 text-black">{value}</Text>
    </View>
  );
}
