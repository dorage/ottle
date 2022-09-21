import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinkedRoundButton } from '../../components/Button/RoundButton';
import { routes } from '../../configs/routes';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

//#region styled-components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: ${(props) => props.theme.gap.gap_64};
`;
const Mention = styled.div`
    font-size: ${(props) => props.theme.font.p18};
    margin-bottom: ${(props) => props.theme.gap.gap_16};
`;
//#endregion

export const NoItem = () => {
    const { username } = useParams();
    const { isAuth } = useSelector(selectUser);

    if (!isAuth) return <Container></Container>;

    return (
        <Container>
            <Mention>
                첫 <b>Ottle</b>을 만들어보세요!
            </Mention>
            <LinkedRoundButton to={routes.ottleCreate(username)}>
                CREATE
            </LinkedRoundButton>
        </Container>
    );
};
