import { assertOptions } from '@sprucelabs/schema'

export default class ExperimentBuilderImpl implements ExperimentBuilder {
    public static Class?: ExperimentBuilderConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public addPhase(protocol: PhaseProtocol) {
        assertOptions({ protocol }, ['protocol'])
    }
}

export interface ExperimentBuilder {
    addPhase(protocol: PhaseProtocol): void
}

export type ExperimentBuilderConstructor = new () => ExperimentBuilder

export interface PhaseProtocol {
    name: string
}
