import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LoadingBlock } from '../OttleCreateItemDrawer/LoadingItem';

//#region styled-components
const Container = styled.div`
    font-size: ${(props) => props.theme.font.p14};
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
const Name = styled.div`
    font-size: ${(props) => props.theme.font.p14};
    font-weight: 700;
`;
const Username = styled.div`
    font-size: ${(props) => props.theme.font.p10};
`;
//#endregion

export const OttleHeader = ({ loading, user }) => {
    if (loading)
        return (
            <Container>
                <Name>
                    <LoadingBlock length={5} />
                </Name>
                <Username>
                    <LoadingBlock length={5} />
                </Username>
            </Container>
        );
    return (
        <Container>
            <Name>{user.name}</Name>
            <Username>@{user.username}</Username>
        </Container>
    );
};
