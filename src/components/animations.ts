// Animation utilities for smooth transitions

import { Animated } from 'react-native';

export const createFadeInAnimation = (duration: number = 300) => {
  const fadeAnim = new Animated.Value(0);

  const fadeIn = Animated.timing(fadeAnim, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });

  const fadeOut = Animated.timing(fadeAnim, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });

  return { fadeAnim, fadeIn, fadeOut };
};

export const createSlideAnimation = (
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 50,
  duration: number = 300
) => {
  const slideAnim = new Animated.Value(
    direction === 'up' ? distance :
    direction === 'down' ? -distance :
    direction === 'left' ? distance :
    -distance
  );

  const slideIn = Animated.timing(slideAnim, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });

  const slideOut = Animated.timing(slideAnim, {
    toValue: direction === 'up' ? -distance :
             direction === 'down' ? distance :
             direction === 'left' ? -distance :
             distance,
    duration,
    useNativeDriver: true,
  });

  return { slideAnim, slideIn, slideOut };
};

export const createScaleAnimation = (duration: number = 300) => {
  const scaleAnim = new Animated.Value(0.95);

  const scaleIn = Animated.timing(scaleAnim, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });

  const scaleOut = Animated.timing(scaleAnim, {
    toValue: 0.95,
    duration,
    useNativeDriver: true,
  });

  return { scaleAnim, scaleIn, scaleOut };
};

export const createStaggeredAnimation = (
  animations: Animated.CompositeAnimation[],
  stagger: number = 100
) => {
  const staggeredAnimations = animations.map((anim, index) =>
    Animated.delay(index * stagger).start(() => anim.start())
  );

  return {
    start: () => staggeredAnimations.forEach(anim => anim.start()),
    stop: () => staggeredAnimations.forEach(anim => anim.stop()),
  };
};

// Predefined animation presets
export const animations = {
  modal: {
    fadeIn: (fadeAnim: Animated.Value) =>
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    scaleIn: (scaleAnim: Animated.Value) =>
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
  },

  card: {
    slideUp: (slideAnim: Animated.Value) =>
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
  },

  button: {
    press: (scaleAnim: Animated.Value) =>
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
  },

  listItem: {
    slideInRight: (slideAnim: Animated.Value) =>
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
  },
};

// Success animation for bet resolution
export const createSuccessAnimation = () => {
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);
  const rotateAnim = new Animated.Value(0);

  const animate = Animated.sequence([
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]),
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]),
  ]);

  return {
    scaleAnim,
    opacityAnim,
    rotateAnim,
    animate,
    scale: scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    }),
    rotate: rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    }),
  };
};
