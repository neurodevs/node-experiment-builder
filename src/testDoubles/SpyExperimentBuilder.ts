import ExperimentBuilderImpl from '../ExperimentBuilder'

export default class SpyExperimentBuilder extends ExperimentBuilderImpl {
    public constructor() {
        super()
    }

    public getBiosensors() {
        return this.biosensors
    }

    public getPhases() {
        return this.phases
    }
}
