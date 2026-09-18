import React from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import { File, Paths } from 'expo-file-system';

import { MainStackParamList } from '../../types/navigation';

type ImageDetailRouteProp = RouteProp<
  MainStackParamList,
  'ImageDetail'
>;

export default function ImageDetailScreen() {
  const route = useRoute<ImageDetailRouteProp>();
  const { image } = route.params;

  const [fullScreen, setFullScreen] = React.useState(false);

  const handleDownload = async () => {
    try {
      const permission =
        await MediaLibrary.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please allow gallery permission to save the image.',
        );
        return;
      }

      const file = new File(
        Paths.cache,
        `${image.id}.jpg`,
      );

      file.write(
        await (await fetch(image.download_url)).bytes(),
      );

      await MediaLibrary.saveToLibraryAsync(file.uri);

      Alert.alert(
        'Success',
        'Image saved to your gallery.',
      );
    } catch (error) {
      Alert.alert(
        'Download Failed',
        'Unable to save the image.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image.download_url }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.author}>
        Author: {image.author}
      </Text>

      <Text style={styles.id}>
        ID: {image.id}
      </Text>

      <Text style={styles.size}>
        Size: {image.width} × {image.height}
      </Text>

      <Pressable
        style={styles.downloadButton}
        onPress={handleDownload}
      >
        <Text style={styles.downloadText}>
          Download Image
        </Text>
      </Pressable>

      <Pressable
        style={styles.downloadButton}
        onPress={() => setFullScreen(true)}
      >
        <Text style={styles.downloadText}>
          View Full Screen
        </Text>
      </Pressable>

      <Modal
        visible={fullScreen}
        transparent
        animationType="fade"
        onRequestClose={() => setFullScreen(false)}
      >
        <View style={styles.fullScreenContainer}>
          <Image
            source={{ uri: image.download_url }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />

          <Pressable
            style={styles.closeButton}
            onPress={() => setFullScreen(false)}
          >
            <Text style={styles.closeText}>
              Close
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },

  author: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  id: {
    fontSize: 15,
    marginBottom: 8,
  },

  size: {
    fontSize: 15,
  },

  downloadButton: {
    backgroundColor: '#222222',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },

  downloadText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullScreenImage: {
    width: '100%',
    height: '80%',
  },

  closeButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    position: 'absolute',
    bottom: 40,
  },

  closeText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});