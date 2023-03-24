import { obtainSlot, } from '../utils'
import type { WatchCallback } from 'vue'

export interface WatchConfig {
    key: string
    handler: WatchCallback,
    flush?: 'post',
    deep?: boolean,
    immediate?: boolean,
}
type Option = Omit<WatchConfig, 'handler' | 'key'>
export function decorator(key: string, option?: Option) {
    return function (proto: any, name: string) {
        const slot = obtainSlot(proto)
        const map = slot.obtainMap('watch');
        const opt = Object.assign({}, option ?? {}, {
            key: key,
            handler: proto[name]
        })
        if (map.has(name)) {
            const t = map.get(name)!
            if (Array.isArray(t)) {
                t.push(opt)
            } else {
                map.set(name, [t, opt])
            }
        }
        else {
            map.set(name, opt)
        }
    }
}
