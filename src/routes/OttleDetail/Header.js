import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../configs/routes';
import styled from 'styled-components';
import { HeaderContainer } from '../../components/Layout/Header';
import { IconButton } from '../../components/Button/IconButton';
import { HiChevronLeft } from 'react-icons/hi';

//#region styled-components
const Container = styled(HeaderContainer)`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
`;

const TitleSection = styled.div`
    text-align: center;
`;
const Username = styled.div`
    font-size: ${(props) => props.theme.font.p10};
`;
const Pagename = styled.div`
    font-size: ${(props) => props.theme.font.p12};
    font-weight: 700;
`;
const Block = styled.div`
    width: 4rem;
    height: 100%;
`;
//#endregion

export const OttleDetailHeader = () => {
    const navigation = useNavigate();
    return (
        <Container>
            <IconButton
                icon={<HiChevronLeft />}
                onClick={() => navigation(routes.main)}
            />
            <TitleSection>
                <Username></Username>
                <Pagename>Ottles</Pagename>
            </TitleSection>
            <Block></Block>
        </Container>
    );
};
