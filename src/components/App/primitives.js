import styled from "styled-components";
// import transition from "styled-transition-group";
import { media } from "./../../helpers";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.tablet`
    padding-top: 65px;
  `};
`;

export const RefreshIcon = styled.div`
  font-size: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const Title = styled.div`
  font-family: Roboto;
  font-weight: bold;
`;

export const SubTitle = styled.div`
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.54);
`;

export const ActionsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;
