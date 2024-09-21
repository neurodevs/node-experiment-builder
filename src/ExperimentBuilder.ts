export default class ExperimentBuilderImpl implements ExperimentBuilder {
    public static Class?: ExperimentBuilderConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public addPhase(_name: string, _callback: () => void) {}
}

export interface ExperimentBuilder {
    addPhase(name: string, callback: () => void): void
}

export type ExperimentBuilderConstructor = new () => ExperimentBuilder
