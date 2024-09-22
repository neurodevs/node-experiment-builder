import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
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
    protected static async throwsWithMissingRequiredOptions() {
        const err = assert.doesThrow(() => {
            // @ts-ignore
            this.instance.addPhase()
        })

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['protocol'],
        })
    }

    @test()
    private static ExperimentBuilder() {
        return ExperimentBuilderImpl.Create()
    }
}
