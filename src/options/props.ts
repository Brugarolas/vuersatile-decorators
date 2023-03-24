import type { Cons } from '../component'
import type { OptionBuilder } from '../option-builder'
import { obtainSlot } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.props ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('props')

    if (names) {
        names.forEach((value, name) => {
            optionBuilder.props![name] = value
        })
    }
}
