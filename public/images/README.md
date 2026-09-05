# Site imagery

Every photo slot on the site is numbered, and its placeholder block shows
the number on screen ("IMAGE 03"). To fill a slot, upload a file named by
that number into this folder — `03.jpg`, `03.png`, `03.webp` all work — and
rebuild or redeploy. Nothing else to change.

| Number | Where it appears | Shape |
| --- | --- | --- |
| 01 | Homepage hero, right column | portrait |
| 02 | How it works, step 01 | landscape |
| 03 | How it works, step 02 | landscape |
| 04 | How it works, step 03 | landscape |
| 05 | The Product page hero (Estrada packaging shot) | portrait |
| 06 | Start your consult, right column on large screens | portrait |
| 07 | How it works, wide band above the cycle section | wide (16:9) |
| 08 | The Product page, beside "How it's dosed" (second Estrada shot) | landscape |

Roughly 1600px on the long edge is plenty. Alt text lives in
`src/config/images.ts` next to each number.
