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
import { ShareHoC } from '../HOC/ShareHoC';
import { routes } from '../../configs/routes';
import { loadImage, drawWatermark } from '../../configs/utils';

//#region styled-components
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: ${(props) => props.theme.gap.gap_8};
`;
const CopyTextButton = ShareHoC(TextButton);
//#endregion

const Component = ({ ottle, user }) => {
    const {
        state: { loading },
    } = useContext(OttleLikeContext);

    const downloadImage = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');
        const img = await loadImage(ottle.image.original);
        ctx.save();
        ctx.drawImage(img, 0, 0, 1080, 1080);
        ctx.restore();
        await drawWatermark(ctx);
        const link = document.createElement('a');
        link.download = `${user.username}_${ottle.nanoid}.webp`;
        link.href = canvas.toDataURL();
        link.click();
        link.remove();
    };

    if (loading)
        return (
            <Container>
                <div>
                    <TextButton>
                        <LoadingBlock length={5} />
                    </TextButton>
                    <TextButton>
                        <LoadingBlock length={5} />
                    </TextButton>
                </div>
                <div>
                    <TextButton>
                        <LoadingBlock length={5} />
                    </TextButton>
                </div>
            </Container>
        );

    return (
        <Container>
            <div>
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
            </div>
            <div>
                <TextButton
                    fontSize={theme.font.p14}
                    color={theme.color.black_200}
                    onClick={downloadImage}
                >
                    이미지 저장
                </TextButton>
            </div>
        </Container>
    );
};

export const OttleControls = OttleLikeContextProvierHoC(Component);
