import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import ExperimentBuilderImpl, {
    ExperimentBuilder,
} from '../../ExperimentBuilder'

export default class ExperimentBuilderTest extends AbstractSpruceTest {
    private static instance: ExperimentBuilder

    protected static async beforeEach() {
        await super.beforeEach()
        this.instance = this.ExperimentBuilder()
    }

    @test()
    protected static async canCreateExperimentBuilder() {
        assert.isTruthy(this.instance)
    }

    @test()
    protected static async canCallAddPhase() {
        this.instance.addPhase({ name: 'phase1' })
    }

    private static ExperimentBuilder() {
        return ExperimentBuilderImpl.Create()
    }
}
