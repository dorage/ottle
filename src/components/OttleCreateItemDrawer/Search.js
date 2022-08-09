import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputField } from '../Input/InputField';
import { _ } from '../../utils/fp';
import { searchItem } from '../../app/functions';

//#region styled-components
const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: ${(props) => props.theme.gap.gap_4};
`;
//#endregion

const searchTerm = _.debouce(async (term) => {
    console.log(await searchItem(term));
}, 1000);

export const ItemDrawerSearchBar = () => {
    const [term, setTerm] = useState('');

    const setValue = (v) => {
        setTerm(v);
        searchTerm(v);
    };

    return (
        <Container>
            <InputField
                placeholder='브랜드 / 상품명 검색'
                value={term}
                setValue={setValue}
                blank={true}
            />
        </Container>
    );
};
