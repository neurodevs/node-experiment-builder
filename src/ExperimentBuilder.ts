export default class ExperimentBuilderImpl implements ExperimentBuilder {
    public static Class?: ExperimentBuilderConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public addPhase(_name: string) {}
}

export interface ExperimentBuilder {
    addPhase(name: string): void
}

export type ExperimentBuilderConstructor = new () => ExperimentBuilder
