import type { ComponentPublicInstance } from 'vue'
export { Component, ComponentBase } from './component'
export { decorator as Ref } from './decorators/ref'
export { decorator as Watch } from './decorators/watch'
export { decorator as Prop } from './decorators/props'
export { decorator as Inject } from './decorators/inject'
export { decorator as Emit } from './decorators/emit'
export { decorator as VModel, decorator as Model } from './decorators/vmodel'
export { decorator as Vanilla } from './decorators/vanilla'
export { decorator as Hook } from './decorators/methods-and-hooks'
import type { OptionBuilder } from './option-builder'

const IdentifySymbol = Symbol('vue-facing-decorator-identify')
export interface BaseTypeIdentify {
    [IdentifySymbol]: undefined
}
export function TSX<Properties extends {} = {}, Events extends {} = {}>() {
    type Bundle = Properties & { [index in keyof Events as `on${Capitalize<index & string>}`]: Events[index] extends Function ? Events[index] : { (param: Events[index]): any } }
    return function <C extends VueCons>(cons: C) {
        return cons as unknown as {
            new(): Omit<ComponentPublicInstance<(InstanceType<C>['$props']) & Bundle>, keyof Bundle> & InstanceType<C>//& ComponentPublicInstance & BaseTypeIdentify
        }
    }
}

export type VueCons = {
    new(optionBuilder: OptionBuilder, vueInstance: any): ComponentPublicInstance & BaseTypeIdentify
}

export const Base = class {
    constructor(optionBuilder: OptionBuilder, vueInstance: any) {
        const props = optionBuilder.props
        if (props) {
            Object.keys(props).forEach(key => {
                (this as any)[key] = vueInstance[key]
            })
        }
    }
} as VueCons

export const Vue = Base
