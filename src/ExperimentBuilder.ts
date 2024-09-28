import { assertOptions } from '@sprucelabs/schema'

export default class ExperimentBuilderImpl implements ExperimentBuilder {
    public static Class?: ExperimentBuilderConstructor

    protected phases: PhaseProtocol[] = []

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public addPhase(phase: PhaseProtocol) {
        assertOptions({ phase }, ['phase'])
        this.phases.push(phase)
        return this
    }

    public addBiosensor(biosensor: Biosensor) {
        assertOptions({ biosensor }, ['biosensor'])
        return this
    }
}

export interface ExperimentBuilder {
    addPhase(phase: PhaseProtocol): this
    addBiosensor(biosensor: Biosensor): this
}

export type ExperimentBuilderConstructor = new () => ExperimentBuilder

export interface PhaseProtocol {
    name: string
}

export interface Biosensor {}
