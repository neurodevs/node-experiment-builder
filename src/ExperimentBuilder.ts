import { assertOptions } from '@sprucelabs/schema'

export default class ExperimentBuilderImpl implements ExperimentBuilder {
    public static Class?: ExperimentBuilderConstructor

    private phases: PhaseProtocol[] = []

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public addPhase(phase: PhaseProtocol) {
        assertOptions({ phase }, ['phase'])
        this.phases.push(phase)
        return this
    }
}

export interface ExperimentBuilder {
    addPhase(phase: PhaseProtocol): this
}

export type ExperimentBuilderConstructor = new () => ExperimentBuilder

export interface PhaseProtocol {
    name: string
}
