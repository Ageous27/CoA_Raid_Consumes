import {
  Button,
  Callout,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
} from "cursor/canvas";

type Category = "all" | "food" | "flasks" | "weapons" | "zg";

const FOOD_SINGLE_ROWS: string[][] = [
  [
    "Azerothian Schmorgus Board",
    "Raid feast: +35 AP or +20 SP and +15 Stam, 30 min",
    "Dirge: 1 Lava Eel, 5 Goblin Spices, 1 Devilsaur Meat, 1 Bear Flank",
  ],
  [
    "Fused Air Fried Chops",
    "+23 Agility, 1 hr",
    "1 Cured Savage Meat, 1 Scorched Silithid Meat, 2 Mystery Meat",
  ],
  [
    "Fused Charred Steak",
    "+23 Strength, 1 hr",
    "1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Mystery Meat",
  ],
  [
    "Fused Steamed Wontons",
    "+25 Intellect, 1 hr",
    "1 Cured Savage Meat, 1 Salted Naga Tail, 2 Mystery Meat",
  ],
  [
    "Fused Living Soup",
    "+23 Spirit, 1 hr",
    "1 Cured Savage Meat, 1 Shadowcharred Animated Meat, 2 Mystery Meat",
  ],
  [
    "Fused Rock's Stew",
    "+28 Stamina, 1 hr",
    "1 Cured Savage Meat, 1 Shadowcharred Animated Meat, 2 Mystery Meat",
  ],
  [
    "Fused Savory Chops, Steak, or Wontons",
    "+14 hit and +10 Agi, Str, or Int, 1 hr (Chops and Steak persist through death)",
    "Chops/Steak: 3 Chimaerok Tenderloin, 2 Essence of Undeath. Wontons: 3 Turtle Meat, 1 Essence of Water",
  ],
  [
    "Fused Red-Hot Stew",
    "+14 melee crit and +14 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Sandworm Meat",
  ],
  [
    "Fused Blazing Stew",
    "+9 spell crit and +15 Stam, 1 hr (persists through death)",
    "3 Raptor Flesh, 1 Essence of Fire",
  ],
  [
    "Rubbed Ravasaur Ribs",
    "+23 melee and ranged haste, 30 min (beats Fused Seared Chops' +8 haste)",
    "Dirge: 1 Ravasaur Ribs, 1 Goblin Spices",
  ],
  [
    "Hydra Scale Soup",
    "+10 spell haste, 30 min (beats Fused Seared Wontons' +8 haste)",
    "Dirge: 1 Raw Spinefin Halibut, 1 Large Hydra Scale, 1 Goblin Spices, 1 Refreshing Spring Water",
  ],
  [
    "Silithid Snack",
    "+13 armor pen, 30 min (beats Fused Piercing +8)",
    "Dirge: 1 Sandworm Meat, 1 Silithid Innards, 1 Goblin Spices",
  ],
  [
    "Fused Duck Stew",
    "+16 dodge and +15 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Salted Naga Tail, 2 Mystery Meat",
  ],
  [
    "Hippogryph Steak",
    "+16 parry, 30 min (beats Fused Simmered Stew +12 parry)",
    "Dirge: 1 Hippogryph Meat, 1 Goblin Spices",
  ],
  [
    "Fused Chunky Stew",
    "+14 block value and +15 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Scorched Silithid Meat, 2 Raptor Flesh",
  ],
  [
    "Hearty Stegodon Stew",
    "+10 defense rating, 30 min (no Fused defense food)",
    "Dirge: 1 Stegodon Meat, 1 Goblin Spices, 1 Refreshing Spring Water",
  ],
  [
    "Fused Wizard Wontons",
    "+10 SP and +15 Intellect, 1 hr",
    "1 Cured Savage Meat, 1 Salted Naga Tail, 2 Turtle Meat",
  ],
  [
    "Fused Heightened Wontons",
    "+25 MP5 and +200 mana, 1 hr (persists through death)",
    "3 Turtle Meat, 1 Essence of Water",
  ],
  [
    "Fused Vibrant Chops",
    "+7 max energy, 1 hr (persists through death)",
    "3 Raw Nightfin Snapper, 1 Essence of Air",
  ],
  [
    "Chilled Lava Eel",
    "Damaging abilities can deal extra Fire damage, 30 min",
    "1 Lava Eel, 1 Shard of Nevermelting Ice",
  ],
  [
    "Chillwind Flank Steak",
    "+8 all-school resistance, 30 min",
    "Dirge: 1 Chillwind Flank, 1 Goblin Spices",
  ],
];

