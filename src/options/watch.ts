import type { Cons } from '../component'
import type { OptionBuilder } from '../option-builder'
import { obtainSlot, } from '../utils'

export function build(cons: Cons, optionBuilder: OptionBuilder) {
    optionBuilder.watch ??= {}
    const slot = obtainSlot(cons.prototype)
    const names = slot.obtainMap('watch')
    if (names) {
        names.forEach((value, _name) => {
            const values = Array.isArray(value) ? value : [value]
            values.forEach(v => {
                if (!optionBuilder.watch![v.key]) {
                    optionBuilder.watch![v.key] = v
                } else {
                    const t = optionBuilder.watch![v.key]
                    if (Array.isArray(t)) {
                        t.push(v)
                    } else {
                        optionBuilder.watch![v.key] = [t, v]
                    }
                }
            })
        })
    }
}
