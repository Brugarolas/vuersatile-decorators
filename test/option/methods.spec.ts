
import { expect } from 'chai';
import 'mocha';
import { Component, Ref, Base } from '../../lib'

@Component
export class Comp extends Base {
    method() {
        return 'method value'
    }

}
const CompContext = Comp as any

describe('option methods',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.methods?.method)
            expect('method value').to.equal(CompContext.methods.method())
        })
    }
)
export default {}
