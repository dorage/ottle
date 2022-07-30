import styled from 'styled-components';

export const FooterContainer = styled.div`
    position: sticky;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5rem;
    min-height: 5rem;
    max-height: 5rem;

    border-top: 1px solid ${(props) => props.theme.color.black_600};
    background-color: white;
`;
