import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../../Icon';
import {SolidBackground, ImageBackground, GalleryCardIcon, GalleryCard} from '../../GalleryCard';
const css = classNames.bind(require('./GalleryCard.scss'));

export const CardTest = () => {
    
    const out1 = () => {
        let bg = (
            <SolidBackground backgroundColor='green' fixed>
                <IconBackground diameter={120} centered backgroundColor='yellow' />
                <GalleryCardIcon icon='smartcardVirtual' />
            </SolidBackground>
        );

        return (
            <GalleryCard  className={css('management-card')}  background={bg} banner='Coming soon!' fixed>
                <header>Title</header>
                <section>Lorem ipsum</section>
                <footer><button>Action!!!!</button></footer>
            </GalleryCard>
        );
    };

    const out2 = () => {
        let bg = (
            <ImageBackground src='/card-bg.png' fixed>
                <IconBackground diameter={120} centered backgroundColor='yellow' />
                <GalleryCardIcon icon='cancelLegacy' fontSize={72} />
            </ImageBackground>
        );

        return (
            <GalleryCard background={bg} fixed>
                <header>Title</header>
                <section>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out3 = () => {
        let bg = (
            <SolidBackground backgroundColor='green' fixed>
                <GalleryCardIcon icon='cancelLegacy' fontSize={72} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg} fixed>
                <header>Title</header>
                <section>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out4 = () => {
        let bg = (
            <SolidBackground backgroundColor='green' fixed>
                <GalleryCardIcon icon='cancelLegacy' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg}>
            </GalleryCard>
        );
    };

    const out5 = () => {
        let style: any = {
            'fontSize': '16px',
            'display': 'block'
        };
        let bg = (
            <SolidBackground backgroundColor='green'>
                <GalleryCardIcon centered icon='cancelLegacy' size={IconSize.xlarge} title='This is text under icon!' />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg} fixed href='#'>
            </GalleryCard>
        );
    };

    return (
        <div>
            {out1()}
            {out2()}
            {out3()}
            {out4()}
            {out5()}
        </div>
    );
};
