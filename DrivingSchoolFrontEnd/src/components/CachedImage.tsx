import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import sha1 from 'sha1';

const CachedImage = ({ url }) => {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const downloadImage = async () => {
      try {
        const fileName = sha1(url) + '.png';
        const response = await RNFetchBlob.config({
          fileCache: true,
          appendExt: 'png', // or use file extension based on your images
          path: RNFetchBlob.fs.dirs.CacheDir + '/' + fileName
        }).fetch('GET', url);

        const localPath = response.path();
        setLocalUri(`file://${localPath}`);
        console.log("Saved to cache, Local path", `file://${localPath}`)
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    };

    const getCachedImage = async () => {
      const fileName = sha1(url) + '.png';
      const imagePath = RNFetchBlob.fs.dirs.CacheDir + '/' + fileName;

      console.log("Trying to fetch in cache", `file://${imagePath}`)
      // Check if the image is already cached
      const exists = await RNFetchBlob.fs.exists(imagePath);

      if (exists) {
        setLocalUri(`file://${imagePath}`);
        console.log("IT EXIST")
      } else {
        // Image not in cache, download it
        await downloadImage();
      }
    };

    getCachedImage();
  }, [url]);

  return <Image source={{ uri: localUri }} style={{ width: '100%', height: '100%', resizeMode: "cover"}} />;
};

export default CachedImage;