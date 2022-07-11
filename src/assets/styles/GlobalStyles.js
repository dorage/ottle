import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    ${normalize}

    * {
        box-sizing: border-box;
        user-select: none;

        &.pad{
            padding-left: 1.6rem;
            padding-right: 1.6rem;
        }
    }
    html{
        font-size: 62.5%;
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        overflow: none;
    }
    html.noScroll, html.noScroll > body{
        overflow:none;
    }
    body{
        min-height: 100vh;
        max-width: 100vw;
    }
    button{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        &:active{
            filter: blur(0.3rem);
            transition: 0.3s;
        }
    }
    a{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        &:active{
            filter: blur(0.3rem);
            transition: 0.3s;
        }
    }
    section {
        padding-left: 1.6rem;
        padding-right: 1.6rem;
    }
    article {
        padding-left: 1.6rem;
        padding-right: 1.6rem;
    }
`;

export const theme = {
    color: {
        black_100: '#000000',
        black_200: '#333333',
        black_300: '#666666',
        black_400: '#999999',
        black_500: '#bbbbbb',
        black_600: '#eeeeee',
    },
    gap: {
        gap_4: '0.4rem',
        gap_8: '0.8rem',
        gap_16: '1.6rem',
        gap_32: '3.2rem',
        gap_64: '6.4rem',
    },
    font: {
        h1: '2rem',
        h2: '1.5rem',
        h3: '1.17rem',
        h4: '1rem',
        h5: '0.83rem',
        h6: '0.75rem',
        p18: '1.8rem',
        p16: '1.6rem',
        p14: '1.4rem',
        p12: '1.2rem',
        p10: '1rem',
        p8: '0.8rem',
    },
};

export default GlobalStyles;
