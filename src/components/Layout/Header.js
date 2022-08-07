import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    min-height: 5rem;
    padding-left: ${(props) => props.theme.gap.gap_16};
    padding-right: ${(props) => props.theme.gap.gap_16};

    background-color: white;
`;
