import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputField } from '../Input/InputField';
import { _ } from '../../utils/fp';
import { searchItem } from '../../app/functions';
import { useDispatch, useSelector } from 'react-redux';
import {
    itemDrawerSearchAsyncAction,
    selectItemDrawerSearch,
} from '../../features/ottleMaker/itemDrawerSearchSlice';

//#region styled-components
const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
//#endregion

const searchTerm = _.debouce(async (func) => {
    func();
}, 1000);

export const ItemDrawerSearchBar = () => {
    const [term, setTerm] = useState('');
    const { isSearching } = useSelector(selectItemDrawerSearch);
    const dispatch = useDispatch();

    const setValue = (v) => {
        setTerm(v);
        searchTerm(() => {
            dispatch(itemDrawerSearchAsyncAction({ term: v }));
        });
    };

    useEffect(() => {
        if (isSearching) return;
        setTerm('');
    }, [isSearching]);

    return (
        <Container>
            <InputField
                placeholder='브랜드 및 상품명 검색'
                value={term}
                setValue={setValue}
                blank={true}
            />
        </Container>
    );
};
