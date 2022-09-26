import React from 'react';
import styled from 'styled-components';

//#region styled-components
const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: ${(props) => props.theme.gap.gap_8};
    padding-bottom: ${(props) => props.theme.gap.gap_8};
    padding-left: ${(props) => props.theme.gap.gap_8};
    padding-right: ${(props) => props.theme.gap.gap_8};
    margin-bottom: ${(props) => props.theme.gap.gap_8};

    &.warning {
        color: ${(props) => props.theme.color.warning.text};
        background-color: ${(props) => props.theme.color.warning.bg};
    }
    &.success {
        color: ${(props) => props.theme.color.success.text};
        background-color: ${(props) => props.theme.color.success.bg};
    }
    border-radius: ${(props) => props.theme.gap.gap_8};
    font-size: ${(props) => props.theme.font.p12};
`;
const PadSpan = styled.span`
    padding: 0 ${(props) => props.theme.gap.gap_4};
`;
const Link = styled.a`
    font-weight: 600;
`;
//#endregion

export const ProfileNotice = ({ icon: Icon, text, href, color }) => {
    return (
        <Container className={color}>
            <PadSpan>
                <Icon />
            </PadSpan>
            <span className='flex-1'>{text}</span>
            <Link href={href} target='_blank'>
                {'바로가기 >'}
            </Link>
        </Container>
    );
};
