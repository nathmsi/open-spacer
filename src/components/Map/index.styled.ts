import styled from 'styled-components'

export const MainContainer = styled.div(
  () => `
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    background-color:#ebebeb;
    `
)

export const Container = styled.div(
  ({ lengthPerRow }) => `
  display: grid;
  grid-template-columns: repeat(${lengthPerRow},1fr);
    min-height: 80vh;
    // width: 100%;
    align-content: flex-start;
    padding: 1rem;
    justify-content: center;
    padding-top: 8rem;
    background-color:#ebebeb;
    `
)
