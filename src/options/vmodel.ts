import type { Cons } from '../component'
import type { OptionBuilder } from '../option-builder'
import { obtainSlot } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.computed ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('v-model')!
    if (names && names.size > 0) {
        names.forEach((value, name) => {
            const vmodelName = (value && value.name) ?? 'modelValue'
            optionBuilder.computed![name] = {
                get: function (this: any) {
                    return this[vmodelName]
                },
                set: function (val: any) {
                    this.$emit(`update:${vmodelName}`, val)
                }
            }
        })
    }
}
