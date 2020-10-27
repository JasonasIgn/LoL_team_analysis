import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: black;
  padding: 0 20px;
  box-sizing: border-box;
`;

const SiteLogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const SiteLogo = styled.span`
  color: white;
  font-family: monospace;
  font-weight: 600;
  font-size: 20px;
`;

const LinkNoStyles = styled(Link)`
  text-decoration: none;
`;

const NavLinksContainer = styled.div`
  margin-left: 50px;
`;

const NavLink = styled.span`
  color: white;
`;

export const NavBar: React.FC = () => {
  return (
    <Container>
      <SiteLogoContainer>
        <LinkNoStyles to="/">
          <SiteLogo>LoL Picker</SiteLogo>
        </LinkNoStyles>
      </SiteLogoContainer>
      <NavLinksContainer>
        <LinkNoStyles to="/collector">
          <NavLink> Collector</NavLink>
        </LinkNoStyles>
      </NavLinksContainer>
    </Container>
  );
};
