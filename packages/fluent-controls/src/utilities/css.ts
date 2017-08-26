const mdprefix = 'md-';

export function block(block: string, element?: string): string {
    let suffix = !!element ? `__${element}` : '';
    return `${mdprefix}${block}${suffix}`;
}

export function mod(block: string, element?: string, modifier?: string): string {
    let suffix: string;
    if (!!modifier) {
        suffix = !!element ? `--${element}` : '';
    } else {
        suffix = !!element ? `__${element}--${modifier}` : '';
    }

    return `${mdprefix}${block}${suffix}`;
}