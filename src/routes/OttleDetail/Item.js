import React from 'react';
import styled from 'styled-components';
import { Thumbnail } from '../../components/Layout/Thumbnail';
import { ExLinkedIconButton } from '../../components/Button/IconButton';
import { HiOutlineLink } from 'react-icons/hi';
import { logEventFirebase } from '../../app/analytics';
import { LoadingBlock } from '../../components/OttleCreateItemDrawer/LoadingItem';
import { unitNumber } from '../../configs/utils';

//#region styled-components

const Container = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vw / 8);
    margin-bottom: ${(props) => props.theme.gap.gap_16};

    overflow: hidden;
`;
const ThumbSection = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
`;
const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    flex: 4;
    min-width: 0;
    padding: 0 ${(props) => props.theme.gap.gap_8};
`;
const Brand = styled.div`
    font-size: ${(props) => props.theme.font.p10};
    font-weight: 700;
`;
const Name = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    font-size: ${(props) => props.theme.font.p14};
`;
const Price = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: ${(props) => props.theme.font.p12};
`;
const IconSection = styled.div`
    display: flex;
    align-items: center;
`;
//#endregion

export const Item = ({ loading, item }) => {
    if (loading) {
        return (
            <Container>
                <ThumbSection>
                    <LoadingBlock />
                </ThumbSection>
                <InfoSection>
                    <Brand>
                        <LoadingBlock />
                    </Brand>
                    <Name className={'text-overflow'}>
                        <LoadingBlock />
                    </Name>
                </InfoSection>
                <IconSection>
                    <LoadingBlock />
                </IconSection>
            </Container>
        );
    }

    const {
        image: { original },
        name,
        brand,
        price,
        link,
    } = item;

    return (
        <Container>
            <ThumbSection>
                <Thumbnail src={original} />
            </ThumbSection>
            <InfoSection>
                <Brand>{brand}</Brand>
                <Name className={'text-overflow'}>{name}</Name>
                <Price>{unitNumber(price)} 원</Price>
            </InfoSection>
            <IconSection>
                <ExLinkedIconButton
                    to={link}
                    w={16}
                    h={16}
                    icon={<HiOutlineLink />}
                    onClick={() => {
                        logEventFirebase('item_link', {
                            brand,
                            name,
                            link,
                        });
                    }}
                />
            </IconSection>
        </Container>
    );
};
