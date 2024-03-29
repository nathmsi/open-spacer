import styled from 'styled-components'

export const Container = styled.div(
  ({ assigned, haveMaison, isEvenRow }) => `
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 0.5rem;
        margin: 0.4rem;
        cursor: pointer;
        position: relative;
        span {
          font-size: 0.8rem;
        }
        .MuiListItemAvatar-root {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
       
        ${
          !assigned
            ? `
          opacity: 0.3;
        `
            : `
            background-color: white;
            `
        }
        ${
          haveMaison
            ? `
        `
            : `
            border-color: white;
            `
        }
        .icon-action {
          display: none;
          align-items: center;
          justify-content: center;
        }
        &:hover {
          background: #ebebeb;
          opacity: 0.8;
          .icon-action {
            opacity: 1;
            position: absolute;
            left: 5px;
            display: flex; 
            background-color: white;
            border-radius: 50%; 
            padding: 0.6rem;
            @media only screen and (max-width: 1400px) {
              left: inherit;
            }
          }
        }
        min-width: 12rem;
        @media only screen and (max-width: 1400px) {
          .MuiListItem-root {
            flex-direction: column;
            align-items:center;
          }
          .MuiTypography-root {
            text-align: center;
          }
          .MuiListItemAvatar-root {
            justify-content: center;
          }
          min-width: 4rem;
          max-width: 5rem;
        }
    `
)

export const NumberPlace = styled.div(
  ({ haveMaison }) => `
        font-size: 0.8rem;
    
    `
)

export const FullName = styled.div(
  () => `
        font-size: 0.9rem;
        text-align: center;
    `
)

// [79,89,97,98,99,100,107,108,109,110,117,118,119,120,127,128,129,130,137,138,139,140,147,148,149,150,157,158,159,160,167,169,170].map(el => ({
//     "maisonId": "1e821e43-53b0-42f6-b414-076e8cc1ec5d",
//    "index_place": el
// }))

export const ContainerBlank = styled.div(
  () => `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 0rem;
  `
)

export const ContainerMeetingRoom = styled.div(
  () => `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px;
    background-color: white;
    min-width: 12rem;
    @media only screen and (max-width: 1400px) {
      min-width: 4rem;
    }
  `
)
