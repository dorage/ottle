import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../configs/routes';
import styled from 'styled-components';
import { HeaderContainer } from '../../components/Layout/Header';
import { IconButton } from '../../components/Button/IconButton';
import { HiChevronLeft } from 'react-icons/hi';
import { UserContext } from '../../components/Context/UserContext';
import { LoadingBlock } from '../../components/OttleCreateItemDrawer/LoadingItem';

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

export const OttleDetailHeader = () => {
    const navigation = useNavigate();
    const { loading, user } = useContext(UserContext);

    const onClickBack = () => {
        navigation(routes.user(user.username));
    };

    if (loading) {
        return (
            <Container>
                <IconButton icon={<HiChevronLeft />} onClick={onClickBack} />
                <TitleSection>
                    <LoadingBlock />
                </TitleSection>
                <Block></Block>
            </Container>
        );
    }

    return (
        <Container>
            <IconButton icon={<HiChevronLeft />} onClick={onClickBack} />
            <TitleSection>
                <Pagename>
                    <b>{user.name}</b> 님의 옷뜰
                </Pagename>
            </TitleSection>
            <Block></Block>
        </Container>
    );
};
