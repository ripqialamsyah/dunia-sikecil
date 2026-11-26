// Hand-crafted toddler-friendly SVG illustrations & Indonesian learning data

const SVG_FACE = (cx = 100, cy = 105, eyeOffset = 22, eyeY = 95, smileW = 14) => `
  <circle cx="${cx - eyeOffset}" cy="${eyeY}" r="6.5" fill="#2f3640"/>
  <circle cx="${cx + eyeOffset}" cy="${eyeY}" r="6.5" fill="#2f3640"/>
  <circle cx="${cx - eyeOffset - 2}" cy="${eyeY - 2}" r="2.2" fill="#ffffff"/>
  <circle cx="${cx + eyeOffset - 2}" cy="${eyeY - 2}" r="2.2" fill="#ffffff"/>
  <ellipse cx="${cx - eyeOffset - 9}" cy="${eyeY + 12}" rx="8" ry="5" fill="#ff9aa2" opacity="0.55"/>
  <ellipse cx="${cx + eyeOffset + 9}" cy="${eyeY + 12}" rx="8" ry="5" fill="#ff9aa2" opacity="0.55"/>
  <path d="M ${cx - smileW} ${cy + 6} Q ${cx} ${cy + 18} ${cx + smileW} ${cy + 6}" fill="none" stroke="#2f3640" stroke-width="4.5" stroke-linecap="round"/>
`;

