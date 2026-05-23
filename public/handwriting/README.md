# public/handwriting/

This is where your actual handwritten name lives.

## the goal

Replace the italic-serif "Hetang" placeholder on the wall with a real scan of your handwriting. This single swap is the move that takes the site from "well-designed" to "feels like a person."

## how to do it

1. Get a thick black marker (Sharpie, Posca, brush pen — whatever feels like you).
2. Write your name 20–30 times on a sheet of white paper. Varied sizes, varied energy. Some careful, some scribbled, some tags.
3. Photograph or scan the sheet on a flat surface with good light.
4. Pick the one or two that feel most like you.
5. Open in any image editor: crop tightly around the word, then make the background transparent (Photoshop / Photopea / Pixelmator all do this in a click — magic wand on the white, delete).
6. Save as `hetang.png` in this folder.

## activating it on the site

Open `src/components/StickerWall.astro`. Find this block:

```html
<div class="signature" aria-label="Hetang">
  <span>Hetang</span>
</div>
```

Replace the `<span>` with:

```html
<img src="/handwriting/hetang.png" alt="Hetang" />
```

That's it. The CSS already handles sizing and dark-mode inversion.

## optional: a font

If you want every instance of "Hetang" on the site (small signature, blog name, etc.) to use your handwriting consistently:

1. Use [Calligraphr](https://www.calligraphr.com/) — free for one font.
2. Print their template, fill it out with your handwriting, scan, upload.
3. They'll generate a `.ttf` you can drop into this folder and `@font-face` in `global.css`.

Honestly the raw scan looks more alive than the font does. The font is a "nice-to-have," not a "must-have."