const FOOD_COMBO_ROWS: string[][] = [
  [
    "Fused Hearty Air Fried Chops",
    "+10 Agility and +20 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Scorched Silithid Meat, 2 Tender Wolf Meat",
  ],
  [
    "Fused Clear-Cut Chops or Savory Chops",
    "Clear-Cut: +15 Agi +10 hit. Savory: +10 Agi +14 hit, persists through death",
    "Clear-Cut: 1 Cured Savage Meat, 1 Salted Naga Tail, 2 Raptor Flesh. Savory: 3 Chimaerok Tenderloin, 2 Essence of Undeath",
  ],
  [
    "Fused Piercing Chops",
    "+8 armor pen and +8 Agility, 1 hr",
    "1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Chimaerok Tenderloin",
  ],
  [
    "Fused Subtle Chops",
    "10% less threat and +10 Agility, 1 hr",
    "1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Mystery Meat",
  ],
  [
    "Fused Hearty Charred Steak",
    "+10 Strength and +20 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Salted Naga Tail, 2 Raw Nightfin Snapper",
  ],
  [
    "Fused Clear-Cut Steak or Savory Steak",
    "Clear-Cut: +15 Str +10 hit. Savory: +10 Str +14 hit, persists through death",
    "Clear-Cut: 1 Cured Savage Meat, 1 Shadowcharred Animated Meat, 2 Giant Egg. Savory: 3 Chimaerok Tenderloin, 2 Essence of Undeath",
  ],
  [
    "Fused Piercing Steak",
    "+8 armor pen and +8 Strength, 1 hr",
    "1 Cured Savage Meat, 1 Salted Naga Tail, 2 Sandworm Meat",
  ],
  [
    "Fused Subtle Steak",
    "10% less threat and +10 Strength, 1 hr",
    "1 Cured Savage Meat, 1 Scorched Silithid Meat, 2 Mystery Meat",
  ],
  [
    "Fused Hearty Steamed Wontons",
    "+20 Intellect and +20 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Shadowcharred Animated Meat, 2 Turtle Meat",
  ],
  [
    "Fused Clear-Cut Wontons or Savory Wontons",
    "Clear-Cut: +18 Int +8 hit. Savory: +10 Int +14 hit",
    "Clear-Cut: 1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Raw Nightfin Snapper. Savory: 3 Turtle Meat, 1 Essence of Water",
  ],
  [
    "Fused Wizard Wontons",
    "+15 Intellect and +10 SP, 1 hr",
    "1 Cured Savage Meat, 1 Salted Naga Tail, 2 Turtle Meat",
  ],
  [
    "Fused Subtle Wontons",
    "10% less threat and +15 Intellect, 1 hr",
    "1 Cured Savage Meat, 1 Salted Naga Tail, 2 Mystery Meat",
  ],
  [
    "Fused Hearty Living Soup",
    "+15 Spirit and +20 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Giant Egg",
  ],
  [
    "Fused Wizard Soup",
    "+12 Spirit and +10 SP, 1 hr",
    "1 Cured Savage Meat, 1 Shadowcharred Animated Meat, 2 Giant Egg",
  ],
  [
    "Fused Seared Chops",
    "+8 haste and +20 AP, 1 hr",
    "1 Cured Savage Meat, 1 Scorched Silithid Meat, 2 Giant Egg",
  ],
  [
    "Fused Seared Wontons",
    "+8 haste and +8 SP, 1 hr",
    "1 Cured Savage Meat, 1 Scorched Silithid Meat, 2 Chimaerok Tenderloin",
  ],
  [
    "Fused Red-Hot Stew",
    "+14 melee crit and +14 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Sandworm Meat",
  ],
  [
    "Fused Blazing Stew",
    "+9 spell crit and +15 Stam, 1 hr (persists through death)",
    "3 Raptor Flesh, 1 Essence of Fire",
  ],
  [
    "Fused Savory Stew",
    "+14 hit and +10 Stam, 1 hr (persists through death)",
    "3 Mystery Meat, 2 Essence of Undeath",
  ],
  [
    "Fused Bold Duck Stew",
    "+10% threat and +12 dodge, 1 hr",
    "1 Cured Savage Meat, 1 Shadowcharred Animated Meat, 2 Turtle Meat",
  ],
  [
    "Fused Bold Simmered Stew",
    "+10% threat and +12 parry, 1 hr",
    "1 Cured Savage Meat, 1 Scorched Silithid Meat, 2 Tender Wolf Meat",
  ],
  [
    "Fused Bold Stew",
    "+10% threat and +20 Stam, 1 hr",
    "1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Sandworm Meat",
  ],
  [
    "Fused Sizzling, Winter, Wild, Blackened, or Mana Imbued Roast",
    "+15 Fire, Frost, Nature, Shadow, or Arcane resist and +20 Stam, 1 hr",
    "Sizzling/Winter: 1 Cured Savage Meat, 1 Shadowcharred Animated Meat, 2 Mystery Meat. Wild/Blackened: 1 Cured Savage Meat, 1 Seared Savage Chimaera Meat, 2 Mystery Meat. Mana Imbued: 1 Cured Savage Meat, 1 Salted Naga Tail, 2 Mystery Meat",
  ],
];

