/** Scrapbook photos (public/scrapbook). Order here = order on the board. */
export type Moment = {
  src: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
  /** Optional round sticker on the corner of the polaroid. */
  badge?: string;
  /** Portrait photos take two rows on the board. */
  tall?: boolean;
  /** Wide group shots span two columns. */
  wide?: boolean;
  /** How it is stuck to the board. */
  fix?: "pin" | "tape";
};

export const moments: Moment[] = [
  { src: "/scrapbook/ethara-team.webp", caption: "the Ethara AI intern crew 💼", alt: "Nidhi with the Ethara AI intern group, posing outdoors", width: 1280, height: 720, badge: "intern '26", fix: "pin" },
  { src: "/scrapbook/hackathon-galgotias.webp", caption: "hackathon day @ Galgotias 👍", alt: "Nidhi and a teammate in front of Galgotias University before a hackathon", width: 960, height: 1280, tall: true, fix: "tape" },
  { src: "/scrapbook/hackathon-selfie.webp", caption: "mid-build selfie, Hackhound 2.0 ⚡", alt: "Selfie of Nidhi with two teammates during the Hackhound 2.0 hackathon", width: 1280, height: 720, fix: "tape" },
  { src: "/scrapbook/report.webp", caption: "internship report: submitted! 📘", alt: "Bound blue internship report cover from NIET Greater Noida, supervised by Ethara AI and the CSE (AIML) department, May 2026", width: 902, height: 1599, tall: true, badge: "done ✓", fix: "pin" },
  { src: "/scrapbook/office.webp", caption: "a heads-down work day ☕", alt: "Open-plan office with rows of desks, laptops and yellow chairs", width: 1600, height: 899, fix: "pin" },
  { src: "/scrapbook/hackathon-team12.webp", caption: "table #12 · Coders from Hell 🔥", alt: "Handwritten table sign reading #12 Coders from Hell", width: 1599, height: 902, fix: "tape" },
  { src: "/scrapbook/gdg-crew.webp", caption: "Google Developer Groups event 🎤", alt: "Large group photo at a Google Developer Groups event in an auditorium", width: 1488, height: 1120, wide: true, fix: "tape" },
  { src: "/scrapbook/scribble.webp", caption: "scribble day ✍️ shirts full of signatures", alt: "Selfie of Nidhi with three friends on the college lawn, wearing shirts covered in signatures", width: 1599, height: 899, badge: "class of '26", wide: true, fix: "pin" },
];
