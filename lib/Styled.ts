import styled, { ThemeProps } from 'styled-components';
import { Elements } from './Attributes';

export interface ButtonTheme {
    colorRest?: string;
    colorHover?: string;
    colorDisabled?: string;
    colorTextRest?: string;
    colorTextDisabled?: string;
}

const button = styled(Elements.button)`
    &&&&& {
        color: ${(props: ThemeProps<ButtonTheme>) => props.theme.colorTextRest};
        background-color: ${(props: ThemeProps<ButtonTheme>) => props.theme.colorRest};
        &:hover { 
            background-color: ${(props: ThemeProps<ButtonTheme>) => props.theme.colorHover};
        }
        &:disabled {
            color: ${(props: ThemeProps<ButtonTheme>) => props.theme.colorTextDisabled};
            background-color: ${(props: ThemeProps<ButtonTheme>) => props.theme.colorDisabled};
        }
    }
`;

export const StyledElements = {
    button
};