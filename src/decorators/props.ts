import { obtainSlot, optoinNullableMemberDecorator } from '../utils'

export interface PropsConfig {
    type?: any
    required?: boolean
    default?: any
    validator?(value: any): boolean;
}

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: PropsConfig) {
    const slot = obtainSlot(proto)
    const map = slot.obtainMap('props')
    const opt = Object.assign({}, option ?? {})
    map.set(name, opt as PropsConfig)
});
