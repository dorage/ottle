import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GroupsMyGroups } from './MyGroups';
import { TrendGroups } from './TrendGroups';

//#region styled-components
const Container = styled.div``;
//#endregion

export const Groups = () => {
    return (
        <Container>
            <div className='pad'>
                <h1>My Groups</h1>
                <GroupsMyGroups />
                <div>
                    <div>더 보기 {'>'}</div>
                </div>
            </div>
            <div className='pad'>
                <h1>Trending Groups</h1>
                <TrendGroups />
            </div>
        </Container>
    );
};
