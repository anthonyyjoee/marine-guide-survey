import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Pressable, StyleSheet, Platform, TouchableOpacity, Animated, Text } from "react-native";

import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "@constant";
import { useAppContext } from "@context";
import CustomBackdrop from "../CustomBackdrop";

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const PlusIcon = ({ isModalOpen, handleCloseModal, handlePresentModalPress, plusButtonPressed, setPlusButtonPressed, rotate, spinAnim }) => {
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
    <View style={styles.actionButtonContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.actionButtonInnerContainer]}
        onPress={() => {
          if (isModalOpen) {
            handleCloseModal();
          } else {
            handlePresentModalPress();
          }

          setPlusButtonPressed(!plusButtonPressed);
          rotate();
        }}
      >
        <AnimatedAntDesign name="plus" size={24} color={COLORS.white} style={{ transform: [{ rotate: spin }] }} />
      </TouchableOpacity>
    </View>
  );
};

const TabIcon = ({
  routeName,
  isFocused,
  isModalOpen,
  handleCloseModal,
  handlePresentModalPress,
  plusButtonPressed,
  setPlusButtonPressed,
  rotate,
  spinAnim,
}) => {
  if (routeName === "Dashboard") {
    if (isFocused) {
      return <Ionicons name="home" size={24} color="#2d4b8a" />;
    } else {
      return <Ionicons name="home" size={24} color="#D9D9D9" />;
    }
  } else if (routeName === "ReportList") {
    if (isFocused) {
      return <Ionicons name="document-text" size={24} color="#2d4b8a" />;
    } else {
      return <Ionicons name="document-text" size={24} color="#D9D9D9" />;
    }
  } else if (routeName === "Profile") {
    if (isFocused) {
      return <Ionicons name="person" size={24} color="#2d4b8a" />;
    } else {
      return <Ionicons name="person" size={24} color="#D9D9D9" />;
    }
  } else if (routeName === "List") {
    if (isFocused) {
      return <Feather name="list" size={24} color="#2d4b8a" />;
    } else {
      return <Feather name="list" size={24} color="#D9D9D9" />;
    }
  } else {
    return (
      <PlusIcon
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handlePresentModalPress={handlePresentModalPress}
        plusButtonPressed={plusButtonPressed}
        setPlusButtonPressed={setPlusButtonPressed}
        rotate={rotate}
        spinAnim={spinAnim}
      />
    );
  }
};

export const BottomTabBar = ({ state, navigation }) => {
  const [plusButtonPressed, setPlusButtonPressed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));

  const { userData } = useAppContext();

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => {
    if (userData?.role === "ADMIN") {
      return ["40%", "50%"];
    } else {
      return ["20%", "30%"];
    }
  }, []);

  const onPress = useCallback(
    (route, isFocused) => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [navigation]
  );

  const rotate = () => {
    Animated.spring(spinAnim, {
      toValue: plusButtonPressed ? 0 : 1,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    setPlusButtonPressed(!plusButtonPressed);
    rotate();
    bottomSheetModalRef.current?.close();
  }, [plusButtonPressed]);

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) setIsModalOpen(false);
    if (index === 1) setIsModalOpen(true);
  }, []);

  const fastAccessNavigate = (name) => {
    handleCloseModal();
    navigation.navigate(name);
  };

  return (
    <>
      <BottomSheetModalProvider>
        <BottomSheetModal
          enablePanDownToClose={false}
          enableHandlePanningGesture={true}
          enableDynamicSizing={true}
          enableContentPanningGesture={true}
          enableOverDrag={true}
          ref={bottomSheetModalRef}
          backdropComponent={({ animatedIndex, style }) => <CustomBackdrop onPress={handleCloseModal} animatedIndex={animatedIndex} style={style} />}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={styles.bottomSheetModal}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.bottomSheetMenuTitle}>Akses Cepat</Text>

            <View style={styles.bottomSheetMenuWrapper}>
              {userData?.role === "ADMIN" ? (
                <>
                  <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => fastAccessNavigate("CreateUser")}>
                    <Text style={styles.bottomSheetMenuText}>Buat User / Admin Baru</Text>
                    <AntDesign name="right" size={16} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => fastAccessNavigate("CreateSurvey")}>
                    <Text style={styles.bottomSheetMenuText}>Buat Survey Baru</Text>
                    <AntDesign name="right" size={16} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => fastAccessNavigate("CreateWorkUnit")}>
                    <Text style={styles.bottomSheetMenuText}>Buat Unit Kerja Baru</Text>
                    <AntDesign name="right" size={16} color="black" />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.bottomSheetMenu} activeOpacity={0.8} onPress={() => fastAccessNavigate("CreateReport")}>
                  <Text style={styles.bottomSheetMenuText}>Buat Laporan</Text>
                  <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <View style={styles.mainContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <View key={index} style={styles.mainItemContainer}>
              <Pressable
                onPress={
                  route.name === "PlaceholderScreen"
                    ? () => {}
                    : isModalOpen
                      ? () => {
                          handleCloseModal();
                          onPress(route, isFocused);
                        }
                      : () => onPress(route, isFocused)
                }
              >
                <TabIcon
                  routeName={route.name}
                  isFocused={isFocused}
                  isModalOpen={isModalOpen}
                  handleCloseModal={handleCloseModal}
                  handlePresentModalPress={handlePresentModalPress}
                  plusButtonPressed={plusButtonPressed}
                  setPlusButtonPressed={setPlusButtonPressed}
                  rotate={rotate}
                  spinAnim={spinAnim}
                />
              </Pressable>
            </View>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: Platform.OS === "ios" ? 90 : 60,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 99,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonContainer: {
    top: -50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2d4b8a",
    position: "absolute",
    borderRadius: 20,
    zIndex: 99999999999,
  },
  actionButtonInnerContainer: {
    backgroundColor: "#2d4b8a",
    borderRadius: 20,
    height: 65,
    width: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 20,
    gap: 24,
  },
  bottomSheetMenu: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomSheetMenuText: {
    fontSize: 12,
    fontWeight: "400",
  },
  bottomSheetMenuTitle: { fontSize: 14, fontWeight: "700", marginBottom: 12 },
  bottomSheetMenuWrapper: { width: "100%", gap: 16, paddingHorizontal: 24 },
  bottomSheetModal: { borderRadius: 0 },
});
