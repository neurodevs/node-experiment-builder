import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import ExperimentBuilderImpl, {
    Biosensor,
    PhaseProtocol,
} from '../../ExperimentBuilder'
import SpyExperimentBuilder from '../../testDoubles/SpyExperimentBuilder'

export default class ExperimentBuilderTest extends AbstractSpruceTest {
    private static instance: SpyExperimentBuilder
    private static readonly testPhase: PhaseProtocol = { name: generateId() }
    private static readonly testBiosensor: Biosensor = {}

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
    protected static async addBiosensorThrowsWithMissingRequiredOptions() {
        const err = assert.doesThrow(() => {
            // @ts-ignore
            this.instance.addBiosensor()
        })

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['biosensor'],
        })
    }

    @test()
    protected static async addBiosensorReturnsThis() {
        const instance = this.addBiosensor()

        assert.isEqualDeep(
            instance,
            this.instance,
            'addBiosensor should return this to allow chaining of method calls!'
        )
    }

    @test()
    protected static async addsBiosensorToBiosensors() {
        this.addBiosensor()

        const biosensors = this.instance.getBiosensors()
        assert.isEqualDeep(biosensors, [this.testBiosensor])
    }

    @test()
    protected static async canAddMultipleBiosensors() {
        const biosensor1: Biosensor = {}
        const biosensor2: Biosensor = {}

        this.addBiosensor(biosensor1)
        this.addBiosensor(biosensor2)

        const biosensors = this.instance.getBiosensors()
        assert.isEqualDeep(biosensors, [biosensor1, biosensor2])
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

    private static addBiosensor(biosensor?: Biosensor) {
        return this.instance.addBiosensor(biosensor ?? this.testBiosensor)
    }

    private static addPhase(phase?: PhaseProtocol) {
        return this.instance.addPhase(phase ?? this.testPhase)
    }

    private static ExperimentBuilder() {
        return ExperimentBuilderImpl.Create() as SpyExperimentBuilder
    }
}