const DISTILLED_FLASK_ROWS: string[][] = [
  [
    "Distilled Flask of the Unyielding",
    "+30 Stamina and +20 defense rating",
    "1 Fiery Frond, 1 Blightroot Extract, 10 Mountain Silversage, 2 Essence of Earth",
  ],
  [
    "Distilled Flask of the Warsong",
    "+20 Strength and +10 armor penetration rating",
    "1 Plague Blossom, 1 Blightroot Extract, 10 Icecap, 2 Essence of Fire",
  ],
  [
    "Distilled Flask of Butchery",
    "+28 Agility and +10 armor penetration rating",
    "1 Fiery Frond, 1 Blightroot Extract, 10 Plaguebloom, 2 Essence of Earth",
  ],
  [
    "Distilled Flask of Savage Assault",
    "+25 haste rating and +55 attack power",
    "1 Storm Brine, 1 Blightroot Extract, 10 Sungrass, 2 Essence of Air",
  ],
  [
    "Distilled Flask of Adept Striking",
    "+10 hit rating and +60 attack power",
    "1 Plague Blossom, 1 Blightroot Extract, 10 Dreamfoil, 2 Essence of Undeath",
  ],
  [
    "Distilled Flask of the Executioner",
    "+14 crit rating and +60 attack power",
    "1 Spectral Rose, 1 Blightroot Extract, 10 Plaguebloom, 2 Essence of Fire",
  ],
  [
    "Distilled Flask of Shattering Thunder",
    "+14 crit rating and +48 spell power",
    "1 Storm Brine, 1 Blightroot Extract, 10 Sungrass, 2 Essence of Air",
  ],
  [
    "Distilled Flask of Unrelenting Power",
    "+10 haste rating and +48 spell power",
    "1 Fiery Frond, 1 Blightroot Extract, 10 Golden Sansam, 2 Essence of Undeath",
  ],
  [
    "Distilled Flask of the Kirin Tor",
    "+20 Intellect and +50 spell power",
    "1 Spectral Rose, 1 Blightroot Extract, 10 Arthas' Tears, 2 Essence of Water",
  ],
  [
    "Distilled Flask of Manifesting Power",
    "+17 Spirit and +53 spell power",
    "1 Spectral Rose, 1 Blightroot Extract, 10 Mountain Silversage, 2 Living Essence",
  ],
  [
    "Distilled Flask of Deep Meditation",
    "+53 spell power and +36 MP5",
    "1 Plague Blossom, 1 Blightroot Extract, 10 Icecap, 2 Essence of Water",
  ],
];

const CLASSIC_FLASK_ROWS: string[][] = [
  [
    "Flask of the Titans",
    "+400 maximum health",
    "7 Gromsblood, 3 Stonescale Oil, 1 Black Lotus, 1 Crystal Vial",
  ],
  [
    "Flask of Supreme Power",
    "+60 spell power",
    "7 Dreamfoil, 3 Mountain Silversage, 1 Black Lotus, 1 Crystal Vial",
  ],
  [
    "Flask of Distilled Wisdom",
    "+65 Intellect",
    "7 Dreamfoil, 3 Icecap, 1 Black Lotus, 1 Crystal Vial",
  ],
  [
    "Flask of Chromatic Resistance",
    "+25 all-school resistance",
    "7 Icecap, 3 Mountain Silversage, 1 Black Lotus, 1 Crystal Vial",
  ],
];

