export const availableRaces = ["Caylion", "Faderan", "Kt'zr'kt'rtl", "Kjasjavikalimm"] as const;
export type RaceType = typeof availableRaces[number];

export type RaceInfo = {
    name: RaceType;
    image: string;
    color: string;
}
const colorMap: Record<RaceType, string> = {
    Caylion: "#1ad624",
    Faderan: "rgb(200, 231, 75)",
    "Kt'zr'kt'rtl": "rgb(221, 137, 58)",
    Kjasjavikalimm: "rgb(177, 43, 43)"
}
export const raceInfo: RaceInfo[] = availableRaces.map(race => ({
    name: race,
    image: `/images/races/${race}.webp`,
    color: colorMap[race]
}))