import type { EntityContainer } from "../entityContainer"

export type Converter = {
    input?: EntityContainer | EntityContainer[],
    output?: EntityContainer
}