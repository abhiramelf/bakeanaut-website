import type { Sector, Bundle } from '@/types'

export const sectors: Sector[] = [
  {
    id: 'sector-1',
    code: 'SECTOR I',
    name: 'PLANETARY COOKIES',
    subtitle: 'Cookies',
    flavorText: 'Samples collected from unstable planetary surfaces.',
    items: [
      {
        id: 'black-hole',
        name: 'BLACK HOLE',
        description: 'Dark cocoa shell, molten white-chocolate singularity',
        price: null,
        badges: [],
      },
      {
        id: 'red-planet',
        name: 'RED PLANET',
        description: 'Crimson velvet crust, cream-cheese lava core',
        price: null,
        badges: ['best-selling'],
      },
      {
        id: 'meteor-shower',
        name: 'METEOR SHOWER',
        description: 'Brown-butter base, walnut craters + chocolate debris',
        price: null,
        badges: [],
      },
    ],
  },
  {
    id: 'sector-2',
    code: 'SECTOR II',
    name: 'NEBULA BLOCKS',
    subtitle: 'Brownies / Blondies',
    flavorText: 'Dense dark-matter rations for long-haul cravings.',
    items: [
      {
        id: 'milky-way-swirl',
        name: 'MILKY WAY SWIRL',
        description: 'Deep fudge block, salted caramel spiral',
        price: null,
        badges: [],
      },
      {
        id: 'apollo-rock',
        name: 'APOLLO ROCK',
        description: 'Triple-chocolate terrain, chocolate sauce',
        price: null,
        badges: ['best-selling'],
      },
    ],
  },
  {
    id: 'sector-3',
    code: 'SECTOR III',
    name: 'NEW YORK LUNAR CHEESECAKES',
    subtitle: 'NYC Baked',
    flavorText: 'Lunar terrain, baked and stabilized for safe re-entry.',
    items: [
      {
        id: 'manhattan-moon',
        name: 'MANHATTAN MOON (CLASSIC)',
        description: 'NYC baked cheesecake, clean vanilla orbit',
        price: null,
        badges: ['top-mission'],
      },
      {
        id: 'brooklyn-blackout',
        name: 'BROOKLYN BLACKOUT (DARK)',
        description: 'Dark-choco / oreo signal loss',
        price: null,
        badges: ['top-mission'],
      },
    ],
  },
  {
    id: 'sector-4',
    code: 'SECTOR IV',
    name: 'MINI RE-ENTRY BASQUES',
    subtitle: 'Limited',
    flavorText: 'Heat-shielded minis. Handle with care.',
    items: [
      {
        id: 'solar-flare-mini',
        name: 'SOLAR FLARE MINI',
        description: 'Caramelized armor, molten core (Ask crew for toppings)',
        price: null,
        badges: ['best-selling'],
      },
    ],
  },
  {
    id: 'sector-5',
    code: 'SECTOR V',
    name: 'DOCKING BOMBA',
    subtitle: 'Bombolonis',
    flavorText: 'Soft landing pods. High-value cores.',
    items: [
      {
        id: 'cherry-comet',
        name: 'CHERRY COMET',
        description: 'Buttercream core, cherry compote trail',
        price: null,
        badges: [],
      },
      {
        id: 'dark-matter-core',
        name: 'DARK MATTER CORE',
        description: 'Chocolate / nutella core breach',
        price: null,
        badges: [],
      },
    ],
  },
  {
    id: 'sector-6',
    code: 'SECTOR VI',
    name: 'THRUSTER BUNS',
    subtitle: 'Savory Ops',
    flavorText: 'Small heat signatures. Big impact. Limited clearance.',
    items: [
      {
        id: 'chili-comms-bun',
        name: 'CHILI COMMS BUN',
        description: 'Molten cheese, chilli heat, launch-ready (Spice: medium)',
        price: null,
        badges: [],
      },
    ],
  },
  {
    id: 'sector-7',
    code: 'SECTOR VII',
    name: 'ORBITAL SLICES',
    subtitle: 'Cake Slices',
    flavorText: 'Mission-ready slices for immediate deployment.',
    items: [
      {
        id: 'strawberry-signal-slice',
        name: 'STRAWBERRY SIGNAL SLICE',
        description: 'Vanilla sponge + vanilla buttercream + strawberry compote',
        price: null,
        badges: ['best-selling'],
      },
      {
        id: 'triple-arc-ganache-slice',
        name: 'TRIPLE-ARC GANACHE SLICE',
        description: 'Dark choco sponge, milk-choco + white-choco ganache overlay',
        price: null,
        badges: [],
      },
    ],
  },
]

export const specialPayloads: Sector = {
  id: 'special-payloads',
  code: 'SPECIAL PAYLOADS',
  name: 'SPECIAL PAYLOADS',
  subtitle: 'Limited',
  flavorText: 'Not always visible on the board. Ask crew for clearance.',
  items: [
    {
      id: 'crimson-classified-tin',
      name: 'CRIMSON CLASSIFIED TIN',
      description: 'Red velvet cookie tin, white-chocolate core (built for gifting)',
      price: null,
      badges: ['limited'],
    },
  ],
}

export const bundles: Bundle[] = [
  {
    id: 'orbit-pack',
    name: 'ORBIT PACK',
    description: 'Any 3 Cookies',
  },
  {
    id: 'docking-duo',
    name: 'DOCKING DUO',
    description: 'Cookie + Brownie',
  },
  {
    id: 'sector-hop',
    name: 'SECTOR HOP',
    description: 'Pick any 2 from different sectors',
  },
]
