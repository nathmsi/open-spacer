import styled from 'styled-components'

export const Container = styled.div(
  () => `
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background: #ebebeb;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 50px -12px;
    `
)

export const ContainerMaisonSelector = styled.div(
  () => `
      position: absolute;
      right: 1rem;
      top: 1rem;
    `
)
