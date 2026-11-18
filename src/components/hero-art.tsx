/**
 * Original hero illustration: "the model that blooms".
 * A sketchbook laptop running `model.fit()` grows a neural network whose
 * nodes turn into leaves, topped by one red flower: the useful result.
 * Annotated like an engineering notebook. Simple strokes only; decorative.
 */
const INK = "#27231F";
const RED = "#D94B39";
const GREEN = "#77943C";
const BLUE = "#315DA7";
const hand = { fontFamily: "var(--font-hand)" } as const;
const mono = { fontFamily: "var(--font-mono)" } as const;

export function HeroArt({ className = "" }: { className?: string }) {
  // network layout: layer x positions and node y positions
  const layers = [
    { y: 214, xs: [170, 214, 258, 302] },
    { y: 160, xs: [190, 236, 282] },
    { y: 110, xs: [214, 258] },
  ];
  const edges: string[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const a of layers[l].xs) for (const b of layers[l + 1].xs) edges.push(`M${a} ${layers[l].y} L${b} ${layers[l + 1].y}`);
  }
  for (const a of layers[2].xs) edges.push(`M${a} ${layers[2].y} L236 66`);

  return (
    <svg viewBox="0 0 470 420" className={className} aria-hidden="true" focusable="false" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* faint drafting circle + crosshair */}
      <circle cx="236" cy="150" r="128" stroke={INK} strokeOpacity="0.12" strokeDasharray="2 7" />
      <path d="M236 14 V30 M236 270 V286 M100 150 H116 M356 150 H372" stroke={INK} strokeOpacity="0.25" />

      {/* stem from the laptop to the network */}
      <path d="M236 300 C 232 280, 242 262, 236 236 C 232 226, 238 220, 236 214" stroke={GREEN} strokeWidth="3" />
      <path className="sway" d="M236 268 c -18 -2 -30 -12 -32 -26 c 16 0 28 10 32 26Z" fill="#B7C98A" stroke={GREEN} strokeWidth="2" />
      <path className="sway sway-late" d="M237 252 c 16 -6 30 -4 38 4 c -12 10 -28 8 -38 -4Z" fill="#B7C98A" stroke={GREEN} strokeWidth="2" />

      {/* network edges */}
      <g stroke={INK} strokeOpacity="0.4" strokeWidth="1.3">
        {edges.map((d) => <path key={d} d={d} />)}
      </g>
      {/* input + hidden nodes */}
      {layers[0].xs.map((x) => <circle key={`a${x}`} cx={x} cy={layers[0].y} r="8" fill="#FFF1D9" stroke={BLUE} strokeWidth="2.2" />)}
      {layers[1].xs.map((x, i) => (
        <g key={`b${x}`}>
          <path className={`sway ${i % 2 ? "sway-late" : ""}`} d={`M${x} ${layers[1].y} c ${i % 2 ? 14 : -14} -4 ${i % 2 ? 20 : -20} -14 ${i % 2 ? 18 : -18} -22 c ${i % 2 ? -12 : 12} 2 ${i % 2 ? -18 : 18} 10 ${i % 2 ? -18 : 18} 22Z`} fill="#B7C98A" stroke={GREEN} strokeWidth="1.6" />
          <circle cx={x} cy={layers[1].y} r="8" fill="#FFF1D9" stroke={GREEN} strokeWidth="2.2" />
        </g>
      ))}
      {layers[2].xs.map((x) => <circle key={`c${x}`} cx={x} cy={layers[2].y} r="8" fill="#E3ECD0" stroke={GREEN} strokeWidth="2.2" />)}

      {/* the useful result: a red flower */}
      <g transform="translate(236 62)">
        <g className="bloom">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-15" rx="9" ry="15" fill={RED} fillOpacity="0.9" stroke="#8f2a1c" strokeWidth="1.4" transform={`rotate(${r})`} />
        ))}
        <circle r="7" fill="#FDDE78" stroke="#8f2a1c" strokeWidth="1.5" />
        </g>
      </g>
      <path d="M262 30 l4 -10 M272 42 l10 -5 M210 30 l-4 -10" stroke={RED} strokeWidth="2" />

      {/* laptop */}
      <path d="M160 300 H312 L318 378 H154 Z" fill="#FFF1D9" stroke={INK} strokeWidth="2.6" />
      <path d="M170 310 H302 L306 366 H166 Z" fill="#292725" stroke={INK} strokeWidth="1.5" />
      <text x="178" y="328" fontSize="11" fill="#B7C98A" style={mono}>&gt;&gt;&gt; model.fit(</text>
      <text x="190" y="343" fontSize="11" fill="#F2E6D4" style={mono}>curiosity,</text>
      <text x="190" y="358" fontSize="11" fill="#FF6A5E" style={mono}>real_data)</text>
      <path d="M130 378 H342 L330 394 H142 Z" fill="#F3E5CC" stroke={INK} strokeWidth="2.6" />
      <path d="M216 386 H256" stroke={INK} strokeWidth="2" />

      {/* coffee mug with steam */}
      <path d="M356 352 h34 v28 a10 10 0 0 1 -10 10 h-14 a10 10 0 0 1 -10 -10 Z" fill="#FFF1D9" stroke={INK} strokeWidth="2.2" />
      <path d="M390 360 c 12 0 12 18 0 18" stroke={INK} strokeWidth="2.2" />
      <path className="steam" d="M366 342 c -6 -8 6 -12 0 -20" stroke={INK} strokeOpacity="0.45" strokeWidth="1.8" />
      <path className="steam steam-2" d="M380 342 c -6 -8 6 -12 0 -20" stroke={INK} strokeOpacity="0.45" strokeWidth="1.8" />
      <path d="M362 368 h20" stroke={RED} strokeWidth="2" />

      {/* loss curve on a tiny chart */}
      <g transform="translate(22 196)">
        <rect width="104" height="78" rx="4" fill="#FFF1D9" stroke={INK} strokeWidth="1.6" transform="rotate(-4 52 39)" />
        <path d="M14 14 V64 H94" stroke={INK} strokeWidth="1.6" />
        <path d="M18 20 C 30 46, 44 54, 60 58 S 84 60, 92 60" stroke={RED} strokeWidth="2.4" />
        <text x="54" y="30" fontSize="15" fill={RED} style={hand}>loss ↓</text>
      </g>

      {/* annotations */}
      <text x="18" y="116" fontSize="20" fill={INK} style={hand}>messy data</text>
      <path d="M40 124 C 60 160, 120 220, 162 214" stroke={INK} strokeWidth="1.8" strokeDasharray="5 5" />
      <path d="M152 206 l12 8 -12 7" stroke={INK} strokeWidth="1.8" />

      <text x="330" y="168" fontSize="19" fill={GREEN} style={hand}>hidden layers</text>
      <text x="330" y="188" fontSize="19" fill={GREEN} style={hand}>(it learns!)</text>
      <path d="M326 176 C 312 176, 300 170, 292 164" stroke={GREEN} strokeWidth="1.8" />

      <text x="300" y="58" fontSize="22" fill={RED} style={hand}>something useful</text>
      <path d="M296 54 C 284 54, 274 58, 262 62" stroke={RED} strokeWidth="1.8" />
      <path d="M268 54 l-7 8 9 3" stroke={RED} strokeWidth="1.8" />

      <text x="20" y="330" fontSize="11" fill={INK} fillOpacity="0.6" style={mono}>fig. 1</text>
      <text x="20" y="346" fontSize="17" fill={INK} fillOpacity="0.7" style={hand}>train · eval · ship</text>

      {/* sparkles */}
      {[[118, 54, 1], [410, 108, 0.8], [400, 262, 0.7], [84, 380, 0.7]].map(([x, y, s]) => (
        <g key={`${x}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path className={`twinkle twinkle-${(x % 3) + 1}`} d="M0 -10 C 1.5 -2, 2 -1.5, 10 0 C 2 1.5, 1.5 2, 0 10 C -1.5 2, -2 1.5, -10 0 C -2 -1.5, -1.5 -2, 0 -10Z" fill={RED} />
        </g>
      ))}
    </svg>
  );
}
