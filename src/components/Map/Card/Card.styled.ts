import styled from 'styled-components'

export const Container = styled.div(
  ({ assigned, haveMaison, isEvenRow }) => `
        ${
          isEvenRow
            ? `border-bottom: 2px #1976d2 solid;`
            : `border-top: 2px #1976d2 solid;`
        }
        border: 2px #1976d2 solid;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 0.5rem;
        margin: 0.4rem;
        min-width: 12rem;
        cursor: pointer;
        &:hover {
          background: #ebebeb;
        }
        span {
          font-size: 0.8rem;
        }
        ${
          haveMaison
            ? `
        `
            : `
            border-color: white;
            `
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
