export const theme = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
    cardBackground: "#fff", // Add this line for card background
  },

  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fffff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fffff",
    cardBackground: "#fff", // Add this line for card background
  },

  fonts: {
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },

  radius: {
    xs: 10 as const,
    sm: 12 as const,
    md: 14 as const,
    lg: 16 as const,
    xl: 18 as const,
    xxl: 22 as const,
  },
};
