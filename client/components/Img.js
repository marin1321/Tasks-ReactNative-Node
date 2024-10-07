import {
  Image,
  StyleSheet
} from "react-native";


export default function Img({ src  }) {
  
  return (
    <Image source={src}/>
  );
}
