import styled from 'styled-components';

export const FooterContainer = styled.div`
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 5rem;
    max-height: 5rem;

    border-top: 1px solid ${(props) => props.theme.color.black_600};
    background-color: white;
`;
