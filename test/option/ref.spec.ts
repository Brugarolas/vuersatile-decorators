
import { expect } from 'chai';
import 'mocha';
import { Component, Ref, Base } from '../../lib'

@Component
export class Comp extends Base {
    @Ref
    readonly refName!: any

}
const CompContext = Comp as any

describe('decorator Ref',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.beforeCreate)
        })
    }
)

export default {}
