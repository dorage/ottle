import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Thumbnail } from '../Layout/Thumbnail';
import { ExLinkedIconButton } from '../Button/IconButton';
import {
    HiOutlineHeart,
    HiOutlineShoppingBag,
    HiOutlineLink,
} from 'react-icons/hi';
import { logEventFirebase } from '../../app/analytics';

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
    font-weight: 500;
`;
const Name = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    font-size: ${(props) => props.theme.font.p14};
`;
const IconSection = styled.div`
    display: flex;
    align-items: center;
`;

//#endregion

export const OttleItems = ({ items }) => {
    return (
        <>
            {items.map(({ image: { sm }, name, brand, link }, idx) => (
                <Container key={idx}>
                    <ThumbSection>
                        <Thumbnail src={sm} />
                    </ThumbSection>
                    <InfoSection>
                        <Brand>{brand}</Brand>
                        <Name className={'text-overflow'}>{name}</Name>
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
            ))}
        </>
    );
};
