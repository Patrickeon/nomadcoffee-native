import React from "react";
import { ActivityIndicator } from "react-native";
import styled, { useTheme } from "styled-components/native";

const SView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background.primary};
  align-items: center;
  justify-content: center;
`;

export default function ScreenLayout({ loading, children }) {
  const theme = useTheme();
  return (
    <SView>
      {loading ? (
        <ActivityIndicator color={theme.color.primary} size="small" />
      ) : (
        <>{children}</>
      )}
    </SView>
  );
}
