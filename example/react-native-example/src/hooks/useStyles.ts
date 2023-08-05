import {useRef, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Animated,
  Easing,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from 'react-native';

export type FrontAppStyles = {
  container: ViewStyle;
  logo: ImageStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  gradientColors: string[];
  gradientStart: {x: number; y: number};
  gradientEnd: {x: number; y: number};
  gradientLocations: number[];
};

const ANIMATION_DURATION = 1000;
const LOGO_MOVEMENT = 200;

export const useStyles = () => {
  const backgroundFade = useRef(new Animated.Value(0)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(0)).current;
  const logoMovement = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(backgroundFade, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();

      Animated.timing(logoFade, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(logoMovement, {
          toValue: -1 * LOGO_MOVEMENT,
          duration: ANIMATION_DURATION,
          easing: Easing.inOut(Easing.exp),
          useNativeDriver: true,
        }).start();

        Animated.timing(buttonAnimation, {
          toValue: 1,
          duration: ANIMATION_DURATION * 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      }, ANIMATION_DURATION);
    }, [backgroundFade, buttonAnimation, logoFade, logoMovement]),
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: backgroundFade,
    },
    logo: {
      opacity: logoFade,
      transform: [{translateY: logoMovement}],
    },
    button: {
      opacity: buttonAnimation,
      backgroundColor: '#3056c9',
      color: '#fff',
      paddingTop: 2,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      borderCurve: 'continuous',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  const gradientColors = ['#ffffff', '#dbe0f1', '#e0d5f0'];
  const gradientStart = {x: 0.0, y: 0.25};
  const gradientEnd = {x: 0.8, y: 1.0};
  const gradientLocations = [0, 0.8, 0.9];

  return {
    container: styles.container,
    logo: styles.logo,
    button: styles.button,
    buttonText: styles.buttonText,
    gradientColors,
    gradientStart,
    gradientEnd,
    gradientLocations,
  } as FrontAppStyles;
};
