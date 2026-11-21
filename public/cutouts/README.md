# Hero cutout art

The Living Theatre plaza (`/banisa` → **Living Theatre** tab) draws each of the six
cutouts as a hand-authored SVG pose silhouette. That is the fallback and it always
renders.

If you drop a real cutout image in this folder, `CutoutBoard` layers it over the
silhouette automatically — no code change. Expected filenames:

| File            | Hero          | Pose                                    |
| --------------- | ------------- | --------------------------------------- |
| `prabhas.png`   | Prabhas       | Salaar — chain in hand, coat in the wind |
| `pawan.png`     | Pawan Kalyan  | OG — smoking walk                        |
| `charan.png`    | Ram Charan    | Rangasthalam — hand cupped at the ear    |
| `allu.png`      | Allu Arjun    | Pushpa — beard tilt, hand under chin     |
| `ntr.png`       | NTR Jr.       | Devara — arms wide, muscular stance      |
| `mahesh.png`    | Mahesh Babu   | Pokiri / Guntur Kaaram — stylish walk    |

Guidelines:

- **Transparent PNG**, subject cut out, feet flush with the bottom edge — the board
  uses `object-contain object-bottom` on a `200 × 460` (≈1:2.3) frame.
- Faces stay legible at ~170px wide on desktop, so crop tight and keep the head in
  the top ~20% of the image.
- A missing file is not an error: `onError` drops the layer and the silhouette shows
  through.

Filenames come from the `photo` field in [`src/data/theatre.ts`](../../src/data/theatre.ts)
— change them there if you want different paths.
