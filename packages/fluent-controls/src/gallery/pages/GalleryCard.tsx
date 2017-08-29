import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../../Icon';
import {SolidBackground, ImageBackground, GalleryCard} from '../../GalleryCard';

export const CardTest = () => {
    
    const out1 = () => {
        let bg = (
            <SolidBackground backgroundColor='green' fixed>
                <IconBackground backgroundColor='yellow' />
                <Icon icon='smartcardVirtual' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg} banner='Coming soon!'>
                <header>Title</header>
                <section>Lorem ipsum</section>
                <footer><button>Action!!!!</button></footer>
            </GalleryCard>
        );
    };

    const out2 = () => {
        let bg = (
            <ImageBackground src='/card-bg.png' fixed>
                <IconBackground backgroundColor='yellow' />
                <Icon icon='cancelLegacy' size={IconSize.xlarge}></Icon>
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
                <Icon icon='cancelLegacy' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg}>
                <header>T itle</header>
                <section>Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out4 = () => {
        let bg = (
            <SolidBackground backgroundColor='green' fixed>
                <Icon icon='cancelLegacy' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg}>
            </GalleryCard>
        );
    };

    const out5 = () => {
        let bg = (
            <SolidBackground backgroundColor='green'>
                <Icon icon='cancelLegacy' size={IconSize.xlarge} />
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
