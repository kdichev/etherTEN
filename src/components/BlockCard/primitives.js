import styled from 'styled-components'

export const CardContainer = styled.div`
  background-color: white;
  border: 1px solid black;
  text-align: initial;
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  height: 75px;
  margin-bottom: 10px;
`

export const CardHeader = styled.div`
  background-color: gray;
  color: white;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CardContent = styled.div`
  flex: 6
`