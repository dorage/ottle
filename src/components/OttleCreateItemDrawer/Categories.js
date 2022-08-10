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
import { selectItemDrawerSearch } from '../../features/ottleMaker/itemDrawerSearchSlice';

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
const Error = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-start: 1;
    grid-column-end: 5;

    color: ${(props) => props.theme.color.black_400};
    text-align: center;
    font-weight: 700;
`;
//#endregion

const Categories = ({ loading, data, error, onClick }) => {
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
        return <Error>카테고리 정보를 가져올 수 없습니다</Error>;
    }

    return (
        <>
            {data.map((categeogry) => (
                <CategoryContainer
                    onClick={onClick(categeogry)}
                    key={categeogry.id}
                >
                    {categeogry.name}
                </CategoryContainer>
            ))}
        </>
    );
};

export const ItemDrawerCategories = ({ onClick }) => {
    const { loading, data, error } = useSelector(selectItemDrawerCategory);
    return (
        <Categories
            loading={loading}
            data={data}
            error={error}
            onClick={onClick}
        />
    );
};

export const ItemDrawerSearchCategory = ({ onClick }) => {
    const { loading, categories, error } = useSelector(selectItemDrawerSearch);
    return (
        <Categories
            loading={loading}
            data={categories}
            error={error}
            onClick={onClick}
        />
    );
};
