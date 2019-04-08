import styled from 'styled-components';
import { Elements } from './Attributes';

export interface ComponentTheme {}

export interface DivTheme {
    colorTextRest: string;
    colorBackground: string;
}
export interface ButtonTheme {
    colorRest: string;
    colorHover: string;
    colorDisabled: string;
    colorTextRest: string;
    colorTextDisabled?: string;
}

const div = styled(Elements.div)`
    &&&&&&& {
        color: ${(props: DivTheme) => props.colorTextRest};
        background-color: ${(props: DivTheme) => props.colorBackground};
    }
`;

const button = styled(Elements.button)`
    &&&&& {
        color: ${(props: { theme: ButtonTheme}) => props.theme.colorTextRest};
        background-color: ${(props: { theme: ButtonTheme}) => props.theme.colorRest};
        &:hover { 
            background-color: ${(props: { theme: ButtonTheme}) => props.theme.colorHover};
        }
        &:disabled {
            color: ${(props: { theme: ButtonTheme}) => props.theme.colorTextDisabled};
            background-color: ${(props: { theme: ButtonTheme}) => props.theme.colorDisabled};
        }
    }
`;

export const StyledElements = {
    div,
    button
};