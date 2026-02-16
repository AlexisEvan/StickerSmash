import { Image } from "expo-image";
import { StyleSheet } from "react-native";

type Props = {
  imgSource: string;
  width?: number;
  height?: number;
};

export default function ImageViewer({ imgSource, width = 320, height = 440 }: Props) {
  return <Image source={imgSource} style={[styles.image, { width, height }]} />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 18,
  },
});
