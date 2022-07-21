import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const JUSTIFY_CONTENT = {
    normal: 'normal',
    center: 'center',
    start: 'start',
    end: 'end',
    flexStart: 'flex-start',
    flexEnd: 'flex-end',
    left: 'left',
    right: 'right',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
    stretch: 'stretch',
    safeCenter: 'safe center',
    unsafeCenter: 'unsafe center',
    inherit: 'inherit',
    initial: 'initial',
    revert: 'revert',
    revertLayer: 'revert-layer',
    unset: 'unset',
};

export const ALIGN_ITEMS = {
    normal: 'normal',
    stretch: 'stretch',
    center: 'center',
    start: 'start',
    end: 'end',
    flexStart: 'flex-start',
    flexEnd: 'flex-end',
    baseline: 'baseline',
    firstBaseline: 'first baseline',
    lastBaseline: 'last baseline',
    safeCenter: 'safe center',
    unsafeCenter: 'unsafe center',
    inherit: 'inherit',
    initial: 'initial',
    revert: 'revert',
    revertLayer: 'revert-layer',
    unset: 'unset',
};

export const OVERFLOW = {
    auto: 'auto',
    hidden: 'hidden',
    scroll: 'scroll',
    visible: 'visible',
};

const StyledRow = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
    justify-content: ${(props) => props.justify || JUSTIFY_CONTENT.normal};
    align-items: ${(props) => props.align || ALIGN_ITEMS.normal};
    overflow-x: ${(props) => props.overflow || OVERFLOW.hidden};
`;
export const Row = ({
    reverse,
    justify,
    align,
    overflow,
    children,
    ...props
}) => (
    <StyledRow
        reverse={reverse}
        justify={justify}
        align={align}
        overflow={overflow}
        {...props}
    >
        {children}
    </StyledRow>
);

const StyledColumn = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.reverse ? 'column-reverse' : 'column')};
    justify-content: ${(props) => props.justify || JUSTIFY_CONTENT.normal};
    align-items: ${(props) => props.align || ALIGN_ITEMS.normal};
    overflow-y: ${(props) => props.overflow || OVERFLOW.hidden};
`;
export const Column = ({
    reverse,
    justify,
    align,
    overflow,
    children,
    ...props
}) => (
    <StyledColumn
        reverse={reverse}
        justify={justify}
        align={align}
        overflow={overflow}
        {...props}
    >
        {children}
    </StyledColumn>
);

export const FlexBox = styled.div`
    flex: ${(props) => props.flex || '1'};
`;
