
import { expect } from 'chai';
import 'mocha';
import { Component, Base } from '../../lib'

@Component
export class Comp extends Base {
    get computedData(){
        return 'computedData value'
    }

    set computedData(v:any){

    }

}
const CompContext = Comp as any

describe('decorator computed',
    () => {
        it('default', () => {
            expect('function').to.equal(typeof CompContext?.computed?.computedData.get)
            expect('computedData value').to.equal(CompContext.computed.computedData.get())
            expect('function').to.equal(typeof CompContext?.computed?.computedData.set)
        })
    }
)
export default {}
