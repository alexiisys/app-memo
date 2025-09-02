import * as FileSystem from 'expo-file-system';
export const saveImagePermanently = async (
  imageUri: string | undefined
): Promise<string> => {
  try {
    if (imageUri === undefined) throw new Error('Image uri is missing');
    const fileName = imageUri?.split('/').pop();
    if (!fileName) {
      throw new Error('Некорректный путь к файлу');
    }
    const newPath = FileSystem.documentDirectory + fileName;
    await FileSystem.copyAsync({
      from: imageUri,
      to: newPath,
    });
    return newPath;
  } catch (error) {
    console.log('Ошибка при сохранении файла:', error);
    return '';
  }
};

export const deleteImage = async (fileUri: string) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(fileUri);
    }
  } catch (error) {
    console.log('Ошибка при сохранении файла:', error);
    return '';
  }
};
