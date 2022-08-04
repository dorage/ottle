import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Portrait } from '../Layout/Portrait';
import { LoadingBlock } from '../OttleCreateItemDrawer/LoadingItem';
import { LikeButton } from '../Button/LikeButton';
import { LinkHoC } from '../HOC/LinkHoC';
import { CopyClipboardHoC } from '../HOC/CopyClipboardHoC';
import { IconButton } from '../Button/IconButton';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { routes } from '../../configs/routes';

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
const CopyLinkIconButton = CopyClipboardHoC(IconButton);

export const Ottle = ({ loading, data }) => {
    return (
        <Container>
            <Header>
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
                <CopyLinkIconButton
                    url={`${window.location.host}${routes.ottleDetail(
                        data.user.username,
                        data.ottle.nanoid
                    )}`}
                    active={true}
                    icon={<HiOutlineClipboardCopy />}
                />
            </Control>
            <Body>{data.ottle.description}</Body>
        </Container>
    );
};
