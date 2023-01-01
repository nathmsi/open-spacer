import styled from 'styled-components'

export const Container = styled.div(
  () => `
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    `
)

export const ContainerMaisonSelector = styled.div(
  () => `
      position: absolute;
      right: 0;
      top: 10px;
    `
)
