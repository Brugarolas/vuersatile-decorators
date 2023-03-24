import { obtainSlot, optoinNullableMemberDecorator } from '../utils'
import { decorator as PropsDecorator, type PropsConfig } from './props'

export type VModelConfig = PropsConfig & {
    name?: string
}

export const decorator = optoinNullableMemberDecorator(function (proto: any, name: string, option?: VModelConfig) {
    option ??= {}
    const slot = obtainSlot(proto)
    let vmodelName = 'modelValue'
    const propsConfig = { ...option }
    if (propsConfig) {
        vmodelName = propsConfig.name ?? vmodelName
        delete propsConfig.name
    }
    PropsDecorator(propsConfig)(proto, vmodelName)
    const map = slot.obtainMap('v-model')
    map.set(name, option)
})
