import styled from 'styled-components'

export const Container = styled.div(
  () => `
    display: grid;
    grid-template-columns: repeat(10,1fr);
    height: 100vh;
    `
)
