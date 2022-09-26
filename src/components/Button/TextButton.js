import styled from 'styled-components';
import { LinkHoC } from '../HOC/LinkHoC';

export const TextButton = styled.button`
    color: ${(props) => props.color || props.theme.color.black_400};
    font-size: ${(props) => props.fontSize || props.theme.font.p16};

    border: none;
    background: none;
`;

export const LinkedTextButton = LinkHoC(TextButton);
