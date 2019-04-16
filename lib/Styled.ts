import styled, { ThemeProps } from 'styled-components';

import { ShellTheme } from './components/Shell';
import { Elements } from './Attributes';

const button = styled(Elements.button)`
    &&&&& {
        color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorTextBtnStandardRest};
        background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnStandardRest};
        &:hover { 
            background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnStandardHover};
        }
        &:disabled {
            color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorTextBtnStandardDisabled};
            background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnStandardDisabled};
        }
    }
`;

export const StyledElements = {
    button
};