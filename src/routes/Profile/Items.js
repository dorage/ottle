import React, { useState } from 'react';
import { routes } from '../../configs/routes';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generateItem } from '../../features/ottleMaker/ottleItemSlice';
import { useNavigate } from 'react-router-dom';

//#region styled-components
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${(props) => props.theme.gap.gap_4};
`;
const Ottle = styled.img`
    background-color: ${(props) => props.theme.color.black_600};
    aspect-ratio: 1/1;
    width: 100%;
`;
//#endregion

const items = Array(40)
    .fill(0)
    .map(() => generateItem());

export const ProfileItems = () => {
    const navigation = useNavigate();

    const onClickOttle = (id) => () => {
        navigation(routes.ottleDetail(id));
    };

    return (
        <Container className='pad'>
            {items.map(({ id, src }, idx) => (
                <Ottle
                    key={`${idx}${id}`}
                    src={src}
                    onClick={onClickOttle(id)}
                />
            ))}
        </Container>
    );
};
