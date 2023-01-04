import styled from 'styled-components'

export const Container = styled.div(
  () => `
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    background: #ebebeb;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 50px -12px;
    z-index: 1
    `
)

export const ContainerMaisonSelector = styled.div(
  () => `
      position: absolute;
      right: 1rem;
      top: 1rem;
    `
)

export const Actions = styled.div(
  () => `
      position: absolute;
      left: 1rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      @media only screen and (max-width: 1400px) {
        flex-direction: column;
        top: 0;
        left: 0;
        gap: 5px;
        align-items: flex-start;
        background: #ebebeb;
        padding: 1rem;
       
      }
    `
)

export const DayButton = styled.div(
  ({ active }) => `
      border-radius: 0.5rem;
      padding: 0.5rem 0.7rem;
      box-shadow: rgb(0 0 0 / 15%) 0px 2px 8px;
      background-color: white;
      cursor: pointer;
      color: #2196f3;
      ${
        active
          ? `
      color: white;
      background-color: #2196f3;
      `
          : ``
      }
    `
)

export const ContentAction = styled.div(
  () => `
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  `
)
