import noirSalwarImg from '../assets/images/product_men_shalwar_kameez_noir_1790601092923.jpg';
import slateKameezImg from '../assets/images/product_men_kameez_slate_1790601107260.jpg';
import ivorySalwarImg from '../assets/images/product_men_shalwar_ivory_1790601118438.jpg';
import hoodieImg from '../assets/images/product_hoodie_heavyweight_1790600659536.jpg';
import overshirtImg from '../assets/images/product_overshirt_tactical_1790600673286.jpg';
import trousersImg from '../assets/images/product_trousers_pleated_1790600686292.jpg';
import fabricImg from '../assets/images/editorial_craft_fabric_1790600698023.jpg';
import campaignImg from '../assets/images/hero_fleex_campaign_1790600641108.jpg';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'salwar-kameez' | 'outerwear' | 'hoodies' | 'overshirts' | 'trousers' | 'tees';
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  gsm?: string;
  fit: 'Traditional Relaxed' | 'Tailored Contemporary' | 'Boxy Oversized' | 'Relaxed Tailored' | 'Architectural Oversized' | 'Standard Drop';
  fabric: string;
  description: string;
  features: string[];
  care: string[];
  colors: { name: string; hex: string; bgClass: string }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  secondaryImage?: string;
  measurements: {
    size: string;
    chest: string;
    length: string;
    shoulder: string;
    sleeve: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'flx-sk-01',
    name: 'Bespoke Noir Egyptian Cotton Salwar Kameez',
    slug: 'bespoke-noir-salwar-kameez',
    category: 'salwar-kameez',
    categoryLabel: 'Men Salwar & Kameez',
    price: 9450,
    compareAtPrice: 11500,
    badge: 'DROP 04 SIGNATURE SUIT',
    gsm: '220 GSM',
    fit: 'Tailored Contemporary',
    fabric: '100% High-Thread Count Giza Egyptian Combed Cotton',
    description: 'An architectural reinterpretation of the traditional men’s two-piece salwar kameez suit. Features a structured band collar with subtle tonal pick-stitching, hidden placket closure, French cuff sleeves with engraved gunmetal buttons, and a matching generous pleated salwar with tailored ankle cuffs.',
    features: [
      'Two-piece ensemble: Tailored long kameez and pleat-draped salwar',
      'Ultra-fine 120/2 double-twist Egyptian cotton with crisp liquid drape',
      'Structured 1.5" Mandarin band collar with non-crease fused interlining',
      'Concealed placket with genuine mother-of-pearl buttons inside',
      'Side inseam deep pockets engineered to fit modern smartphones securely',
      'Pleated salwar with reinforced waist tie and comfortable 8" ankle cuff opening'
    ],
    care: [
      'Gentle hand wash or dry clean recommended for pristine luster',
      'Machine wash cold (30°C) inside out on gentle cycle',
      'Warm steam iron along front placket and cuff creases while slightly damp'
    ],
    colors: [
      { name: 'Onyx Noir Black', hex: '#111214', bgClass: 'bg-[#111214]' },
      { name: 'Deep Midnight Basalt', hex: '#1c1f24', bgClass: 'bg-[#1c1f24]' },
      { name: 'Basalt Charcoal', hex: '#2b2d30', bgClass: 'bg-[#2b2d30]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    rating: 4.98,
    reviewCount: 56,
    primaryImage: noirSalwarImg,
    measurements: [
      { size: 'S', chest: 'Kameez 107 cm', length: '102 cm', shoulder: '44 cm', sleeve: '61 cm' },
      { size: 'M', chest: 'Kameez 112 cm', length: '105 cm', shoulder: '46 cm', sleeve: '63 cm' },
      { size: 'L', chest: 'Kameez 118 cm', length: '108 cm', shoulder: '48 cm', sleeve: '64.5 cm' },
      { size: 'XL', chest: 'Kameez 124 cm', length: '111 cm', shoulder: '50 cm', sleeve: '66 cm' },
      { size: 'XXL', chest: 'Kameez 130 cm', length: '114 cm', shoulder: '52 cm', sleeve: '67 cm' }
    ]
  },
  {
    id: 'flx-sk-02',
    name: 'Slate Raw Linen-Cotton Kameez & Salwar',
    slug: 'slate-raw-linen-kameez-salwar',
    category: 'salwar-kameez',
    categoryLabel: 'Men Salwar & Kameez',
    price: 8200,
    compareAtPrice: 9800,
    badge: 'SUMMER ARCHITECTURE',
    gsm: '240 GSM',
    fit: 'Tailored Contemporary',
    fabric: '55% Pure European Flax Linen, 45% Organic Combed Cotton',
    description: 'Cut from a breathable slub-textured linen and cotton blend in an earthy slate tone. Styled with a sharp bandhgala collar, streamlined welt chest pocket, and paired with an easy drape pleated salwar engineered for all-day comfort and effortless drape in motion.',
    features: [
      'Two-piece matching set: Slub linen kameez + pleated drawcord salwar',
      'High breathability weave that stays crisp in humid and warm climates',
      'Functional tailored welt chest pocket with internal card sleeve',
      'Dual side slits finished with reinforced bar-tack stitching',
      'Full-cut pleated salwar with relaxed rise and tapered ankle hem'
    ],
    care: [
      'Gentle cold machine wash with mild detergent',
      'Line dry in shade to maintain natural linen fiber bounce',
      'Steam iron on medium-high heat with light water mist'
    ],
    colors: [
      { name: 'Slate Mineral Grey', hex: '#484b50', bgClass: 'bg-[#484b50]' },
      { name: 'Olive Basalt', hex: '#373c36', bgClass: 'bg-[#373c36]' },
      { name: 'Washed Stone', hex: '#6b6e72', bgClass: 'bg-[#6b6e72]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    rating: 4.93,
    reviewCount: 38,
    primaryImage: slateKameezImg,
    measurements: [
      { size: 'S', chest: 'Kameez 108 cm', length: '101 cm', shoulder: '45 cm', sleeve: '61 cm' },
      { size: 'M', chest: 'Kameez 114 cm', length: '104 cm', shoulder: '47 cm', sleeve: '63 cm' },
      { size: 'L', chest: 'Kameez 120 cm', length: '107 cm', shoulder: '49 cm', sleeve: '65 cm' },
      { size: 'XL', chest: 'Kameez 126 cm', length: '110 cm', shoulder: '51 cm', sleeve: '66.5 cm' },
      { size: 'XXL', chest: 'Kameez 132 cm', length: '113 cm', shoulder: '53 cm', sleeve: '68 cm' }
    ]
  },
  {
    id: 'flx-sk-03',
    name: 'Ivory Raw Silk-Cotton Festive Salwar Kameez',
    slug: 'ivory-raw-silk-cotton-salwar-kameez',
    category: 'salwar-kameez',
    categoryLabel: 'Men Salwar & Kameez',
    price: 11800,
    compareAtPrice: 13500,
    badge: 'CEREMONIAL CAPSULE',
    gsm: '260 GSM',
    fit: 'Tailored Contemporary',
    fabric: '40% Hand-Spun Raw Matka Silk, 60% Long-Staple Combed Cotton',
    description: 'A regal ceremonial garment ensemble. Crafted from rich hand-spun raw silk blended with extra-long staple cotton for unmatched subtle sheen and tactile texture. Features an architectural Nehru mandarin neck, hand-stitched button loops, and matching flared pleated salwar.',
    features: [
      'Two-piece suit: Raw silk blend long kameez and flared salwar',
      'Subtle natural silk sheen with organic textured slub finish',
      'Architectural high-stance band collar with hand-finished interior',
      'Artisan fabric-covered buttons on an elongated placket',
      'Voluminous pleated salwar that falls with elegant architectural drape'
    ],
    care: [
      'Specialist dry clean only to preserve raw silk texture and sheen',
      'Store in provided breathable cotton garment bag with cedar hanger',
      'Low steam iron on reverse side with protective pressing cloth'
    ],
    colors: [
      { name: 'Ivory Chalk Bone', hex: '#ebe7de', bgClass: 'bg-[#ebe7de]' },
      { name: 'Warm Cream Silk', hex: '#ded8cb', bgClass: 'bg-[#ded8cb]' },
      { name: 'Raw Oyster', hex: '#cac5b9', bgClass: 'bg-[#cac5b9]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    rating: 4.97,
    reviewCount: 44,
    primaryImage: ivorySalwarImg,
    measurements: [
      { size: 'S', chest: 'Kameez 106 cm', length: '103 cm', shoulder: '44.5 cm', sleeve: '61.5 cm' },
      { size: 'M', chest: 'Kameez 112 cm', length: '106 cm', shoulder: '46.5 cm', sleeve: '63.5 cm' },
      { size: 'L', chest: 'Kameez 118 cm', length: '109 cm', shoulder: '48.5 cm', sleeve: '65 cm' },
      { size: 'XL', chest: 'Kameez 124 cm', length: '112 cm', shoulder: '50.5 cm', sleeve: '66.5 cm' },
      { size: 'XXL', chest: 'Kameez 130 cm', length: '115 cm', shoulder: '52.5 cm', sleeve: '68 cm' }
    ]
  },
  {
    id: 'flx-01',
    name: 'Monolith 480 GSM Heavy Hoodie',
    slug: 'monolith-480gsm-heavy-hoodie',
    category: 'hoodies',
    categoryLabel: 'Hoodies & Sweats',
    price: 7500,
    compareAtPrice: 8900,
    badge: 'DROP 04 SIGNATURE',
    gsm: '480 GSM',
    fit: 'Boxy Oversized',
    fabric: '100% GOTS-Certified Organic Combed French Terry Cotton',
    description: 'Engineered with extreme yarn density for an architectural silhouette that never collapses. Features double-layered hood construction, invisible kangaroo seam pockets, and heavyweight 2x2 ribbing at cuff and hem.',
    features: [
      'Custom developed 480 GSM heavy loopback French terry',
      'Double-layer structured hood without drawstrings for clean aesthetic',
      'Blind-stitched kangaroo pocket seamlessly integrated into side seams',
      'Pre-shrunk through bespoke mineral cold-wash technique',
      'Dropped shoulder seam reinforced with herringbone binding'
    ],
    care: [
      'Machine wash cold (30°C) with similar dark tones',
      'Reshape while damp and dry flat away from direct sunlight',
      'Cool iron on reverse side; do not tumble dry'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#26282b', bgClass: 'bg-[#26282b]' },
      { name: 'Pitch Black', hex: '#121314', bgClass: 'bg-[#121314]' },
      { name: 'Raw Bone', hex: '#d9d4cb', bgClass: 'bg-[#d9d4cb]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    rating: 4.95,
    reviewCount: 42,
    primaryImage: hoodieImg,
    measurements: [
      { size: 'S', chest: '124 cm', length: '68 cm', shoulder: '59 cm', sleeve: '61 cm' },
      { size: 'M', chest: '130 cm', length: '71 cm', shoulder: '61 cm', sleeve: '62.5 cm' },
      { size: 'L', chest: '136 cm', length: '74 cm', shoulder: '63 cm', sleeve: '64 cm' },
      { size: 'XL', chest: '142 cm', length: '76 cm', shoulder: '65 cm', sleeve: '65.5 cm' },
      { size: 'XXL', chest: '148 cm', length: '78 cm', shoulder: '67 cm', sleeve: '67 cm' }
    ]
  },
  {
    id: 'flx-02',
    name: 'Tactical Selvedge Wool Overshirt',
    slug: 'tactical-selvedge-wool-overshirt',
    category: 'overshirts',
    categoryLabel: 'Overshirts',
    price: 9200,
    compareAtPrice: 10800,
    badge: 'LIMITED RUN / 200 PIECES',
    gsm: '380 GSM',
    fit: 'Architectural Oversized',
    fabric: '85% Virgin Wool, 15% Recycled Technical Polyamide',
    description: 'A utilitarian overshirt tailored from dense dry-handle virgin wool. Features dual gusseted bellows chest pockets, genuine matte horn buttons, and an articulated back yoke for natural movement.',
    features: [
      'Dense 380 GSM woven melton virgin wool blend',
      'Dual chest bellows pockets with hidden snap closures',
      'Curved hemline with reinforced selvedge gussets',
      'Custom laser-engraved organic buffalo horn buttons',
      'Fully unlined interior with bound bias seams'
    ],
    care: [
      'Specialist dry clean only',
      'Steam refresh between wears',
      'Store on structured wide wooden hanger'
    ],
    colors: [
      { name: 'Slate Olive', hex: '#3d443b', bgClass: 'bg-[#3d443b]' },
      { name: 'Dark Basalt', hex: '#1c1d1f', bgClass: 'bg-[#1c1d1f]' },
      { name: 'Oatmeal Heather', hex: '#c5bfb4', bgClass: 'bg-[#c5bfb4]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.88,
    reviewCount: 31,
    primaryImage: overshirtImg,
    measurements: [
      { size: 'S', chest: '118 cm', length: '72 cm', shoulder: '52 cm', sleeve: '63 cm' },
      { size: 'M', chest: '124 cm', length: '74 cm', shoulder: '54 cm', sleeve: '64.5 cm' },
      { size: 'L', chest: '130 cm', length: '76 cm', shoulder: '56 cm', sleeve: '66 cm' },
      { size: 'XL', chest: '136 cm', length: '78 cm', shoulder: '58 cm', sleeve: '67.5 cm' }
    ]
  },
  {
    id: 'flx-03',
    name: 'Pleated Wide-Leg Basalt Trousers',
    slug: 'pleated-wide-leg-basalt-trousers',
    category: 'trousers',
    categoryLabel: 'Trousers',
    price: 6800,
    compareAtPrice: 7900,
    badge: 'CORE ESSENTIAL',
    gsm: '320 GSM',
    fit: 'Relaxed Tailored',
    fabric: '65% Japanese Poly-Viscose Twill, 35% Long-Staple Cotton',
    description: 'Designed with deep inverted double forward pleats for unmatched drape in motion. Cut with an easy relaxed silhouette that falls straight through a slightly tapered hem.',
    features: [
      'Heavy-drape Japanese high-twist twill weave',
      'Double forward pleats originating from clean waistband',
      'Adjustable internal cinch tab for tailor-level waist fit',
      'Deep slanted front slash pockets and jetted rear button pockets',
      'Full length with 4 cm generous turn-up hem for lengthening'
    ],
    care: [
      'Machine wash gentle cycle cold (30°C)',
      'Hang to dry immediately along pleat creases',
      'Medium steam iron preserving front creases'
    ],
    colors: [
      { name: 'Midnight Charcoal', hex: '#1a1c20', bgClass: 'bg-[#1a1c20]' },
      { name: 'Stone Grey', hex: '#525458', bgClass: 'bg-[#525458]' },
      { name: 'Deep Umber', hex: '#2b241e', bgClass: 'bg-[#2b241e]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.92,
    reviewCount: 29,
    primaryImage: trousersImg,
    measurements: [
      { size: 'S', chest: 'Waist 81 cm', length: '105 cm', shoulder: 'Thigh 70 cm', sleeve: 'Hem 49 cm' },
      { size: 'M', chest: 'Waist 86 cm', length: '107 cm', shoulder: 'Thigh 72 cm', sleeve: 'Hem 50 cm' },
      { size: 'L', chest: 'Waist 91 cm', length: '108 cm', shoulder: 'Thigh 75 cm', sleeve: 'Hem 51 cm' },
      { size: 'XL', chest: 'Waist 96 cm', length: '109 cm', shoulder: 'Thigh 78 cm', sleeve: 'Hem 52 cm' }
    ]
  },
  {
    id: 'flx-04',
    name: 'Form 04 Heavyweight Raw Tee',
    slug: 'form-04-heavyweight-raw-tee',
    category: 'tees',
    categoryLabel: 'T-Shirts',
    price: 3400,
    compareAtPrice: 4200,
    gsm: '290 GSM',
    fit: 'Boxy Oversized',
    fabric: '100% Ring-Spun Aegean Combed Cotton',
    description: 'An uncompromising staple tee knit from ultra-heavy 290 GSM combed cotton. Featuring a tight, structured 1.25" rib collar that will never bacon or lose its shape, with dropped shoulders and a boxy body cut.',
    features: [
      'Substantial 290 GSM single jersey cotton',
      'High-density 1x1 rib neckline that stays crisp wash after wash',
      'Twin-needle cover-stitched hems and sleeve cuffs',
      'Seamless body drape with tailored sleeve drop',
      'Enzyme-washed for clean tactile surface without sheen'
    ],
    care: [
      'Machine wash 30°C with similar colors',
      'Do not bleach; do not tumble dry',
      'Iron inside out on medium heat'
    ],
    colors: [
      { name: 'Optic Off-White', hex: '#ebe9e4', bgClass: 'bg-[#ebe9e4]' },
      { name: 'Washed Black', hex: '#1e1f21', bgClass: 'bg-[#1e1f21]' },
      { name: 'Concrete Grey', hex: '#7a7e85', bgClass: 'bg-[#7a7e85]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    rating: 4.97,
    reviewCount: 64,
    primaryImage: fabricImg,
    measurements: [
      { size: 'S', chest: '116 cm', length: '71 cm', shoulder: '53 cm', sleeve: '23 cm' },
      { size: 'M', chest: '122 cm', length: '73 cm', shoulder: '55 cm', sleeve: '24 cm' },
      { size: 'L', chest: '128 cm', length: '75 cm', shoulder: '57 cm', sleeve: '25 cm' },
      { size: 'XL', chest: '134 cm', length: '77 cm', shoulder: '59 cm', sleeve: '26 cm' },
      { size: 'XXL', chest: '140 cm', length: '79 cm', shoulder: '61 cm', sleeve: '27 cm' }
    ]
  },
  {
    id: 'flx-05',
    name: 'Architectural Modular Fishtail Parka',
    slug: 'architectural-modular-fishtail-parka',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    price: 14500,
    compareAtPrice: 16800,
    badge: 'HIGH PERFORMANCE',
    gsm: '310 GSM',
    fit: 'Architectural Oversized',
    fabric: 'Water-Repellent Japanese High-Density Nylon Ripstop & Microfiber Membrane',
    description: 'A contemporary rethinking of the military M-65 fishtail parka. Engineered with waterproof taped seams, convertible snap fishtail hem, and modular interior loop system for detachable insulation.',
    features: [
      '10,000mm waterproof / 8,000g breathability rating',
      'Two-way matte black waterproof YKK Aquaguard front zipper',
      'Dual-depth hood with concealed storm brim and shock cord adjuster',
      'Deep ergonomic cargo pockets with fleece-lined hand warmers',
      'Fishtail drawcord can be fastened up inside with brass snaps'
    ],
    care: [
      'Gentle cool machine wash with technical wash detergent',
      'Do not use fabric softeners; line dry in shade',
      'Re-proof DWR finish periodically with spray'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#0f1011', bgClass: 'bg-[#0f1011]' },
      { name: 'Combat Slate', hex: '#2f3531', bgClass: 'bg-[#2f3531]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.96,
    reviewCount: 18,
    primaryImage: campaignImg,
    measurements: [
      { size: 'S', chest: '132 cm', length: '102 cm', shoulder: '56 cm', sleeve: '65 cm' },
      { size: 'M', chest: '138 cm', length: '105 cm', shoulder: '58 cm', sleeve: '66.5 cm' },
      { size: 'L', chest: '144 cm', length: '108 cm', shoulder: '60 cm', sleeve: '68 cm' },
      { size: 'XL', chest: '150 cm', length: '110 cm', shoulder: '62 cm', sleeve: '69.5 cm' }
    ]
  },
  {
    id: 'flx-06',
    name: 'Thermal Rib Knit Crewneck',
    slug: 'thermal-rib-knit-crewneck',
    category: 'hoodies',
    categoryLabel: 'Hoodies & Sweats',
    price: 6400,
    compareAtPrice: 7500,
    gsm: '440 GSM',
    fit: 'Standard Drop',
    fabric: '70% Recycled Merino Wool, 30% Organic Combed Cotton',
    description: 'Heavy gauge fisherman rib sweater reimagined for minimalists. Clean squared neckline, raglan sleeve articulation, and dense knit gauge that traps heat while maintaining a structured posture.',
    features: [
      '7-gauge heavy knit construction with zero itch factor',
      'Reinforced raglan shoulders designed for clean silhouette',
      'Shape-memory ribbed cuffs and hemband',
      'Naturally odor resistant and temperature regulating'
    ],
    care: [
      'Hand wash cold or wool machine cycle',
      'Dry flat on towel to maintain knit geometry',
      'Do not wring or hang wet'
    ],
    colors: [
      { name: 'Basalt Charcoal', hex: '#202226', bgClass: 'bg-[#202226]' },
      { name: 'Sand Chalk', hex: '#cdc8bd', bgClass: 'bg-[#cdc8bd]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.89,
    reviewCount: 22,
    primaryImage: hoodieImg,
    measurements: [
      { size: 'S', chest: '114 cm', length: '67 cm', shoulder: 'Raglan', sleeve: '78 cm' },
      { size: 'M', chest: '120 cm', length: '69 cm', shoulder: 'Raglan', sleeve: '80 cm' },
      { size: 'L', chest: '126 cm', length: '71 cm', shoulder: 'Raglan', sleeve: '82 cm' },
      { size: 'XL', chest: '132 cm', length: '73 cm', shoulder: 'Raglan', sleeve: '84 cm' }
    ]
  }
];

export const LOOKBOOK_LOOKS = [
  {
    id: 'look-01',
    title: 'Look 01: Bespoke Heritage Form',
    subtitle: 'Bespoke Noir Salwar Kameez in high-count Egyptian cotton with band collar',
    image: noirSalwarImg,
    featuredProductIds: ['flx-sk-01', 'flx-03']
  },
  {
    id: 'look-02',
    title: 'Look 02: Linen-Cotton Architecture',
    subtitle: 'Slate Raw Slub Kameez & Pleated Salwar Suit',
    image: slateKameezImg,
    featuredProductIds: ['flx-sk-02', 'flx-sk-03']
  },
  {
    id: 'look-03',
    title: 'Look 03: Ceremonial Silk Drape',
    subtitle: 'Hand-Spun Ivory Raw Silk Salwar Kameez',
    image: ivorySalwarImg,
    featuredProductIds: ['flx-sk-03', 'flx-01']
  }
];

export const CRAFT_SPECS = [
  {
    number: '01',
    title: 'Tailored Salwar & Kameez Precision',
    description: 'We construct our men’s salwar kameez with reinforced fused mandarin band collars, German interlining that never buckles, and deep forward pleats on the salwar for effortless aristocratic drape.'
  },
  {
    number: '02',
    title: '480 GSM Loopback & Giza Cotton',
    description: 'From ultra-dense 480 GSM heavyweight streetwear knits to 120/2 two-ply long-staple Egyptian cotton for bespoke shalwar kameez suits, our yarn densities hold their architecture permanently.'
  },
  {
    number: '03',
    title: 'Concealed Artisan Plackets',
    description: 'Seamless blind-button plackets, hand-stitched bar tacks, and double-needle armhole bindings ensure all garments maintain clean, uninterrupted lines.'
  },
  {
    number: '04',
    title: 'Pre-Shrunk Mineral Cold Wash',
    description: 'Every yard of fabric undergoes cold water enzyme wash to eliminate residual shrinkage, ensuring your tailored collar and salwar length remain exact after dozens of washes.'
  }
];

export const REVIEWS = [
  {
    id: 'rev-01',
    author: 'Hamza Tariq',
    location: 'Lahore, Pakistan',
    productName: 'Bespoke Noir Egyptian Cotton Salwar Kameez',
    rating: 5,
    date: 'March 2026',
    verified: true,
    fitFeedback: 'Fits True to Size (Tailored Drape)',
    comment: 'The collar structure and cuff detailing on this black salwar kameez are masterclass. The Giza cotton has a crisp hand yet feels weightless in warm weather. The salwar pleats hang cleanly without pooling clumsily.'
  },
  {
    id: 'rev-02',
    author: 'Zayd Al-Mansoor',
    location: 'Karachi, Pakistan',
    productName: 'Slate Raw Linen-Cotton Kameez & Salwar',
    rating: 5,
    date: 'February 2026',
    verified: true,
    fitFeedback: 'True to Size (Relaxed Traditional)',
    comment: 'The slate color and slub linen texture give this kameez an understated architectural presence. Very breathable and looks exceptionally sharp for Jummah and evening gatherings.'
  },
  {
    id: 'rev-03',
    author: 'Shahmeer Khan',
    location: 'Islamabad, Pakistan',
    productName: 'Ivory Raw Silk-Cotton Festive Salwar Kameez',
    rating: 5,
    date: 'March 2026',
    verified: true,
    fitFeedback: 'Exquisite Ceremonial Fit',
    comment: 'Wore this for an engagement banquet. The raw silk slub has a subtle matte luster that stands out against typical commercial suits. Extremely impressed with Fleex Garments craftsmanship.'
  }
];
