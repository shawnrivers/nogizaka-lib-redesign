import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 1fr) minmax(min-content, 800px) minmax(
      max-content,
      1fr
    );
  grid-template-rows: auto;
  grid-template-areas:
    'navigation header settings'
    'main main main';
  grid-gap: 16px;
  padding: 64px 32px;

  @media screen and (max-width: 54em) {
    grid-template-areas:
      'header header header'
      'main main main';
  }
`;

export const Navigation = styled.nav`
  grid-area: navigation;
  justify-self: end;
  padding-top: 1ex;

  @media screen and (max-width: 54em) {
    display: none;
  }
`;

export const Header = styled.header`
  grid-area: header;
  justify-self: start;
`;

export const Settings = styled.div`
  grid-area: settings;
  justify-self: start;
  padding-top: 1ex;

  @media screen and (max-width: 54em) {
    display: none;
  }
`;

export const Main = styled.main`
  grid-area: main;
`;
