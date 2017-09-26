```jsx
const SolidBackground = require('./SolidBackground').SolidBackground;
<div>
    <a href='#'>
        <GalleryCard background={<SolidBackground backgroundColor='red'/>}>
            <header>Header</header>
            <section>Content</section>
        </GalleryCard>
    </a>
    <a href='#'>
        <GalleryCard banner='Coming soon!'>
            <header>Header</header>
            <section>Content</section>
        </GalleryCard>
    </a>
    <a href='#'>
        <GalleryCard banner='This is a very long banner. This is a very long banner. This is a very long banner. '>
            <header>Header</header>
            <section>Content</section>
        </GalleryCard>
    </a>
    <a href='#'>
        <GalleryCard disabled>
            <header>Header</header>
            <section>Content</section>
        </GalleryCard>
    </a>
</div>
```