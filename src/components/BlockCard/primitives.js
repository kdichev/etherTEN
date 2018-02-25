import styled from "styled-components";
import { truncate, media, boxShadow } from "./../../helpers";

export const CardHeaderContainer = styled.div`
  display: flex;
  ${media.tablet`
    flex-direction: row;
  `};
  cursor: pointer;
`;

export const CardContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding-left: 16px;
  ${media.tablet`
    padding-left: 0px;
  `};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  ${media.tablet`
    padding-right: 0px;
  `};
`;

export const CardContainer = styled.div`
  background-color: white;
  //transition: all 200ms linear;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-of-type {
    border-bottom: none;
  }
  width: 100%;
  padding: 16px 0px;
  ${media.tablet`
  padding: 16px;
  border-bottom: none;
  ${boxShadow}
  margin-bottom: 10px;
    width: 650px;
  `};
  ${media.giant`
  width: 750px;
  `};
`;

export const Box = styled.div`
  ${truncate("170px")};
  ${media.tablet`
    ${truncate("300px")}
  `};
`;

export const Title = styled.div`
  font-family: Roboto;
  font-weight: bold;
`;

export const SubTitle = styled.div`
  font-family: Roboto;
  color: rgba(0, 0, 0, 0.54);
`;
