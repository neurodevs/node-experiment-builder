import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import ExperimentBuilderImpl, { PhaseProtocol } from '../../ExperimentBuilder'

export default class ExperimentBuilderTest extends AbstractSpruceTest {
    private static instance: SpyExperimentBuilder
    private static readonly testPhase: PhaseProtocol = { name: generateId() }

    protected static async beforeEach() {
        await super.beforeEach()

        ExperimentBuilderImpl.Class = SpyExperimentBuilder

        this.instance = this.ExperimentBuilder()
    }

    @test()
    protected static async canCreateExperimentBuilder() {
        assert.isTruthy(this.instance)
    }

    @test()
    protected static async addPhaseThrowsWithMissingRequiredOptions() {
        const err = assert.doesThrow(() => {
            // @ts-ignore
            this.instance.addPhase()
        })

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['phase'],
        })
    }

    @test()
    protected static async addPhaseReturnsThis() {
        const instance = this.addPhase()

        assert.isEqualDeep(
            instance,
            this.instance,
            'addPhase should return this to allow chaining of method calls!'
        )
    }

    @test()
    protected static async addsPhaseToPhases() {
        this.addPhase()

        const phases = this.instance.getPhases()
        assert.isEqualDeep(phases, [this.testPhase])
    }

    @test()
    protected static async canAddMultiplePhases() {
        const phase1: PhaseProtocol = { name: generateId() }
        const phase2: PhaseProtocol = { name: generateId() }

        this.addPhase(phase1)
        this.addPhase(phase2)

        const phases = this.instance.getPhases()
        assert.isEqualDeep(phases, [phase1, phase2])
    }

    @test()
    protected static async addBiosensorThrowsWithMissingRequiredOptions() {
        const err = assert.doesThrow(() => {
            // @ts-ignore
            this.instance.addBiosensor()
        })

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['biosensor'],
        })
    }

    private static addPhase(phase?: PhaseProtocol) {
        return this.instance.addPhase(phase ?? this.testPhase)
    }

    private static ExperimentBuilder() {
        return ExperimentBuilderImpl.Create() as SpyExperimentBuilder
    }
}

class SpyExperimentBuilder extends ExperimentBuilderImpl {
    public constructor() {
        super()
    }

    public getPhases() {
        return this.phases
    }
}
