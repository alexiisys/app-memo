import { zodResolver } from '@hookform/resolvers/zod';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { z } from 'zod';

import ItemPicker from '@/components/edit-profile/item-picker';
import {
  Button,
  colors,
  ControlledInput,
  Image,
  Input,
  SafeAreaView,
  Text,
} from '@/components/ui';
import { Close } from '@/components/ui/icons';
import { ArrowLeft } from '@/components/ui/icons/arrow-left';
import { AvatarIcon } from '@/components/ui/icons/avatar-icon';
import { EYE_COLORS, HAIR_COLORS } from '@/lib/consts';
import { updateProfile, useProfile } from '@/lib/storages/profile';
import { type Profile } from '@/types';
import { deleteImage, saveImagePermanently } from '@/utils';

export const editAccountSchema = z.object({
  image: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  birth: z.string().min(4, 'Required'),
  gender: z.enum(['man', 'female']),
  orientation: z.enum(['straight', 'homosexual']),
  country: z.string(),
  city: z.string(),
  hairColor: z.string(),
  eyeColor: z.string(),
  height: z.string(),
  weight: z.string(),
  relationships: z.boolean(),
  smoking: z.boolean(),
  alcohol: z.boolean(),
  interests: z.object({
    value: z.string().optional(),
    array: z.array(z.string()).default([]),
  }),
  description: z.string(),
});

export type EditAccountFormType = z.infer<typeof editAccountSchema>;

