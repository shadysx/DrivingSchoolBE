import RNFetchBlob from 'rn-fetch-blob';
import sha1 from 'sha1';
import ImageResizer from 'react-native-image-resizer';

const cacheImage = async (url, maxWidth = 600, maxHeight = 800) => {
  try {
    const fileName = sha1(url) + '.png';
    const imagePath = RNFetchBlob.fs.dirs.CacheDir + '/' + fileName;

    // Check if the image is already cached
    const exists = await RNFetchBlob.fs.exists(imagePath);

    if (!exists) {
      // Image not in cache, download it
      const response = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png', // or use file extension based on your images
        path: imagePath
      }).fetch('GET', url);

      console.log("Saved to cache, Local path", `file://${response.path()}`);
    }

    // console.log("Retrieved in cache", `file://${imagePath}`);

    return `file://${imagePath}`;

    // TO prevent cache using
    // return url;

  } catch (error) {
    console.error('Error caching image:', error);
    throw error;
  }
};

export default cacheImage;
