import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (percentage: number) => {
  if (typeof percentage !== "number" || isNaN(percentage)) {
    // console.warn('Invalid percentage value for hp:', percentage);
    return 0; // Return a default value or handle the error as needed
  }
  return (deviceHeight * percentage) / 100;
};

export const wp = (percentage: number) => {
  if (typeof percentage !== "number" || isNaN(percentage)) {
    // console.warn('Invalid percentage value for wp:', percentage);
    return 0; // Return a default value or handle the error as needed
  }
  return (deviceWidth * percentage) / 100;
};