const WEAPON_ROWS: string[][] = [
  [
    "Soldier's Sharpening Stone",
    "+25 armor penetration and +15 resilience, 1 hr, 5 charges",
    "Honor vendor: 500 Honor Points",
  ],
  [
    "Soldier's Iron Grip",
    "50% Disarm reduction and Resilience Rating, 1 hr, 5 charges",
    "Honor vendor: 500 Honor Points",
  ],
  [
    "Soldier's Wizard Oil",
    "+25 spell penetration and +15 resilience, 1 hr, 5 charges",
    "Honor vendor: 500 Honor Points",
  ],
  [
    "Soldier's Sage Oil",
    "20% shorter Silence and Interrupt, +15 resilience, 1 hr, 5 charges",
    "Honor vendor: 500 Honor Points",
  ],
  [
    "Brilliant Wizard Oil",
    "+36 spell power and +14 crit rating, 1 hr, 5 charges",
    "Enchanting 300: 2 Large Brilliant Shard, 3 Firebloom, 1 Imbued Vial",
  ],
  [
    "Brilliant Mana Oil",
    "+16 MP5 and +28 spell power, 1 hr, 5 charges",
    "Enchanting 300: 2 Large Brilliant Shard, 3 Purple Lotus, 1 Imbued Vial",
  ],
  [
    "Elemental Sharpening Stone",
    "+28 crit rating on a melee weapon, 1 hr",
    "Blacksmithing 300: 2 Elemental Earth, 3 Dense Stone",
  ],
  [
    "Dense Sharpening Stone",
    "+8 damage on a sharp weapon, 1 hr",
    "Blacksmithing 250: 1 Dense Stone",
  ],
  [
    "Dense Weightstone",
    "+8 damage on a blunt weapon, 1 hr",
    "Blacksmithing 250: 1 Dense Stone, 1 Runecloth",
  ],
  [
    "Consecrated Sharpening Stone",
    "+170 AP vs undead, 1 hr, not crafted",
    "Argent Dawn Friendly: 8 Necrotic Runes at the Argent Quartermaster",
  ],
  [
    "Blessed Wizard Oil",
    "+100 spell damage vs undead, 1 hr, not crafted",
    "Argent Dawn Friendly: 8 Necrotic Runes at the Argent Quartermaster",
  ],
];

const ZG_ENCHANT_ROWS: string[][] = [
  ["Warrior", "Scarred", "Presence of Might", "+10 Sta, +10 Def Rating, +30 Block Value"],
  ["Paladin", "Scarlet", "Syncretist's Sigil", "+10 Sta, +10 Def Rating, +12 SP"],
  ["Rogue", "Sinister", "Death's Embrace", "+24 AP, +10 Sta, +6 Expertise"],
  ["Hunter", "Tattered", "Falcon's Call", "+24 AP, +10 Sta, +10 Hit"],
  ["Shaman", "Painted", "Vodouisant's Vigilant Embrace", "+15 Int, +13 SP"],
  ["Mage", "Woven", "Presence of Sight", "+18 SP, +8 Hit"],
  ["Warlock", "Runed", "Hoodoo Hex", "+10 Sta, +18 SP"],
  ["Priest", "Hallowed", "Prophetic Aura", "+10 Sta, +15 SP, +10 MP5"],
  ["Druid", "Stitched", "Animist's Caress", "+10 Sta, +10 Int, +12 SP"],
];

