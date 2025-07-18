import { useState, useEffect, useRef } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";

const SCREEN_MARGIN_HORIZONTAL = 20;

const ANIMATIONS = {
  fadeIn: {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
  },
};

const AnimationRow = ({ isVisible = true, onDismiss }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const animationOpacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    if (isVisible && !animationCompleted) {
      animationRef.current = Animated.timing(animationOpacity, {
        ...ANIMATIONS.fadeIn,
        delay: 200,
      });

      animationRef.current.start((finished) => {
        if (finished) {
          setAnimationCompleted(true);
        }
      });
    }

    // Cleanup when component unmounts or becomes invisible
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [isVisible, animationCompleted, animationOpacity]);

  // Reset animation when component becomes visible again
  useEffect(() => {
    if (isVisible) {
      setAnimationCompleted(false);
      animationOpacity.setValue(0);
    }
  }, [isVisible, animationOpacity]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={{
        paddingHorizontal: SCREEN_MARGIN_HORIZONTAL,
        marginTop: 10,
        opacity: animationOpacity,
      }}
    >
      <View
        style={{
          backgroundColor: "#f0f0f0",
          padding: 20,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          🎬 Animated Row Component
        </Text>

        <Text style={{ marginBottom: 15, color: "#666" }}>
          Status: {animationCompleted ? "Animation Complete" : "Animating..."}
        </Text>

        <Text style={{ marginBottom: 20 }}>
          This component fades in over 2 seconds. Click dismiss to interrupt the
          animation.
        </Text>

        <TouchableOpacity
          onPress={onDismiss}
          style={{
            backgroundColor: "#ff4444",
            padding: 12,
            borderRadius: 6,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            ❌ Dismiss (Interrupt Animation)
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const AnimationRowExample = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ height: 200 }} />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          flex: 1,
        }}
      >
        Animation Interruption Test
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 10 }}>
          Steps to reproduce useInsertionEffect warning:
        </Text>
        <Text>1. Click "Show Animation"</Text>
        <Text>2. Quickly click "Dismiss" while fading in</Text>
        <Text>3. Repeat rapidly</Text>
        <Text>4. Check console for warnings</Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowAnimation(true)}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          🎬 Show Animation
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setShowAnimation(false)}
        style={{
          backgroundColor: "#2196F3",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          🔄 Force Reset
        </Text>
      </TouchableOpacity>

      <AnimationRow
        isVisible={showAnimation}
        onDismiss={() => setShowAnimation(false)}
      />
    </View>
  );
};

export default AnimationRowExample;
