import styled from 'styled-components'

export const Container = styled.div(
  () => `
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 1rem;
      padding: 1rem;
      padding-top: 6.5rem;
    `
)
