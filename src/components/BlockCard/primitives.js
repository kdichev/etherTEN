import styled, {keyframes} from 'styled-components'

export const CardHeaderContainer = styled.div`
  background-color: white;
  text-align: initial;

  display: flex;
  flex-direction: row;

`

export const CardHeader = styled.div`
  color: white;
  flex: 1;
  display: flex;
  align-items: center;
`

export const CardContent = styled.div`
  flex: 6;
`

export const CardFooter = styled.div`
  flex: 2;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Avatar = styled.img`
  width: 70%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  ${props => props.loading &&
    `animation: ${rotate360} 2s linear infinite;`
  }
`;

export const CardContainer = styled.div`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  margin-bottom: 10px;
  padding: 10px 15px;
`;
