import { obtainSlot, optoinNullableMemberDecorator } from '../utils'
export type EmitConfig = null | string

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, key?: string) {
    const slot = obtainSlot(proto);
    const map = slot.obtainMap('emit');
    map.set(name, typeof key === 'undefined' ? null : key)
});