export default function CoARaidConsumables() {
  const [category, setCategory] = useCanvasState<Category>(
    "coa-consumables-category",
    "all",
  );
  const active: Category =
    category === "food" ||
    category === "flasks" ||
    category === "weapons" ||
    category === "zg"
      ? category
      : "all";

  const showFood = active === "all" || active === "food";
  const showFlasks = active === "all" || active === "flasks";
  const showWeapons = active === "all" || active === "weapons";
  const showZg = active === "all" || active === "zg";

  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <H1>CoA raid consumables</H1>
        <Text tone="secondary">
          Project Ascension Conquest of Azeroth. Fused High-Risk food is 1 hour; Dirge
          cooking is 30 minutes. Stats from db.exil.es, db.ascension.gg, and in-game
          tooltips. Classic Black Lotus flasks and weapon oils still work.
        </Text>
      </Stack>

      <Grid columns={5} gap={12}>
        <Stat
          value={String(FOOD_SINGLE_ROWS.length + FOOD_COMBO_ROWS.length)}
          label="Food picks"
        />
        <Stat value="11" label="Distilled flasks" />
        <Stat value="4" label="Classic flasks" />
        <Stat value="11" label="Weapon buffs" />
        <Stat value="9" label="Zul'Gurub Enchants" />
      </Grid>

      <Row gap={8} wrap>
        {(
          [
            ["all", "All"],
            ["food", "Food"],
            ["flasks", "Flasks"],
            ["weapons", "Oils and stones"],
            ["zg", "Zul'Gurub Enchants"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            size="sm"
            variant={active === id ? "primary" : "secondary"}
            onClick={() => setCategory(id)}
          >
            {label}
          </Button>
        ))}
      </Row>

      <Callout tone="info" title="Where to learn and buy">
        Dirge Quikcleave in Gadgetzan sells Goblin Spices, Sugar, and Recipe: Azerothian
        Schmorgus Board (20g). Fused recipes come from Arms Dealer quests and dungeon or
        raid drops. Distilled flasks need Alchemy 300 and High-Risk extracts. There is no
        obtainable Imbued food item on CoA (those crafts are deprecated). No Fused food
        combines Agility with crit.
      </Callout>

      {showFood ? (
        <Stack gap={16}>
          <Stack gap={12}>
            <Row gap={8} align="center">
              <H2>Best food per stat</H2>
              <Pill tone="neutral" size="sm">
                Fused 1 hr or Dirge 30 min
              </Pill>
            </Row>
            <Text tone="secondary">
              Fused High-Risk wins most primary stats and lasts an hour. Dirge still wins
              melee haste, spell haste, armor pen, parry, defense, the raid feast, and the
              Fire-proc eel.
            </Text>
            <Table
              headers={["Item", "Well Fed", "Ingredients"]}
              rows={FOOD_SINGLE_ROWS}
              striped
              stickyHeader
            />
          </Stack>
          <Stack gap={12}>
            <Row gap={8} align="center">
              <H2>Best stat combinations</H2>
              <Pill tone="neutral" size="sm">
                Fused hybrids, 1 hr
              </Pill>
            </Row>
            <Text tone="secondary">
              Use these when you want two stats on one Well Fed. Clear-Cut trades hit for
              more of the primary; Savory trades primary for more hit and often persists
              through death.
            </Text>
            <Table
              headers={["Item", "Well Fed", "Ingredients"]}
              rows={FOOD_COMBO_ROWS}
              striped
              stickyHeader
            />
            <Text tone="tertiary" size="small">
              Savory, Blazing, Heightened, and Vibrant persist recipes also show unnamed
              High-Risk meat icons on db.ascension.gg; those pages do not name the meat.
            </Text>
          </Stack>
        </Stack>
      ) : null}

      {showFlasks ? (
        <Stack gap={16}>
          <Stack gap={12}>
            <Row gap={8} align="center">
              <H2>New Ascension flasks</H2>
              <Pill tone="neutral" size="sm">
                Distilled, level 60
              </Pill>
            </Row>
            <Text tone="secondary">
              Counts as both a Battle and Guardian elixir. Every Distilled flask uses 1
              Blightroot Extract plus a High-Risk plant extract, 10 herbs, and 2 essences.
              Savage Assault and Shattering Thunder share the same reagents; craft the one
              you want.
            </Text>
            <Table
              headers={["Item", "Effect", "Ingredients"]}
              rows={DISTILLED_FLASK_ROWS}
              striped
              stickyHeader
            />
            <Text tone="tertiary" size="small">
              All Distilled flasks last 2 hours and persist through death.
            </Text>
          </Stack>

          <Stack gap={12}>
            <Row gap={8} align="center">
              <H2>Classic flasks</H2>
              <Pill tone="neutral" size="sm">
                Alchemy Lab, Black Lotus
              </Pill>
            </Row>
            <Table
              headers={["Item", "Effect", "Ingredients"]}
              rows={CLASSIC_FLASK_ROWS}
              striped
            />
            <Text tone="tertiary" size="small">
              All classic flasks last 2 hours and persist through death.
            </Text>
          </Stack>
        </Stack>
      ) : null}

      {showWeapons ? (
        <Stack gap={12}>
          <H2>Weapon oils and stones</H2>
          <Text tone="secondary">
            Honor vendors sell the Soldier's line for 500 Honor each (level 60, 1 hour,
            5 charges). Classic oils go on caster weapons. Sharpening stones are for swords,
            axes, daggers, and polearms. Weightstones are for maces and staves. Argent Dawn
            items are undead-only and are bought, not crafted.
          </Text>
          <Table
            headers={["Item", "Effect", "Ingredients / source"]}
            rows={WEAPON_ROWS}
            striped
            stickyHeader
          />
        </Stack>
      ) : null}

      {showZg ? (
        <Stack gap={12}>
          <Row gap={8} align="center">
            <H2>Zul'Gurub Enchants</H2>
            <Pill tone="neutral" size="sm">
              Head and legs
            </Pill>
          </Row>
          <Table
            headers={["Class", "Doll", "Enchant", "Stats"]}
            rows={ZG_ENCHANT_ROWS}
            striped
            stickyHeader
          />
        </Stack>
      ) : null}

      <Text tone="tertiary" size="small">
        Sources: db.exil.es, db.ascension.gg, and in-game tooltips. The Project Ascension
        Fandom wiki High-Risk Recipes page is 2021 screenshots and has no CoA food table.
      </Text>
    </Stack>
  );
}
