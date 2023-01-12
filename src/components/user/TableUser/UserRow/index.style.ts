import styled from 'styled-components'

export const Container = styled.div(
  () => `
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: columns;
  border-radius: 0.5rem;
  margin: 0.4rem;
  cursor: pointer;
  position: relative;
    `
)

export const Action = styled.div(
  () => `
    display: flex;
    margin-right: 1rem;
  `
)
