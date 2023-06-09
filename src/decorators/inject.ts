import { obtainSlot, optoinNullableMemberDecorator } from '../utils'

export interface InjectConfig {
    from?: string | symbol
    default?: any
}

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: InjectConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('inject')
    const opt = Object.assign({}, option ?? {})
    map.set(name, opt)
});
