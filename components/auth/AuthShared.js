import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 5px 7px;
  margin-bottom: 8px;
  border-radius: 4px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  color: white;
  margin-bottom: ${props => (props.lastOne ? "5" : 8)}px;
`;
