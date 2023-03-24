import type { Cons } from '../component'
import type { OptionBuilder } from '../option-builder'
import { obtainSlot } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.inject ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('inject')
    if (names) {
        names.forEach((value, name) => {
            optionBuilder.inject![name] = value
        })
    }
}
