// interface PerksBannerProps {
//   perks: string[]
//   accent?: string
// }

// export default function PerksBanner({ perks, accent = '#FF5A4E' }: PerksBannerProps) {
//   return (
//     <div
//       style={{
//         marginTop: 24,
//         borderRadius: 16,
//         border: `1.5px solid ${accent}22`,
//         background: 'linear-gradient(135deg, #F0FBF8 0%, #FFF 100%)',
//         padding: '20px 24px',
//       }}
//     >
//       <p
//         style={{
//           fontSize: 11,
//           fontWeight: 800,
//           letterSpacing: '0.14em',
//           textTransform: 'uppercase',
//           color: accent,
//           marginBottom: 14,
//         }}
//       >
//         Included with Membership & Seasonal Pass
//       </p>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
//         {perks.map(perk => (
//           <span
//             key={perk}
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: 6,
//               padding: '6px 14px',
//               borderRadius: 99,
//               background: '#fff',
//               border: '1.5px solid #B2EFE4',
//               fontSize: 13,
//               fontWeight: 600,
//               color: '#374151',
//             }}
//           >
//             <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, display: 'inline-block' }} />
//             {perk}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }
