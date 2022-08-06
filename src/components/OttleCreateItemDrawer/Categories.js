import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
    itemDrawerMainCategoryAsyncAction,
    itemDrawerSubCategoryAsyncAction,
    selectItemDrawerCategory,
} from '../../features/ottleMaker/itemDrawerCategorySlice';
import { LoadingBlock } from './LoadingItem';

//#region styled-components
const CategoryContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    font-size: ${(props) => props.theme.font.p12};
    font-weight: 700;
    border: 1px solid ${(props) => props.theme.color.black_600};
    border-radius: 20px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background-color: ${(props) => props.theme.color.black_600};
    }
    &:active {
        background-color: ${(props) => props.theme.color.black_500};
    }

    cursor: pointer;
`;
//#endregion

export const GridCategories = ({ scrollRef }) => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(selectItemDrawerCategory);

    useEffect(() => {
        dispatch(itemDrawerMainCategoryAsyncAction());
    }, []);

    const onClickCategory = (categoryId, name) => () => {
        const { scrollTop } = scrollRef.current;
        dispatch(
            itemDrawerSubCategoryAsyncAction({ categoryId, name, scrollTop })
        );
        scrollRef.current.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <>
                {Array(8)
                    .fill()
                    .map((_, idx) => (
                        <LoadingBlock key={idx} />
                    ))}
            </>
        );
    }

    if (error) {
        return <>error</>;
    }

    if (data) {
        return (
            <>
                {data.map(({ name, id }) => (
                    <CategoryContainer
                        onClick={onClickCategory(id, name)}
                        key={id}
                    >
                        {name}
                    </CategoryContainer>
                ))}
            </>
        );
    }
};
