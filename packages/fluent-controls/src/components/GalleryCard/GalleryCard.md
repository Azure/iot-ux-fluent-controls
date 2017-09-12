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
        <GalleryCard>
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