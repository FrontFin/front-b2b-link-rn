import React from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useStyles} from '../hooks/useStyles';

const LinearAnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
const ButtonWithAnimation = Animated.createAnimatedComponent(TouchableOpacity);

export const SplashScreen = ({
  navigation,
}: {
  navigation: {
    navigate: (arg0: string) => void;
  };
}) => {
  const styles = useStyles();

  return (
    <LinearAnimatedGradient
      colors={styles.gradientColors}
      start={styles.gradientStart}
      end={styles.gradientEnd}
      locations={styles.gradientLocations}
      style={styles.container}>
      <Animated.Image
        style={styles.logo}
        source={require('../assets/front_logo.png')}
      />
      <View />
      <ButtonWithAnimation
        onPress={() => navigation.navigate('Example')}
        style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </ButtonWithAnimation>
    </LinearAnimatedGradient>
  );
};
