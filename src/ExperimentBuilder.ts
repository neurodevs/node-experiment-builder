import { assertOptions } from '@sprucelabs/schema'

export default class ExperimentBuilderImpl implements ExperimentBuilder {
    public static Class?: ExperimentBuilderConstructor

    protected biosensors: Biosensor[] = []
    protected phases: PhaseProtocol[] = []

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public addBiosensor(biosensor: Biosensor) {
        assertOptions({ biosensor }, ['biosensor'])
        this.biosensors.push(biosensor)
        return this
    }

    public addPhase(phase: PhaseProtocol) {
        assertOptions({ phase }, ['phase'])
        this.phases.push(phase)
        return this
    }
}

export interface ExperimentBuilder {
    addBiosensor(biosensor: Biosensor): this
    addPhase(phase: PhaseProtocol): this
}

export type ExperimentBuilderConstructor = new () => ExperimentBuilder

export interface Biosensor {}

export interface PhaseProtocol {
    name: string
}