const ICONS = {
  cat: `<svg viewBox="0 0 200 200">
    <polygon points="44,82 54,28 92,62" fill="#ffbe76"/>
    <polygon points="52,74 59,40 83,63" fill="#ff9aa2"/>
    <polygon points="156,82 146,28 108,62" fill="#ffbe76"/>
    <polygon points="148,74 141,40 117,63" fill="#ff9aa2"/>
    <ellipse cx="100" cy="112" rx="64" ry="56" fill="#ffbe76"/>
    <ellipse cx="100" cy="126" rx="34" ry="24" fill="#ffe6c7"/>
    <circle cx="75" cy="100" r="7.5" fill="#2f3640"/>
    <circle cx="125" cy="100" r="7.5" fill="#2f3640"/>
    <circle cx="72.5" cy="97.5" r="2.5" fill="#fff"/>
    <circle cx="122.5" cy="97.5" r="2.5" fill="#fff"/>
    <polygon points="94,113 106,113 100,121" fill="#ff758f"/>
    <path d="M 88 124 Q 94 132 100 123 Q 106 132 112 124" fill="none" stroke="#2f3640" stroke-width="4" stroke-linecap="round"/>
    <line x1="34" y1="112" x2="60" y2="116" stroke="#2f3640" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="34" y1="126" x2="60" y2="124" stroke="#2f3640" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="166" y1="112" x2="140" y2="116" stroke="#2f3640" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="166" y1="126" x2="140" y2="124" stroke="#2f3640" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  dog: `<svg viewBox="0 0 200 200">
    <ellipse cx="42" cy="102" rx="22" ry="42" transform="rotate(14 42 102)" fill="#a47148"/>
    <ellipse cx="158" cy="102" rx="22" ry="42" transform="rotate(-14 158 102)" fill="#a47148"/>
    <ellipse cx="100" cy="108" rx="60" ry="56" fill="#d4a373"/>
    <ellipse cx="100" cy="126" rx="34" ry="26" fill="#faedcd"/>
    <circle cx="76" cy="96" r="7.5" fill="#2f3640"/>
    <circle cx="124" cy="96" r="7.5" fill="#2f3640"/>
    <circle cx="73.5" cy="93.5" r="2.5" fill="#fff"/>
    <circle cx="121.5" cy="93.5" r="2.5" fill="#fff"/>
    <ellipse cx="100" cy="116" rx="12" ry="9" fill="#2f3640"/>
    <path d="M 88 128 Q 100 139 112 128" fill="none" stroke="#2f3640" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="100" cy="139" rx="8" ry="11" fill="#ff758f"/>
  </svg>`,

  cow: `<svg viewBox="0 0 200 200">
    <path d="M 52 54 Q 36 32 54 24 Q 68 38 68 54" fill="#f7d794"/>
    <path d="M 148 54 Q 164 32 146 24 Q 132 38 132 54" fill="#f7d794"/>
    <ellipse cx="42" cy="78" rx="20" ry="12" transform="rotate(-20 42 78)" fill="#ffffff" stroke="#2f3640" stroke-width="3"/>
    <ellipse cx="158" cy="78" rx="20" ry="12" transform="rotate(20 158 78)" fill="#ffffff" stroke="#2f3640" stroke-width="3"/>
    <ellipse cx="100" cy="104" rx="58" ry="54" fill="#ffffff" stroke="#2f3640" stroke-width="3.5"/>
    <circle cx="72" cy="74" r="16" fill="#3d3d3d"/>
    <circle cx="132" cy="92" r="12" fill="#3d3d3d"/>
    <circle cx="76" cy="94" r="7" fill="#2f3640"/>
    <circle cx="124" cy="94" r="7" fill="#2f3640"/>
    <circle cx="74" cy="92" r="2.2" fill="#fff"/>
    <circle cx="122" cy="92" r="2.2" fill="#fff"/>
    <ellipse cx="100" cy="132" rx="44" ry="28" fill="#ffb5c2"/>
    <circle cx="84" cy="127" r="5" fill="#d96b82"/>
    <circle cx="116" cy="127" r="5" fill="#d96b82"/>
    <path d="M 86 142 Q 100 152 114 142" fill="none" stroke="#2f3640" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  duck: `<svg viewBox="0 0 200 200">
    <path d="M 94 40 Q 100 22 112 36 Q 118 26 116 44" fill="#ffd166"/>
    <circle cx="100" cy="104" r="60" fill="#ffd166"/>
    <circle cx="74" cy="92" r="7.5" fill="#2f3640"/>
    <circle cx="126" cy="92" r="7.5" fill="#2f3640"/>
    <circle cx="72" cy="89.5" r="2.5" fill="#fff"/>
    <circle cx="124" cy="89.5" r="2.5" fill="#fff"/>
    <ellipse cx="58" cy="108" rx="10" ry="6" fill="#ff9aa2" opacity="0.6"/>
    <ellipse cx="142" cy="108" rx="10" ry="6" fill="#ff9aa2" opacity="0.6"/>
    <ellipse cx="100" cy="118" rx="28" ry="15" fill="#ff8c42"/>
    <path d="M 82 118 Q 100 126 118 118" fill="none" stroke="#d95d1e" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  frog: `<svg viewBox="0 0 200 200">
    <circle cx="64" cy="64" r="24" fill="#7bed9f"/>
    <circle cx="136" cy="64" r="24" fill="#7bed9f"/>
    <circle cx="64" cy="64" r="14" fill="#ffffff"/>
    <circle cx="136" cy="64" r="14" fill="#ffffff"/>
    <circle cx="64" cy="64" r="7.5" fill="#2f3640"/>
    <circle cx="136" cy="64" r="7.5" fill="#2f3640"/>
    <circle cx="61.5" cy="61.5" r="2.5" fill="#fff"/>
    <circle cx="133.5" cy="61.5" r="2.5" fill="#fff"/>
    <ellipse cx="100" cy="116" rx="66" ry="50" fill="#7bed9f"/>
    <ellipse cx="100" cy="134" rx="46" ry="26" fill="#d4fcdf"/>
    <ellipse cx="56" cy="112" rx="11" ry="6" fill="#ff9aa2" opacity="0.65"/>
    <ellipse cx="144" cy="112" rx="11" ry="6" fill="#ff9aa2" opacity="0.65"/>
    <path d="M 70 116 Q 100 142 130 116" fill="none" stroke="#2f3640" stroke-width="4.5" stroke-linecap="round"/>
  </svg>`,

  elephant: `<svg viewBox="0 0 200 200">
    <ellipse cx="42" cy="102" rx="34" ry="48" fill="#8ecae6"/>
    <ellipse cx="44" cy="104" rx="22" ry="34" fill="#ffc8dd"/>
    <ellipse cx="158" cy="102" rx="34" ry="48" fill="#8ecae6"/>
    <ellipse cx="156" cy="104" rx="22" ry="34" fill="#ffc8dd"/>
    <circle cx="100" cy="102" r="54" fill="#a2d2ff"/>
    <circle cx="76" cy="92" r="7" fill="#2f3640"/>
    <circle cx="124" cy="92" r="7" fill="#2f3640"/>
    <circle cx="74" cy="90" r="2.2" fill="#fff"/>
    <circle cx="122" cy="90" r="2.2" fill="#fff"/>
    <path d="M 92 108 Q 92 152 114 156 Q 128 156 126 140 Q 124 132 114 138 Q 108 134 108 108" fill="#a2d2ff" stroke="#7fb8f0" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="64" cy="108" rx="9" ry="5" fill="#ff9aa2" opacity="0.6"/>
    <ellipse cx="136" cy="108" rx="9" ry="5" fill="#ff9aa2" opacity="0.6"/>
  </svg>`,

  lion: `<svg viewBox="0 0 200 200">
    <circle cx="100" cy="104" r="72" fill="#f77f00"/>
    <circle cx="52" cy="54" r="22" fill="#f77f00"/>
    <circle cx="148" cy="54" r="22" fill="#f77f00"/>
    <circle cx="34" cy="104" r="22" fill="#f77f00"/>
    <circle cx="166" cy="104" r="22" fill="#f77f00"/>
    <circle cx="54" cy="152" r="22" fill="#f77f00"/>
    <circle cx="146" cy="152" r="22" fill="#f77f00"/>
    <circle cx="100" cy="36" r="22" fill="#f77f00"/>
    <circle cx="100" cy="166" r="20" fill="#f77f00"/>
    <circle cx="100" cy="104" r="48" fill="#fcbf49"/>
    <circle cx="62" cy="64" r="14" fill="#fcbf49"/>
    <circle cx="138" cy="64" r="14" fill="#fcbf49"/>
    <circle cx="80" cy="96" r="6.5" fill="#2f3640"/>
    <circle cx="120" cy="96" r="6.5" fill="#2f3640"/>
    <circle cx="78" cy="94" r="2.2" fill="#fff"/>
    <circle cx="118" cy="94" r="2.2" fill="#fff"/>
    <polygon points="94,108 106,108 100,116" fill="#d62828"/>
    <path d="M 88 122 Q 100 132 112 122" fill="none" stroke="#2f3640" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  sheep: `<svg viewBox="0 0 200 200">
    <ellipse cx="44" cy="100" rx="22" ry="12" transform="rotate(-15 44 100)" fill="#f8c8dc"/>
    <ellipse cx="156" cy="100" rx="22" ry="12" transform="rotate(15 156 100)" fill="#f8c8dc"/>
    <circle cx="100" cy="54" r="30" fill="#ffffff" stroke="#e5e9f0" stroke-width="3"/>
    <circle cx="64" cy="70" r="26" fill="#ffffff" stroke="#e5e9f0" stroke-width="3"/>
    <circle cx="136" cy="70" r="26" fill="#ffffff" stroke="#e5e9f0" stroke-width="3"/>
    <circle cx="56" cy="112" r="28" fill="#ffffff" stroke="#e5e9f0" stroke-width="3"/>
    <circle cx="144" cy="112" r="28" fill="#ffffff" stroke="#e5e9f0" stroke-width="3"/>
    <circle cx="78" cy="148" r="26" fill="#ffffff" stroke="#e5e9f0" stroke-width="3"/>
    <circle cx="122" cy="148" r="26" fill="#ffffff" stroke="#e5e9f0" stroke-width="3"/>
    <ellipse cx="100" cy="110" rx="40" ry="38" fill="#ffe5d9"/>
    <circle cx="100" cy="68" r="22" fill="#ffffff"/>
    <circle cx="80" cy="68" r="16" fill="#ffffff"/>
    <circle cx="120" cy="68" r="16" fill="#ffffff"/>
    <circle cx="84" cy="104" r="6" fill="#2f3640"/>
    <circle cx="116" cy="104" r="6" fill="#2f3640"/>
    <circle cx="82" cy="102" r="2" fill="#fff"/>
    <circle cx="114" cy="102" r="2" fill="#fff"/>
    <path d="M 90 124 Q 100 133 110 124" fill="none" stroke="#2f3640" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  apple: `<svg viewBox="0 0 200 200">
    <path d="M 100 54 Q 98 30 112 24" fill="none" stroke="#7f5539" stroke-width="8" stroke-linecap="round"/>
    <path d="M 104 44 Q 134 24 142 46 Q 124 62 104 44" fill="#52b788"/>
    <path d="M 100 62 C 62 46 34 78 40 120 C 46 156 76 174 100 164 C 124 174 154 156 160 120 C 166 78 138 46 100 62 Z" fill="#ff595e"/>
    <ellipse cx="66" cy="90" rx="9" ry="18" transform="rotate(-22 66 90)" fill="#ff999c" opacity="0.65"/>
    ${SVG_FACE(100, 114, 20, 108, 12)}
  </svg>`,

  ball: `<svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="66" fill="#4ea8de"/>
    <path d="M 52 54 Q 100 92 148 54" fill="none" stroke="#ffd166" stroke-width="18" stroke-linecap="round"/>
    <path d="M 46 138 Q 100 102 154 138" fill="none" stroke="#ff6b6b" stroke-width="18" stroke-linecap="round"/>
    <circle cx="100" cy="100" r="66" fill="none" stroke="#ffffff" stroke-width="5"/>
  </svg>`,

  star: `<svg viewBox="0 0 200 200">
    <polygon points="100,24 123,72 176,79 137,116 147,168 100,143 53,168 63,116 24,79 77,72" fill="#ffd166" stroke="#f4a261" stroke-width="6" stroke-linejoin="round"/>
    ${SVG_FACE(100, 104, 18, 98, 12)}
  </svg>`,

  heart: `<svg viewBox="0 0 200 200">
    <path d="M 100 166 C 45 130 28 96 28 70 C 28 45 48 30 70 30 C 86 30 96 40 100 48 C 104 40 114 30 130 30 C 152 30 172 45 172 70 C 172 96 155 130 100 166 Z" fill="#ff6b8b"/>
    ${SVG_FACE(100, 92, 22, 84, 13)}
  </svg>`,

  sun: `<svg viewBox="0 0 200 200">
    <g stroke="#ffb703" stroke-width="10" stroke-linecap="round">
      <line x1="100" y1="20" x2="100" y2="38"/>
      <line x1="100" y1="162" x2="100" y2="180"/>
      <line x1="20" y1="100" x2="38" y2="100"/>
      <line x1="162" y1="100" x2="180" y2="100"/>
      <line x1="43" y1="43" x2="56" y2="56"/>
      <line x1="144" y1="144" x2="157" y2="157"/>
      <line x1="157" y1="43" x2="144" y2="56"/>
      <line x1="56" y1="144" x2="43" y2="157"/>
    </g>
    <circle cx="100" cy="100" r="48" fill="#ffd166"/>
    ${SVG_FACE(100, 100, 17, 94, 12)}
  </svg>`,

  fish: `<svg viewBox="0 0 200 200">
    <polygon points="146,100 182,66 176,134" fill="#ff9f1c"/>
    <ellipse cx="94" cy="100" rx="62" ry="44" fill="#4cc9f0"/>
    <path d="M 78 58 Q 100 32 114 58" fill="#ff9f1c"/>
    <circle cx="62" cy="92" r="8" fill="#2f3640"/>
    <circle cx="59" cy="89" r="2.5" fill="#fff"/>
    <path d="M 46 110 Q 58 120 70 110" fill="none" stroke="#2f3640" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  flower: `<svg viewBox="0 0 200 200">
    <circle cx="100" cy="52" r="28" fill="#ff8fab"/>
    <circle cx="144" cy="84" r="28" fill="#ff8fab"/>
    <circle cx="128" cy="136" r="28" fill="#ff8fab"/>
    <circle cx="72" cy="136" r="28" fill="#ff8fab"/>
    <circle cx="56" cy="84" r="28" fill="#ff8fab"/>
    <circle cx="100" cy="98" r="32" fill="#ffd166"/>
    ${SVG_FACE(100, 98, 13, 94, 9)}
  </svg>`,

  balloon: `<svg viewBox="0 0 200 200">
    <path d="M 100 144 Q 90 166 106 184" fill="none" stroke="#99a8b8" stroke-width="4" stroke-linecap="round"/>
    <polygon points="94,142 106,142 100,152" fill="#ff6b6b"/>
    <ellipse cx="100" cy="84" rx="50" ry="60" fill="#ff6b6b"/>
    <ellipse cx="76" cy="60" rx="10" ry="18" transform="rotate(-24 76 60)" fill="#ffb3b3" opacity="0.7"/>
  </svg>`,

  car: `<svg viewBox="0 0 200 200">
    <path d="M 54 98 L 72 60 L 130 60 L 148 98 Z" fill="#ff6b6b"/>
    <path d="M 78 68 L 96 68 L 96 96 L 64 96 Z" fill="#dff4ff"/>
    <path d="M 104 68 L 124 68 L 136 96 L 104 96 Z" fill="#dff4ff"/>
    <rect x="28" y="96" width="144" height="44" rx="20" fill="#ff595e"/>
    <circle cx="38" cy="116" r="7" fill="#ffd166"/>
    <circle cx="162" cy="116" r="7" fill="#ffd166"/>
    <circle cx="64" cy="142" r="20" fill="#2f3640"/>
    <circle cx="64" cy="142" r="9" fill="#d9e4ec"/>
    <circle cx="136" cy="142" r="20" fill="#2f3640"/>
    <circle cx="136" cy="142" r="9" fill="#d9e4ec"/>
  </svg>`,

  train: `<svg viewBox="0 0 200 200">
    <rect x="44" y="42" width="22" height="30" rx="6" fill="#5c677d"/>
    <circle cx="54" cy="28" r="10" fill="#ffffff" opacity="0.9"/>
    <circle cx="72" cy="20" r="13" fill="#ffffff" opacity="0.75"/>
    <rect x="34" y="68" width="128" height="66" rx="18" fill="#4ea8de"/>
    <rect x="108" y="48" width="54" height="46" rx="12" fill="#3a86ff"/>
    <rect x="118" y="58" width="34" height="24" rx="6" fill="#dff4ff"/>
    <rect x="34" y="114" width="134" height="16" rx="8" fill="#ffd166"/>
    <circle cx="64" cy="146" r="18" fill="#2f3640"/>
    <circle cx="64" cy="146" r="7" fill="#d9e4ec"/>
    <circle cx="104" cy="146" r="18" fill="#2f3640"/>
    <circle cx="104" cy="146" r="7" fill="#d9e4ec"/>
    <circle cx="144" cy="146" r="18" fill="#2f3640"/>
    <circle cx="144" cy="146" r="7" fill="#d9e4ec"/>
  </svg>`,

  airplane: `<svg viewBox="0 0 200 200">
    <path d="M 74 96 L 118 36 L 136 42 L 112 96 Z" fill="#ff9f1c"/>
    <path d="M 74 108 L 118 164 L 136 158 L 112 108 Z" fill="#ff9f1c"/>
    <path d="M 32 92 L 54 66 L 68 70 L 56 96 Z" fill="#ff6b6b"/>
    <ellipse cx="104" cy="102" rx="70" ry="24" fill="#ffffff" stroke="#4ea8de" stroke-width="5"/>
    <circle cx="140" cy="98" r="7" fill="#90e0ef"/>
    <circle cx="118" cy="98" r="7" fill="#90e0ef"/>
    <circle cx="96" cy="98" r="7" fill="#90e0ef"/>
    <circle cx="74" cy="98" r="7" fill="#90e0ef"/>
  </svg>`,

  ship: `<svg viewBox="0 0 200 200">
    <rect x="92" y="34" width="10" height="78" rx="4" fill="#8d5524"/>
    <polygon points="102,38 158,96 102,96" fill="#ff6b6b"/>
    <polygon points="92,46 50,96 92,96" fill="#ffd166"/>
    <path d="M 34 112 L 166 112 L 146 152 Q 100 160 54 152 Z" fill="#4ea8de"/>
    <path d="M 28 158 Q 52 146 76 158 Q 100 170 124 158 Q 148 146 172 158" fill="none" stroke="#90e0ef" stroke-width="8" stroke-linecap="round"/>
  </svg>`,

  bus: `<svg viewBox="0 0 200 200">
    <rect x="28" y="56" width="144" height="84" rx="22" fill="#ffd166"/>
    <rect x="42" y="70" width="28" height="28" rx="7" fill="#dff4ff"/>
    <rect x="78" y="70" width="28" height="28" rx="7" fill="#dff4ff"/>
    <rect x="114" y="70" width="42" height="28" rx="7" fill="#dff4ff"/>
    <rect x="28" y="108" width="144" height="14" fill="#ff9f1c"/>
    <circle cx="64" cy="144" r="18" fill="#2f3640"/>
    <circle cx="64" cy="144" r="8" fill="#d9e4ec"/>
    <circle cx="136" cy="144" r="18" fill="#2f3640"/>
    <circle cx="136" cy="144" r="8" fill="#d9e4ec"/>
  </svg>`,

  bicycle: `<svg viewBox="0 0 200 200">
    <circle cx="56" cy="132" r="30" fill="none" stroke="#2f3640" stroke-width="9"/>
    <circle cx="144" cy="132" r="30" fill="none" stroke="#2f3640" stroke-width="9"/>
    <circle cx="56" cy="132" r="7" fill="#ff6b6b"/>
    <circle cx="144" cy="132" r="7" fill="#ff6b6b"/>
    <path d="M 56 132 L 94 132 L 124 88 L 76 88 Z" fill="none" stroke="#4ea8de" stroke-width="9" stroke-linejoin="round"/>
    <line x1="124" y1="88" x2="144" y2="132" stroke="#4ea8de" stroke-width="9" stroke-linecap="round"/>
    <line x1="72" y1="74" x2="86" y2="132" stroke="#4ea8de" stroke-width="8" stroke-linecap="round"/>
    <rect x="60" y="68" width="24" height="10" rx="5" fill="#2f3640"/>
    <path d="M 116 74 L 136 74" stroke="#ff6b6b" stroke-width="9" stroke-linecap="round"/>
  </svg>`,

  watermelon: `<svg viewBox="0 0 200 200">
    <path d="M 30 92 A 70 70 0 0 0 170 92 Z" fill="#52b788"/>
    <path d="M 42 92 A 58 58 0 0 0 158 92 Z" fill="#ff595e"/>
    <circle cx="76" cy="112" r="4" fill="#2f3640"/>
    <circle cx="100" cy="126" r="4" fill="#2f3640"/>
    <circle cx="124" cy="112" r="4" fill="#2f3640"/>
  </svg>`,

  strawberry: `<svg viewBox="0 0 200 200">
    <path d="M 68 58 Q 100 32 132 58 Q 112 70 100 60 Q 88 70 68 58 Z" fill="#52b788"/>
    <path d="M 54 64 C 46 108 74 164 100 166 C 126 164 154 108 146 64 C 126 52 74 52 54 64 Z" fill="#ff4d6d"/>
    <circle cx="80" cy="92" r="3.5" fill="#ffd166"/>
    <circle cx="120" cy="92" r="3.5" fill="#ffd166"/>
    <circle cx="100" cy="116" r="3.5" fill="#ffd166"/>
    <circle cx="84" cy="134" r="3.5" fill="#ffd166"/>
    <circle cx="116" cy="134" r="3.5" fill="#ffd166"/>
  </svg>`,

  grapes: `<svg viewBox="0 0 200 200">
    <path d="M 100 54 L 100 30" stroke="#7f5539" stroke-width="8" stroke-linecap="round"/>
    <path d="M 100 42 Q 128 24 136 44 Q 118 58 100 42" fill="#52b788"/>
    <circle cx="74" cy="80" r="22" fill="#9b5de5"/>
    <circle cx="100" cy="76" r="22" fill="#8338ec"/>
    <circle cx="126" cy="80" r="22" fill="#9b5de5"/>
    <circle cx="84" cy="112" r="22" fill="#8338ec"/>
    <circle cx="116" cy="112" r="22" fill="#9b5de5"/>
    <circle cx="100" cy="144" r="22" fill="#8338ec"/>
  </svg>`,

  bread: `<svg viewBox="0 0 200 200">
    <path d="M 40 94 C 34 52 166 52 160 94 L 154 152 Q 152 162 140 162 L 60 162 Q 48 162 46 152 Z" fill="#e09f3e"/>
    <path d="M 52 98 C 48 64 152 64 148 98 L 144 148 L 56 148 Z" fill="#ffe6a7"/>
    ${SVG_FACE(100, 114, 18, 108, 11)}
  </svg>`,

  milk: `<svg viewBox="0 0 200 200">
    <polygon points="62,64 138,64 126,38 74,38" fill="#4ea8de"/>
    <rect x="62" y="64" width="76" height="102" rx="14" fill="#ffffff" stroke="#bde0fe" stroke-width="5"/>
    <rect x="62" y="102" width="76" height="32" fill="#90e0ef"/>
    ${SVG_FACE(100, 118, 16, 114, 10)}
  </svg>`,

  hat: `<svg viewBox="0 0 200 200">
    <path d="M 50 118 C 50 70 150 70 150 118 Z" fill="#4ea8de"/>
    <rect x="48" y="106" width="104" height="14" rx="6" fill="#ffd166"/>
    <ellipse cx="100" cy="124" rx="76" ry="16" fill="#3a86ff"/>
  </svg>`,

  orange: `<svg viewBox="0 0 200 200">
    <path d="M 100 48 Q 124 26 138 42 Q 120 60 100 48" fill="#52b788"/>
    <circle cx="100" cy="108" r="56" fill="#ff9f1c"/>
    ${SVG_FACE(100, 110, 19, 102, 12)}
  </svg>`,

  banana: `<svg viewBox="0 0 200 200">
    <path d="M 48 136 C 72 164 146 146 156 54 C 158 40 144 38 138 50 C 122 108 82 126 52 122 C 42 120 40 128 48 136 Z" fill="#ffd166" stroke="#f4a261" stroke-width="4"/>
    <path d="M 144 46 L 154 36" stroke="#7f5539" stroke-width="6" stroke-linecap="round"/>
  </svg>`,

  carrot: `<svg viewBox="0 0 200 200">
    <path d="M 100 58 Q 82 26 94 24 Q 100 40 100 58" fill="#52b788"/>
    <path d="M 100 58 Q 118 24 126 32 Q 112 46 100 58" fill="#40916c"/>
    <path d="M 100 58 Q 70 36 74 48 Q 86 54 100 58" fill="#74c69d"/>
    <path d="M 68 62 Q 100 48 132 62 L 106 168 Q 100 176 94 168 Z" fill="#ff7b00"/>
    <line x1="84" y1="88" x2="96" y2="88" stroke="#e85d04" stroke-width="4" stroke-linecap="round"/>
    <line x1="104" y1="112" x2="114" y2="112" stroke="#e85d04" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  lamp: `<svg viewBox="0 0 200 200">
    <polygon points="62,48 138,48 158,108 42,108" fill="#ffd166"/>
    <rect x="92" y="108" width="16" height="44" rx="6" fill="#8d99ae"/>
    <rect x="66" y="150" width="68" height="16" rx="8" fill="#5c677d"/>
  </svg>`,

  cherry: `<svg viewBox="0 0 200 200">
    <path d="M 74 116 Q 94 56 122 42" fill="none" stroke="#52b788" stroke-width="6" stroke-linecap="round"/>
    <path d="M 130 120 Q 124 68 122 42" fill="none" stroke="#52b788" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="136" cy="44" rx="18" ry="9" transform="rotate(-20 136 44)" fill="#74c69d"/>
    <circle cx="72" cy="132" r="32" fill="#e63946"/>
    <circle cx="128" cy="136" r="32" fill="#e63946"/>
    <circle cx="62" cy="120" r="7" fill="#ff9aa2" opacity="0.7"/>
    <circle cx="118" cy="124" r="7" fill="#ff9aa2" opacity="0.7"/>
  </svg>`,

  rain: `<svg viewBox="0 0 200 200">
    <circle cx="74" cy="82" r="32" fill="#ffffff"/>
    <circle cx="116" cy="74" r="38" fill="#ffffff"/>
    <circle cx="144" cy="92" r="24" fill="#ffffff"/>
    <rect x="52" y="84" width="102" height="32" rx="16" fill="#ffffff"/>
    <path d="M 70 132 Q 62 150 70 156 Q 78 150 70 132" fill="#4ea8de"/>
    <path d="M 102 138 Q 94 156 102 162 Q 110 156 102 138" fill="#4ea8de"/>
    <path d="M 134 132 Q 126 150 134 156 Q 142 150 134 132" fill="#4ea8de"/>
  </svg>`,

  pineapple: `<svg viewBox="0 0 200 200">
    <path d="M 100 66 L 78 30 L 96 46 L 100 20 L 106 46 L 124 30 Z" fill="#52b788"/>
    <ellipse cx="100" cy="118" rx="44" ry="52" fill="#ffb703"/>
    <path d="M 70 94 L 130 142 M 130 94 L 70 142" stroke="#e09f3e" stroke-width="4" opacity="0.6"/>
  </svg>`,

  snake: `<svg viewBox="0 0 200 200">
    <path d="M 52 146 C 36 116 96 112 104 88 C 112 62 66 56 84 42 C 102 28 134 44 134 64" fill="none" stroke="#52b788" stroke-width="24" stroke-linecap="round"/>
    <circle cx="134" cy="64" r="20" fill="#52b788"/>
    <circle cx="138" cy="58" r="4.5" fill="#2f3640"/>
    <path d="M 152 68 L 166 66" stroke="#ff595e" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  vase: `<svg viewBox="0 0 200 200">
    <circle cx="100" cy="56" r="24" fill="#ff8fab"/>
    <circle cx="100" cy="56" r="10" fill="#ffd166"/>
    <rect x="96" y="72" width="8" height="24" fill="#52b788"/>
    <path d="M 76 92 L 124 92 L 116 112 C 138 128 132 164 100 166 C 68 164 62 128 84 112 Z" fill="#90dbf4"/>
  </svg>`,

  yoyo: `<svg viewBox="0 0 200 200">
    <line x1="100" y1="22" x2="100" y2="70" stroke="#99a8b8" stroke-width="5" stroke-linecap="round"/>
    <circle cx="100" cy="114" r="52" fill="#ff6b6b"/>
    <circle cx="100" cy="114" r="30" fill="#ffd166"/>
    <circle cx="100" cy="114" r="12" fill="#ffffff"/>
  </svg>`,

  xylophone: `<svg viewBox="0 0 200 200">
    <rect x="34" y="54" width="22" height="92" rx="10" fill="#ff595e"/>
    <rect x="62" y="60" width="22" height="80" rx="10" fill="#ffca3a"/>
    <rect x="90" y="66" width="22" height="68" rx="10" fill="#8ac926"/>
    <rect x="118" y="72" width="22" height="56" rx="10" fill="#1982c4"/>
    <rect x="146" y="78" width="22" height="44" rx="10" fill="#9b5de5"/>
  </svg>`,

  zebra: `<svg viewBox="0 0 200 200">
    <ellipse cx="100" cy="108" rx="56" ry="54" fill="#ffffff" stroke="#2f3640" stroke-width="3.5"/>
    <path d="M 60 72 L 88 86 L 62 98" fill="none" stroke="#2f3640" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 140 72 L 112 86 L 138 98" fill="none" stroke="#2f3640" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="78" cy="100" r="6.5" fill="#2f3640"/>
    <circle cx="122" cy="100" r="6.5" fill="#2f3640"/>
    <ellipse cx="100" cy="134" rx="34" ry="20" fill="#d8e2dc"/>
    <path d="M 88 138 Q 100 146 112 138" fill="none" stroke="#2f3640" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  bucket: `<svg viewBox="0 0 200 200">
    <path d="M 54 74 Q 100 24 146 74" fill="none" stroke="#8d99ae" stroke-width="7" stroke-linecap="round"/>
    <polygon points="48,74 152,74 138,162 62,162" fill="#4ea8de"/>
    <rect x="44" y="66" width="112" height="16" rx="8" fill="#90e0ef"/>
  </svg>`,

  flamingo: `<svg viewBox="0 0 200 200">
    <line x1="100" y1="126" x2="100" y2="174" stroke="#ff9f1c" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="106" cy="116" rx="40" ry="26" fill="#ff70a6"/>
    <path d="M 80 114 C 66 86 74 44 102 44" fill="none" stroke="#ff70a6" stroke-width="14" stroke-linecap="round"/>
    <circle cx="106" cy="46" r="14" fill="#ff70a6"/>
    <polygon points="116,44 132,50 116,54" fill="#2f3640"/>
    <circle cx="108" cy="44" r="3.5" fill="#2f3640"/>
  </svg>`,

  quokka: `<svg viewBox="0 0 200 200">
    <circle cx="56" cy="64" r="22" fill="#b08968"/>
    <circle cx="144" cy="64" r="22" fill="#b08968"/>
    <ellipse cx="100" cy="110" rx="60" ry="52" fill="#ddb892"/>
    ${SVG_FACE(100, 114, 20, 102, 16)}
    <ellipse cx="100" cy="114" rx="10" ry="7" fill="#582f0e"/>
  </svg>`
};

const makeColorSplash = (fill) => `<svg viewBox="0 0 200 200">
  <circle cx="100" cy="104" r="60" fill="${fill}"/>
  <circle cx="54" cy="66" r="18" fill="${fill}"/>
  <circle cx="148" cy="68" r="14" fill="${fill}"/>
  <circle cx="152" cy="142" r="16" fill="${fill}"/>
  <circle cx="48" cy="136" r="12" fill="${fill}"/>
  ${SVG_FACE(100, 106, 20, 98, 14)}
</svg>`;

const makeShape = (type, fill) => {
  if (type === 'circle') {
    return `<svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="66" fill="${fill}"/>
      ${SVG_FACE(100, 104, 22, 94, 14)}
    </svg>`;
  }
  if (type === 'square') {
    return `<svg viewBox="0 0 200 200">
      <rect x="36" y="36" width="128" height="128" rx="22" fill="${fill}"/>
      ${SVG_FACE(100, 104, 22, 94, 14)}
    </svg>`;
  }
  if (type === 'triangle') {
    return `<svg viewBox="0 0 200 200">
      <path d="M 100 30 L 170 160 Q 174 168 164 168 L 36 168 Q 26 168 30 160 Z" fill="${fill}" stroke="${fill}" stroke-width="10" stroke-linejoin="round"/>
      ${SVG_FACE(100, 122, 18, 114, 12)}
    </svg>`;
  }
  if (type === 'star') return ICONS.star;
  if (type === 'heart') return ICONS.heart;
  return ICONS.star;
};

window.NUMBER_WORDS = [
  'Satu', 'Dua', 'Tiga', 'Empat', 'Lima',
  'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh'
];

window.GAME_DATA = {
  animals: [
    { id: 'cat', title: 'Kucing', subtitle: 'Cat', speech: 'Kucing! Meong meong!', cardBg: '#fff0ea', ledge: '#f5c2ae', svg: ICONS.cat, sound: 'cat', anim: 'sway' },
    { id: 'dog', title: 'Anjing', subtitle: 'Dog', speech: 'Anjing! Guk guk!', cardBg: '#fff4e1', ledge: '#ecc998', svg: ICONS.dog, sound: 'dog', anim: 'hop' },
    { id: 'cow', title: 'Sapi', subtitle: 'Cow', speech: 'Sapi! Mooo!', cardBg: '#f3f6ff', ledge: '#c8d4f0', svg: ICONS.cow, sound: 'cow', anim: 'sway' },
    { id: 'duck', title: 'Bebek', subtitle: 'Duck', speech: 'Bebek! Kwek kwek!', cardBg: '#fff9dc', ledge: '#f0da85', svg: ICONS.duck, sound: 'duck', anim: 'waddle' },
    { id: 'frog', title: 'Katak', subtitle: 'Frog', speech: 'Katak! Krok krok!', cardBg: '#e7fced', ledge: '#a6e5be', svg: ICONS.frog, sound: 'frog', anim: 'hop' },
    { id: 'elephant', title: 'Gajah', subtitle: 'Elephant', speech: 'Gajah! Preeet!', cardBg: '#e8f5ff', ledge: '#acd6f5', svg: ICONS.elephant, sound: 'elephant', anim: 'sway' },
    { id: 'lion', title: 'Singa', subtitle: 'Lion', speech: 'Singa! Auum!', cardBg: '#fff1df', ledge: '#f4c082', svg: ICONS.lion, sound: 'lion', anim: 'shake' },
    { id: 'sheep', title: 'Domba', subtitle: 'Sheep', speech: 'Domba! Mbeek!', cardBg: '#fdf0f6', ledge: '#efc2d7', svg: ICONS.sheep, sound: 'sheep', anim: 'waddle' }
  ],

  numbers: [
    { id: '1', glyph: '1', title: 'Satu', subtitle: 'One', countLabel: '1 Matahari', speech: 'Satu! Angka satu!', color: '#ff6b6b', cardBg: '#fff0f0', ledge: '#f4bebe', count: 1, counterSvg: ICONS.sun },
    { id: '2', glyph: '2', title: 'Dua', subtitle: 'Two', countLabel: '2 Apel', speech: 'Dua! Angka dua!', color: '#ff9f1c', cardBg: '#fff4e3', ledge: '#f2ca93', count: 2, counterSvg: ICONS.apple },
    { id: '3', glyph: '3', title: 'Tiga', subtitle: 'Three', countLabel: '3 Bintang', speech: 'Tiga! Angka tiga!', color: '#f4a261', cardBg: '#fff8e1', ledge: '#eed58d', count: 3, counterSvg: ICONS.star },
    { id: '4', glyph: '4', title: 'Empat', subtitle: 'Four', countLabel: '4 Ikan', speech: 'Empat! Angka empat!', color: '#2ec4b6', cardBg: '#e8fbf8', ledge: '#a5e5dc', count: 4, counterSvg: ICONS.fish },
    { id: '5', glyph: '5', title: 'Lima', subtitle: 'Five', countLabel: '5 Balon', speech: 'Lima! Angka lima!', color: '#4ea8de', cardBg: '#eaf6ff', ledge: '#add6f2', count: 5, counterSvg: ICONS.balloon },
    { id: '6', glyph: '6', title: 'Enam', subtitle: 'Six', countLabel: '6 Bunga', speech: 'Enam! Angka enam!', color: '#e056fd', cardBg: '#fbeeff', ledge: '#e2b6f0', count: 6, counterSvg: ICONS.flower },
    { id: '7', glyph: '7', title: 'Tujuh', subtitle: 'Seven', countLabel: '7 Hati', speech: 'Tujuh! Angka tujuh!', color: '#ff5d8f', cardBg: '#fff0f5', ledge: '#f4bed0', count: 7, counterSvg: ICONS.heart },
    { id: '8', glyph: '8', title: 'Delapan', subtitle: 'Eight', countLabel: '8 Jeruk', speech: 'Delapan! Angka delapan!', color: '#fb8500', cardBg: '#fff3e4', ledge: '#f3c591', count: 8, counterSvg: ICONS.orange },
    { id: '9', glyph: '9', title: 'Sembilan', subtitle: 'Nine', countLabel: '9 Bola', speech: 'Sembilan! Angka sembilan!', color: '#3a86ff', cardBg: '#edf4ff', ledge: '#b2ccf4', count: 9, counterSvg: ICONS.ball },
    { id: '10', glyph: '10', title: 'Sepuluh', subtitle: 'Ten', countLabel: '10 Bintang', speech: 'Sepuluh! Angka sepuluh!', color: '#52b788', cardBg: '#eafaf0', ledge: '#a8e1bd', count: 10, counterSvg: ICONS.star }
  ],

  letters: [
    { id: 'A', glyph: 'A', title: 'A — Apel', subtitle: 'Apple', speech: 'A! Apel!', color: '#ff595e', cardBg: '#fff0f1', ledge: '#f5bcbd', svg: ICONS.apple },
    { id: 'B', glyph: 'B', title: 'B — Bola', subtitle: 'Ball', speech: 'B! Bola!', color: '#4ea8de', cardBg: '#eaf6ff', ledge: '#add6f2', svg: ICONS.ball },
    { id: 'C', glyph: 'C', title: 'C — Ceri', subtitle: 'Cherry', speech: 'C! Ceri!', color: '#e63946', cardBg: '#fff0f2', ledge: '#f4b9c0', svg: ICONS.cherry },
    { id: 'D', glyph: 'D', title: 'D — Domba', subtitle: 'Sheep', speech: 'D! Domba!', color: '#ff70a6', cardBg: '#fdf0f6', ledge: '#efc2d7', svg: ICONS.sheep },
    { id: 'E', glyph: 'E', title: 'E — Ember', subtitle: 'Bucket', speech: 'E! Ember!', color: '#3a86ff', cardBg: '#edf4ff', ledge: '#b2ccf4', svg: ICONS.bucket },
    { id: 'F', glyph: 'F', title: 'F — Flamingo', subtitle: 'Flamingo', speech: 'F! Flamingo!', color: '#ff70a6', cardBg: '#fff0f7', ledge: '#f4bed9', svg: ICONS.flamingo },
    { id: 'G', glyph: 'G', title: 'G — Gajah', subtitle: 'Elephant', speech: 'G! Gajah!', color: '#4ea8de', cardBg: '#e8f5ff', ledge: '#acd6f5', svg: ICONS.elephant },
    { id: 'H', glyph: 'H', title: 'H — Hujan', subtitle: 'Rain', speech: 'H! Hujan!', color: '#4361ee', cardBg: '#eef2ff', ledge: '#bac7f5', svg: ICONS.rain },
    { id: 'I', glyph: 'I', title: 'I — Ikan', subtitle: 'Fish', speech: 'I! Ikan!', color: '#00b4d8', cardBg: '#e8faff', ledge: '#a6e4f2', svg: ICONS.fish },
    { id: 'J', glyph: 'J', title: 'J — Jeruk', subtitle: 'Orange', speech: 'J! Jeruk!', color: '#ff9f1c', cardBg: '#fff4e3', ledge: '#f2ca93', svg: ICONS.orange },
    { id: 'K', glyph: 'K', title: 'K — Kucing', subtitle: 'Cat', speech: 'K! Kucing!', color: '#f77f00', cardBg: '#fff0ea', ledge: '#f5c2ae', svg: ICONS.cat },
    { id: 'L', glyph: 'L', title: 'L — Lampu', subtitle: 'Lamp', speech: 'L! Lampu!', color: '#f4a261', cardBg: '#fff8e1', ledge: '#eed58d', svg: ICONS.lamp },
    { id: 'M', glyph: 'M', title: 'M — Mobil', subtitle: 'Car', speech: 'M! Mobil!', color: '#ff595e', cardBg: '#fff0f0', ledge: '#f4bebe', svg: ICONS.car },
    { id: 'N', glyph: 'N', title: 'N — Nanas', subtitle: 'Pineapple', speech: 'N! Nanas!', color: '#ffb703', cardBg: '#fff8de', ledge: '#f0d788', svg: ICONS.pineapple },
    { id: 'O', glyph: 'O', title: 'O — Oranye', subtitle: 'Orange', speech: 'O! Oranye!', color: '#fb5607', cardBg: '#fff1e8', ledge: '#f5c1a5', svg: ICONS.orange },
    { id: 'P', glyph: 'P', title: 'P — Pisang', subtitle: 'Banana', speech: 'P! Pisang!', color: '#f4a261', cardBg: '#fff9de', ledge: '#eed884', svg: ICONS.banana },
    { id: 'Q', glyph: 'Q', title: 'Q — Quokka', subtitle: 'Quokka', speech: 'Q! Quokka!', color: '#b08968', cardBg: '#faf3eb', ledge: '#e2cab2', svg: ICONS.quokka },
    { id: 'R', glyph: 'R', title: 'R — Roti', subtitle: 'Bread', speech: 'R! Roti!', color: '#d4822a', cardBg: '#fff5e4', ledge: '#edd0a3', svg: ICONS.bread },
    { id: 'S', glyph: 'S', title: 'S — Sapi', subtitle: 'Cow', speech: 'S! Sapi!', color: '#5c677d', cardBg: '#f3f6ff', ledge: '#c8d4f0', svg: ICONS.cow },
    { id: 'T', glyph: 'T', title: 'T — Topi', subtitle: 'Hat', speech: 'T! Topi!', color: '#3a86ff', cardBg: '#edf4ff', ledge: '#b2ccf4', svg: ICONS.hat },
    { id: 'U', glyph: 'U', title: 'U — Ular', subtitle: 'Snake', speech: 'U! Ular!', color: '#52b788', cardBg: '#eafaf0', ledge: '#a8e1bd', svg: ICONS.snake },
    { id: 'V', glyph: 'V', title: 'V — Vas', subtitle: 'Vase', speech: 'V! Vas bunga!', color: '#4ea8de', cardBg: '#eaf8ff', ledge: '#addcf2', svg: ICONS.vase },
    { id: 'W', glyph: 'W', title: 'W — Wortel', subtitle: 'Carrot', speech: 'W! Wortel!', color: '#ff7b00', cardBg: '#fff2e4', ledge: '#f3c496', svg: ICONS.carrot },
    { id: 'X', glyph: 'X', title: 'X — Xilofon', subtitle: 'Xylophone', speech: 'X! Xilofon!', color: '#9b5de5', cardBg: '#f6eeff', ledge: '#d7bcf5', svg: ICONS.xylophone },
    { id: 'Y', glyph: 'Y', title: 'Y — Yoyo', subtitle: 'Yo-yo', speech: 'Y! Yoyo!', color: '#ff6b6b', cardBg: '#fff0f0', ledge: '#f4bebe', svg: ICONS.yoyo },
    { id: 'Z', glyph: 'Z', title: 'Z — Zebra', subtitle: 'Zebra', speech: 'Z! Zebra!', color: '#2f3640', cardBg: '#f4f6f8', ledge: '#ced6de', svg: ICONS.zebra }
  ],

  colors_shapes: [
    { id: 'red', title: 'Merah', subtitle: 'Red', speech: 'Warna Merah!', cardBg: '#fff0f0', ledge: '#f4bebe', svg: makeColorSplash('#ff595e') },
    { id: 'blue', title: 'Biru', subtitle: 'Blue', speech: 'Warna Biru!', cardBg: '#eaf6ff', ledge: '#add6f2', svg: makeColorSplash('#4ea8de') },
    { id: 'yellow', title: 'Kuning', subtitle: 'Yellow', speech: 'Warna Kuning!', cardBg: '#fff9de', ledge: '#eed884', svg: makeColorSplash('#ffd166') },
    { id: 'green', title: 'Hijau', subtitle: 'Green', speech: 'Warna Hijau!', cardBg: '#eafaf0', ledge: '#a8e1bd', svg: makeColorSplash('#52b788') },
    { id: 'orange', title: 'Oranye', subtitle: 'Orange', speech: 'Warna Oranye!', cardBg: '#fff2e4', ledge: '#f3c496', svg: makeColorSplash('#ff9f1c') },
    { id: 'purple', title: 'Ungu', subtitle: 'Purple', speech: 'Warna Ungu!', cardBg: '#f6eeff', ledge: '#d7bcf5', svg: makeColorSplash('#9b5de5') },
    { id: 'circle', title: 'Lingkaran', subtitle: 'Circle', speech: 'Bentuk Lingkaran!', cardBg: '#eaf6ff', ledge: '#add6f2', svg: makeShape('circle', '#4cc9f0') },
    { id: 'square', title: 'Persegi', subtitle: 'Square', speech: 'Bentuk Persegi!', cardBg: '#eafaf0', ledge: '#a8e1bd', svg: makeShape('square', '#57cc99') },
    { id: 'triangle', title: 'Segitiga', subtitle: 'Triangle', speech: 'Bentuk Segitiga!', cardBg: '#fff3e4', ledge: '#f3c591', svg: makeShape('triangle', '#ff9f1c') },
    { id: 'star', title: 'Bintang', subtitle: 'Star', speech: 'Bentuk Bintang!', cardBg: '#fff9de', ledge: '#eed884', svg: ICONS.star },
    { id: 'heart', title: 'Hati', subtitle: 'Heart', speech: 'Bentuk Hati!', cardBg: '#fff0f5', ledge: '#f4bed0', svg: ICONS.heart }
  ],

  fruits: [
    { id: 'apple', title: 'Apel', subtitle: 'Apple', speech: 'Apel! Manis!', cardBg: '#fff0f1', ledge: '#f5bcbd', svg: ICONS.apple, sound: 'crunch', anim: 'jiggle' },
    { id: 'banana', title: 'Pisang', subtitle: 'Banana', speech: 'Pisang! Yummy!', cardBg: '#fff9de', ledge: '#eed884', svg: ICONS.banana, sound: 'juicy', anim: 'sway' },
    { id: 'orange', title: 'Jeruk', subtitle: 'Orange', speech: 'Jeruk! Segar!', cardBg: '#fff4e3', ledge: '#f2ca93', svg: ICONS.orange, sound: 'juicy', anim: 'jiggle' },
    { id: 'watermelon', title: 'Semangka', subtitle: 'Watermelon', speech: 'Semangka!', cardBg: '#eafaf0', ledge: '#a8e1bd', svg: ICONS.watermelon, sound: 'crunch', anim: 'rock' },
    { id: 'strawberry', title: 'Stroberi', subtitle: 'Strawberry', speech: 'Stroberi!', cardBg: '#fff0f4', ledge: '#f4b9ca', svg: ICONS.strawberry, sound: 'juicy', anim: 'hop' },
    { id: 'grapes', title: 'Anggur', subtitle: 'Grapes', speech: 'Anggur!', cardBg: '#f6eeff', ledge: '#d7bcf5', svg: ICONS.grapes, sound: 'juicy', anim: 'waddle' },
    { id: 'bread', title: 'Roti', subtitle: 'Bread', speech: 'Roti! Empuk!', cardBg: '#fff5e4', ledge: '#edd0a3', svg: ICONS.bread, sound: 'crunch', anim: 'jiggle' },
    { id: 'milk', title: 'Susu', subtitle: 'Milk', speech: 'Susu! Sehat!', cardBg: '#eaf6ff', ledge: '#add6f2', svg: ICONS.milk, sound: 'gulp', anim: 'sway' }
  ],

  vehicles: [
    { id: 'car', title: 'Mobil', subtitle: 'Car', speech: 'Mobil! Tin tin!', cardBg: '#fff0f0', ledge: '#f4bebe', svg: ICONS.car, sound: 'car', anim: 'drive' },
    { id: 'train', title: 'Kereta', subtitle: 'Train', speech: 'Kereta! Tut tut!', cardBg: '#eaf6ff', ledge: '#add6f2', svg: ICONS.train, sound: 'train', anim: 'drive' },
    { id: 'airplane', title: 'Pesawat', subtitle: 'Airplane', speech: 'Pesawat! Wuuush!', cardBg: '#fff4e3', ledge: '#f2ca93', svg: ICONS.airplane, sound: 'airplane', anim: 'fly' },
    { id: 'ship', title: 'Kapal', subtitle: 'Ship', speech: 'Kapal laut!', cardBg: '#e8faff', ledge: '#a6e4f2', svg: ICONS.ship, sound: 'ship', anim: 'rock' },
    { id: 'bus', title: 'Bus', subtitle: 'Bus', speech: 'Bus! Bim bim!', cardBg: '#fff9de', ledge: '#eed884', svg: ICONS.bus, sound: 'bus', anim: 'drive' },
    { id: 'bicycle', title: 'Sepeda', subtitle: 'Bicycle', speech: 'Sepeda! Kring kring!', cardBg: '#eafaf0', ledge: '#a8e1bd', svg: ICONS.bicycle, sound: 'bicycle', anim: 'drive' }
  ],

  homeIcons: {
    animals: ICONS.cat,
    numbers: `<svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#ffffff" opacity="0.85"/>
      <text x="60" y="77" text-anchor="middle" font-family="Fredoka, Nunito, Trebuchet MS, sans-serif" font-size="50" font-weight="700" fill="#2b8ac6">123</text>
    </svg>`,
    letters: `<svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="#ffffff" opacity="0.85"/>
      <text x="60" y="75" text-anchor="middle" font-family="Fredoka, Nunito, Trebuchet MS, sans-serif" font-size="40" font-weight="700" fill="#e07a00">ABC</text>
    </svg>`,
    colors_shapes: makeShape('star', '#ffd166'),
    fruits: ICONS.apple,
    vehicles: ICONS.car
  }
};
