import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeItem,
    selectItem,
    selectOttleItem,
} from '../../features/ottleMaker/ottleItemSlice';
import { IconButton } from '../../components/Button/IconButton';
import { HiXCircle } from 'react-icons/hi';
import { theme } from '../../assets/styles/GlobalStyles';

//#region styled-components
const vibe = keyframes`
    0%{
        transform: rotate(-3deg);
    }
    50%{
        transform: rotate(3deg);
    }
    100%{
        transform: rotate(-3deg);
    }
`;
const Container = styled.div`
    position: relative;
    grid-column: ${(props) => (props.index % 6) + 1};
    grid-row: ${(props) => Math.floor(props.index / 6) + 1};
`;
const SmallProfile = styled.div.attrs((props) => ({
    style: {
        border: props.selected
            ? `2px solid ${props.theme.color.highlight}`
            : `none`,
    },
}))`
    width: 100%;
    border-radius: 2rem;
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    aspect-ratio: 1/1;

    animation-name: ${(props) => (props.deleteMode ? vibe : 'none')};
    animation-timing-function: linear;
    animation-duration: 0.4s;
    animation-iteration-count: infinite;
`;
const DeleteContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
//#endregion

export const ProductLayer = ({
    index,
    item,
    selected,
    deleteMode,
    ...props
}) => {
    const dispatch = useDispatch();
    const {
        product: {
            image: { original },
        },
    } = item;

    const onClickProduct = () => {
        if (selected) return;
        dispatch(selectItem(index));
    };
    return (
        <Container index={index} {...props}>
            <SmallProfile
                src={original}
                selected={selected}
                deleteMode={deleteMode}
                onClick={!deleteMode && onClickProduct}
            />
            {deleteMode && (
                <DeleteContainer>
                    <IconButton
                        icon={<HiXCircle />}
                        normalColor={theme.color.highlight}
                        onClick={() => dispatch(removeItem(index))}
                    />
                </DeleteContainer>
            )}
        </Container>
    );
};
