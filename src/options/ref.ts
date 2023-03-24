import type { Cons } from '../component'
import { type OptionBuilder, applyAccessors } from '../option-builder'
import { obtainSlot } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('ref')!
    if (names) {
        applyAccessors(optionBuilder, (ctx: any) => {
            const data: Map<string, { get: () => any, set: undefined }> = new Map
            names.forEach((value, name) => {
                data.set(name, {
                    get: function (this: any) {
                        return ctx.$refs[name]
                    },
                    set: undefined
                })
            })
            return data
        })
    }
}
