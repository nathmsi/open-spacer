import styled from 'styled-components'

export const MainContainer = styled.div(
  () => `
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    align-items: center;
    gap: 1.2rem;
    `
)

export const Container = styled.div(
  () => `
    display: grid;
    grid-template-columns: repeat(10,auto);
    min-height: 80vh;
    width: 100%;
    align-content: flex-start;
    padding: 1rem;
    justify-content: center;
    `
)
