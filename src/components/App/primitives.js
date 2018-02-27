import styled from "styled-components";
// import transition from "styled-transition-group";
import { media, truncate } from "./../../helpers";

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

export const Headline = styled.div`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0px;
  font-weight: 300;
  color: #212121;
  text-transform: inherit;
`;
export const Title = styled.div`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.05px;
  font-weight: 400;
  color: #212121;
  text-transform: inherit;
`;

export const SubTitle = styled.div`
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.1px;
  font-weight: 300;
  color: #212121;
  text-transform: inherit;
`;

export const Text = styled.div`
  font-size: 13px;
  line-height: 24px;
  letter-spacing: 0.1px;
  font-weight: 400;
  color: ${props => (props.color ? props.color : "#212121")};
  text-transform: inherit;
  ${props => props.truncate && truncate(props.truncate)};
  ${props => props.paddingLeft && `padding-left: 8px;`};
  ${props => props.paddingRight && `padding-right: 8px;`};
  text-align: ${props => (props.textAlign ? props.textAlign : "initial")};
`;

export const ActionsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

export const Display1 = styled.div`
  font-size: 34px;
  line-height: 40px;
  letter-spacing: 0px;
  font-weight: 300;
  color: #757575;
  text-transform: inherit;
`;
