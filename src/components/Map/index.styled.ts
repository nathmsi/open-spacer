import styled from 'styled-components'

export const MainContainer = styled.div(
  () => `
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    gap: 1rem;
    `
)

export const Container = styled.div(
  () => `
    display: grid;
    grid-template-columns: repeat(10,1fr);
    height: 100vh;
    width: 100%;
    gap: 0.2rem;
    `
)
