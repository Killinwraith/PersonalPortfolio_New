# public/stickers/

Drop real photographed ephemera here. Anything you'd actually stick on a wall:

- Photos of fits, cropped square-ish
- Plane / train / museum / concert ticket scans
- Polaroids of trips
- Real brand stickers you own (scan or photograph at high contrast)
- Doodles, sketches, receipts, gate tags

## naming convention

`<id>-<short-name>.<ext>` — e.g.:

- `tokyo-shimokita-01.jpg`
- `fit-04.jpg`
- `ald-hoodie.png`
- `boarding-yyc-nrt.jpg`

Keep file names URL-safe (lowercase, hyphens, no spaces).

## adding a sticker to the wall

Edit `src/content/stickers.json` and add an entry referencing the image:

```json
{
  "id": "tokyo-shimokita-01",
  "src": "/stickers/tokyo-shimokita-01.jpg",
  "alt": "Shimokitazawa vintage shop, 2026",
  "x": 22, "y": 18, "rotation": -7, "z": 5,
  "href": "/features/tokyo-notes"
}
```

When `src` is set, the sticker renders as an image rather than as a text label.

## sizing tip

The sticker primitive caps image width at 140px by default. Pre-crop images to roughly square or slightly tall, ~280×280 (2x for retina).
