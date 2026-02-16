import Button from "@/components/buttons";
import ImageViewer from "@/components/ImageViewer";
import { StyleSheet, View } from "react-native";
const PlaceholderImage = require("../../assets/images/image1.jpg");

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <ImageViewer imgSource={PlaceholderImage} width={220} height={300} />
      </View>

      <View style={styles.footerContainer}>
        <Button label="choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5959afff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 36,
  },
  imagecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    marginBottom: 28,
  },
});
