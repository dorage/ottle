import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Portrait } from '../Layout/Portrait';
import { LoadingBlock } from '../OttleCreateItemDrawer/LoadingItem';
import { LikeButton } from '../Button/LikeButton';
import { CopyLinkButton } from './CopyLinkButton';
import { LinkHoC } from '../HOC/LinkHoC';

//#region styled-components
const Container = styled.div``;
const Header = styled.div`
    display: flex;
    font-size: ${(props) => props.theme.font.p14};
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
const ProfileSection = styled.div`
    height: ${(props) => props.theme.gap.gap_32};
    aspect-ratio: 1/1;
    margin-right: ${(props) => props.theme.gap.gap_8};
`;
const ImageSection = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const Control = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const Body = styled.div`
    margin-bottom: ${(props) => props.theme.gap.gap_4};
    font-size: ${(props) => props.theme.font.p14};
`;
const Image = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-size: cover;
`;
//#endregion

export const Ottle = ({ loading, data }) => {
    return (
        <Container>
            <Header>
                <ProfileSection>
                    <Portrait src={data.user.profile_src} />
                </ProfileSection>
                <div>
                    <div>
                        <b>{data.user.name}</b>
                    </div>
                    <div>@{data.user.username}</div>
                </div>
            </Header>
            <ImageSection>
                <Image src={data.ottle.image.lg} />
            </ImageSection>
            <Control>
                <LikeButton ottleId={data.ottle.id} initialValue={data.like} />
                <CopyLinkButton
                    username={data.user.username}
                    ottleId={data.ottle.id}
                />
            </Control>
            <Body>{data.ottle.description}</Body>
        </Container>
    );
};
