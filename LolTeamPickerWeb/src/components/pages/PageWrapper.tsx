import React from "react";
import styled from "styled-components";
import { NavBar } from "../molecules/NavBar";

interface PageWrapperProps {
  children: React.ReactNode;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
};
