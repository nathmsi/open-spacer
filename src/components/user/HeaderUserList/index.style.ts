import styled from 'styled-components'

export const Container = styled.div(
  () => `
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 50px -12px;
    z-index: 1;
    height: 5rem;
    `
)

export const ContainerMaisonSelector = styled.div(
  () => `
      position: absolute;
      right: 1rem;
      top: 1rem;
    `
)
