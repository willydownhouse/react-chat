import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

const fileTypes = ['image/png', 'image/jpeg'];

export const handleUploadAndGetImgUrl = async (file: File) => {
  if (!fileTypes.includes(file.type)) {
    alert('Only png and jpg files allowed');
    return;
  }

  const storageRef = ref(storage, `/images/${file.name}`);

  try {
    const res = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(ref(storage, res.metadata.fullPath));

    return url;
  } catch (err) {
    console.log(err);
  }
};
