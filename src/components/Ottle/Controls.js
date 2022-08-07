import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    OttleLikeContext,
    OttleLikeContextProvierHoC,
} from '../Context/OttleLikeContext';
import { TextButton } from '../Button/TextButton';
import { LoadingBlock } from '../OttleCreateItemDrawer/LoadingItem';
import { theme } from '../../assets/styles/GlobalStyles';
import { LikeButton } from '../Button/LikeButton';
import { CopyClipboardHoC } from '../HOC/CopyClipboardHoC';
import { routes } from '../../configs/routes';

//#region styled-components
const Container = styled.div`
    display: flex;
    align-items: center;

    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const CopyTextButton = CopyClipboardHoC(TextButton);
//#endregion

const Component = ({ ottle, user }) => {
    const {
        state: { loading },
    } = useContext(OttleLikeContext);

    if (loading)
        return (
            <Container>
                <TextButton>
                    <LoadingBlock length={5} />
                </TextButton>
                <TextButton>
                    <LoadingBlock length={5} />
                </TextButton>
                <TextButton>
                    <LoadingBlock length={5} />
                </TextButton>
            </Container>
        );

    return (
        <Container>
            <LikeButton
                ottleId={ottle.id}
                initialValue={false}
                fontSize={theme.font.p14}
                color={theme.color.black_200}
            />
            <CopyTextButton
                url={`${window.location.host}${routes.ottleDetail(
                    user.username,
                    ottle.nanoid
                )}`}
                fontSize={theme.font.p14}
                color={theme.color.black_200}
            >
                공유하기
            </CopyTextButton>
        </Container>
    );
};

export const OttleControls = OttleLikeContextProvierHoC(Component);
