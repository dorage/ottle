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
const Pagename = styled.div`
    font-size: ${(props) => props.theme.font.p14};
    font-weight: 700;
`;
const Block = styled.div`
    width: 4rem;
    height: 100%;
`;
//#endregion

export const OttleDetailHeader = ({ loading, data }) => {
    const navigation = useNavigate();

    if (loading) return <></>;
    return (
        <Container>
            <IconButton
                icon={<HiChevronLeft />}
                onClick={() => navigation(-1)}
            />
            <TitleSection>
                <Pagename>
                    <b>{data.user.name}</b> 님의 옷뜰
                </Pagename>
            </TitleSection>
            <Block></Block>
        </Container>
    );
};
