import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectItemDrawerCategory } from '../../features/ottleMaker/itemDrawerCategorySlice';
import { GridLoadingItem } from './LoadingItem';
import { getItemsInCategory } from '../../app/firestore';
import { itemDrawerItemsAsyncAction } from '../../features/ottleMaker/itemDrawerItemsSlice';

//#region styled-components
const CategoryContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${(props) => props.theme.font.p16};
    font-weight: 700;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.color.black_600};
    border-radius: 20px;
    & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover {
        background-color: ${(props) => props.theme.color.black_600};
    }
    &:active {
        background-color: ${(props) => props.theme.color.black_500};
    }

    cursor: pointer;
`;
//#endregion

export const GridCategories = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(selectItemDrawerCategory);

    const onClickCategory = (id) => () => {
        dispatch(itemDrawerItemsAsyncAction(id));
    };

    return (
        <>
            {loading ? (
                <>
                    {Array(9)
                        .fill()
                        .map((_, idx) => (
                            <GridLoadingItem key={idx} />
                        ))}
                </>
            ) : (
                data.map(({ name, id }, idx) => (
                    <CategoryContainer onClick={onClickCategory(id)} key={idx}>
                        {name}
                    </CategoryContainer>
                ))
            )}
        </>
    );
};
