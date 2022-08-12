import requests from './../requests';

export const renderImageFile = file => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    try {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result);
      };
      // reader.readAsArrayBuffer(file);
    } catch (error) {
      throw new Error("Ошибка при чтении файла");
    }
  });
};

export const getAbsoluteImgPath = imgPath => {
  const baseUrl = requests.defaults.baseURL;
  return `${baseUrl}/${imgPath}`
}