export default function EditAccountScreen() {
  const router = useRouter();
  const profile = useProfile.use.profile();
  const { control, handleSubmit } = useForm<EditAccountFormType>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      image: profile?.image ?? '',
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      birth: profile?.birth ?? new Date().toLocaleDateString(),
      gender: profile?.gender ?? 'man',
      orientation: profile?.orientation ?? 'straight',
      country: profile?.country ?? '',
      city: profile?.city ?? '',
      hairColor: profile?.hairColor ?? HAIR_COLORS[0].value,
      eyeColor: profile?.eyeColor ?? EYE_COLORS[0].value,
      height: profile?.height ?? '',
      weight: profile?.weight ?? '',
      relationships: profile?.relationships ?? false,
      smoking: profile?.smoking ?? false,
      alcohol: profile?.alcohol ?? false,
      interests: { value: '', array: profile?.interests ?? [] },
      description: profile?.description ?? '',
    },
  });

  const onPickImage = async (onChange: (val: string) => void) => {
    const result = await launchImageLibraryAsync();
    if (!result.canceled) onChange(result.assets[0].uri);
  };

  const onSubmit = async (data: EditAccountFormType) => {
    if (profile?.image !== data?.image) {
      deleteImage(data?.image || '');
    }

    const savedUri =
      data.image !== profile?.image
        ? await saveImagePermanently(data.image)
        : data.image || '';
    const { interests, image: _, ...otherData } = data;
    const newProfile: Profile = {
      image: savedUri.length > 0 ? savedUri : '',
      interests: interests.array,
      ...otherData,
    };
    updateProfile(newProfile);
    router.back();
  };
  const [datePickerShow, setDatePickerShow] = React.useState(false);
  const onDatePress = () => setDatePickerShow(true);
  const onConfirmPicker = () => setDatePickerShow(false);
  const onClosePicker = () => setDatePickerShow(false);

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-row items-center justify-between px-4 py-3 shadow-md">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft width={24} height={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Add a memory</Text>
        <View style={{ width: 24 }} />
      </View>
      <View className="mb-2 h-px bg-gray-200" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}
      >
        <View className="items-center py-8">
          <Controller
            control={control}
            name="image"
            render={({ field: { value, onChange } }) => (
              <TouchableOpacity
                className="w-full items-center py-8"
                onPress={() => onPickImage(onChange)}
              >
                {value ? (
                  <View className="relative">
                    <Image
                      source={{ uri: value }}
                      className="size-36 rounded-full"
                    />
                    <TouchableOpacity
                      onPress={() => onChange('')}
                      className="absolute -right-2 -top-2 rounded-full bg-white p-1"
                    >
                      <Close color={colors.grey} width={18} height={18} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="size-36 items-center justify-center rounded-full bg-light">
                    <AvatarIcon
                      width={44}
                      height={44}
                      color={colors.lightBlue}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>

        <Text className="mb-2 text-xl font-bold">Personal info</Text>
        <View className="mt-4 gap-6">
          <ControlledInput
            control={control}
            name="firstName"
            label="First name"
            require
            placeholder="First name"
          />
          <ControlledInput
            control={control}
            name="lastName"
            label="Last name"
            require
            placeholder="Last name"
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <>
                <DateTimePicker
                  date={new Date(value)}
                  isVisible={datePickerShow}
                  mode="date"
                  onConfirm={(date) => {
                    onConfirmPicker();
                    onChange(date.toString());
                  }}
                  onCancel={onClosePicker}
                />
                <TouchableOpacity onPress={() => onDatePress()}>
                  <Input
                    value={
                      value
                        ? new Date(value).toLocaleDateString('en-US')
                        : new Date().toLocaleDateString('en-US')
                    }
                    editable={false}
                    label={'Date of birth'}
                    placeholder={'YYYY-MM-DD'}
                    require
                  />
                </TouchableOpacity>
              </>
            )}
            name={'birth'}
            control={control}
          />
          <View>
            <Text className="mb-2 mt-4 text-base text-grey">Gender</Text>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <View className="mb-2 flex-row gap-6">
                  <TouchableOpacity
                    onPress={() => onChange('man')}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${value === 'man' ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${value === 'man' ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">Man</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange('female')}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${value === 'female' ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${value === 'female' ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">Female</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <Text className="mb-2 mt-4 text-base text-grey">Orientation</Text>
            <Controller
              control={control}
              name="orientation"
              render={({ field: { value, onChange } }) => (
                <View className="mb-2 flex-row gap-6">
                  <TouchableOpacity
                    onPress={() => onChange('straight')}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${value === 'straight' ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${value === 'straight' ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">Straight</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange('homosexual')}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${value === 'homosexual' ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${value === 'homosexual' ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>

                    <Text className="ml-2">Homosexual</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <ControlledInput
            control={control}
            name="country"
            label="Country"
            require
            placeholder="Country"
          />
          <ControlledInput
            control={control}
            name="city"
            label="City"
            require
            placeholder="City"
          />

          <View className="flex-row gap-2">
            <Controller
              control={control}
              name="hairColor"
              render={({ field: { value, onChange } }) => (
                <ItemPicker
                  label={'Hair color'}
                  value={value ?? ''}
                  onChange={onChange}
                  values={HAIR_COLORS}
                />
              )}
            />
            <Controller
              control={control}
              name="eyeColor"
              render={({ field: { value, onChange } }) => (
                <ItemPicker
                  label={'Eye color'}
                  value={value ?? ''}
                  onChange={onChange}
                  values={EYE_COLORS}
                />
              )}
            />
          </View>

          <View className="flex-1 flex-row gap-2">
            <ControlledInput
              control={control}
              name="height"
              label="Height"
              require
              placeholder="Height"
              style={{ flex: 1 }}
            />
            <ControlledInput
              control={control}
              name="weight"
              label="Weight"
              require
              placeholder="Weight"
              style={{ flex: 1 }}
            />
          </View>
          <View>
            <Text className="mb-2 mt-4 text-base">Relationships</Text>
            <Controller
              control={control}
              name="relationships"
              render={({ field: { value, onChange } }) => (
                <View className="mb-2 flex-row gap-6">
                  <TouchableOpacity
                    onPress={() => onChange(true)}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${value ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${value ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange(false)}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${!value ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${!value ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">No</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <Text className="mb-2 mt-4 text-base">Smoking</Text>
            <Controller
              control={control}
              name="smoking"
              render={({ field: { value, onChange } }) => (
                <View className="mb-2 flex-row gap-6">
                  <TouchableOpacity
                    onPress={() => onChange(true)}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${value ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${value ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange(false)}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${!value ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${!value ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">No</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View>
            <Text className="mb-2 mt-4 text-base">Alcohol</Text>
            <Controller
              control={control}
              name="alcohol"
              render={({ field: { value, onChange } }) => (
                <View className="mb-2 flex-row gap-6">
                  <TouchableOpacity
                    onPress={() => onChange(true)}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${value ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${value ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onChange(false)}
                    className="flex-row items-center"
                  >
                    <View
                      className={`rounded-full border p-0.5 ${!value ? 'border-blue' : 'border-gray-400 '}`}
                    >
                      <View
                        className={`rounded-full ${!value ? 'bg-blue' : ''} p-[5px]`}
                      />
                    </View>
                    <Text className="ml-2">No</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View className="pt-4">
            <Text className="mb-2 font-gilroy-700 text-lg">Interests</Text>
            <Controller
              control={control}
              name="interests"
              render={({ field: { value, onChange } }) => (
                <View
                  className={`rounded-xl bg-light dark:border dark:border-stroke dark:bg-darkBackground`}
                >
                  <Input
                    outlined
                    value={value?.value ?? ''}
                    onChangeText={(text) => onChange({ ...value, value: text })}
                    icon={
                      <TouchableOpacity
                        onPress={() =>
                          onChange({
                            value: '',
                            array: [
                              ...(value?.array ?? []),
                              value?.value ?? '',
                            ],
                          })
                        }
                      >
                        <Text className="mr-6 p-2 font-gilroy-600 text-lg text-blue">
                          Save
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                  {value && value.array && value.array.length > 0 && (
                    <View className="mx-4 gap-3 py-4">
                      <View className="flex-row items-center justify-between ">
                        <Text className="text-base text-grey">
                          Total: {value.array.length}
                        </Text>
                        <TouchableOpacity
                          onPress={() => onChange({ ...value, array: [] })}
                          className="flex-row items-center gap-2"
                        >
                          <Text className="text-base text-grey">Clear all</Text>
                          <Close width={16} height={16} color={colors.grey} />
                        </TouchableOpacity>
                      </View>

                      <View className="flex-row flex-wrap gap-2">
                        {value.array.map((item) => (
                          <View
                            key={item}
                            className="flex-row items-center justify-between gap-2 rounded-3xl bg-blue px-4 py-2"
                          >
                            <Text className="font-gilroy-500 text-base text-white">
                              {item}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                onChange({
                                  ...value,
                                  array: (value?.array ?? []).filter(
                                    (i) => i !== item
                                  ),
                                })
                              }
                            >
                              <Close
                                width={16}
                                height={16}
                                color={colors.white}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
            />
          </View>
          <View>
            <Text className="mb-2 mt-4 font-gilroy-700 text-lg">
              Description
            </Text>
            <ControlledInput
              control={control}
              name="description"
              label=""
              textAlignVertical={'top'}
              style={{ height: 200 }}
              placeholder="Enter a description"
              multiline
            />
          </View>
        </View>
        <View className="my-8 flex-1 flex-row items-center">
          <Button
            className="flex-1"
            label={'Save'}
            onPress={handleSubmit(onSubmit)}
          />
          <TouchableOpacity className="flex-1" onPress={() => router.back()}>
            <Text className="text-center font-gilroy-700 text-base text-gray-500">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
