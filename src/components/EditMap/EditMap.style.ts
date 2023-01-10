import styled from 'styled-components'

export const Container = styled.div(
  ({ lengthPerRow }) => `
  display: flex;
  flex-direction: column;
  .row {
    display: grid;
    grid-template-columns: repeat(${lengthPerRow},1fr);
  }
    .place {
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 0.5rem;
        margin: 0.4rem;
        cursor: pointer;
        position: relative;
        flex-grow: 1;
      }
      .placeAssign {
        background-color: yellow;
      }
      .place:hover {
        background: white;
        opacity: 0.8;
      }
      `
)
