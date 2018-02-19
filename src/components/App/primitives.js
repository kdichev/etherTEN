import styled from "styled-components";
import transition from "styled-transition-group";

export const CardsContainer = styled.div`
  max-width: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Fade = transition.div`
  &:enter { opacity: 0.01; }
  &:enter-active {
    opacity: 1;
    transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
  }
`;
