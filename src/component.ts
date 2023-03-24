import { defineComponent, type ComponentCustomOptions } from 'vue';
import { obtainSlot, getSuperSlot } from './utils'
import { build as optionComputed } from './options/computed'
import { build as optionData } from './options/data'
import { build as optionMethodsAndHooks } from './options/methods-and-hooks'
import { build as optionRef } from './options/ref'
import { build as optionWatch } from './options/watch'
import { build as optionProps } from './options/props'
import { build as optionInject } from './options/inject'
import { build as optionEmit } from './options/emit'
import { build as optionVModel } from './options/vmodel'
import { build as optionAccessor } from './options/accessor'
import type { OptionBuilder } from './option-builder'
import type { VueCons } from './index'
export type Cons = VueCons

// export interface Cons { new(): any, prototype: any }
function ComponentOption(cons: Cons, extend?: any) {

    const optionBuilder: OptionBuilder = {}
    optionVModel(cons, optionBuilder)
    optionComputed(cons, optionBuilder)//after VModel
    optionWatch(cons, optionBuilder)
    optionProps(cons, optionBuilder)
    optionInject(cons, optionBuilder)
    optionEmit(cons, optionBuilder)
    optionRef(cons, optionBuilder)//after Computed
    optionMethodsAndHooks(cons, optionBuilder)//after Ref Computed
    optionAccessor(cons, optionBuilder)
    const raw = {
        data() {
            delete optionBuilder.data
            optionData(cons, optionBuilder, this)
            return optionBuilder.data ?? {}
        },
        methods: optionBuilder.methods,
        computed: optionBuilder.computed,
        watch: optionBuilder.watch,
        props: optionBuilder.props,
        inject: optionBuilder.inject,
        ...optionBuilder.hooks,
        extends: extend
    }
    return raw as any
}

type ComponentOption = {
    name?: string
    emits?: string[]
    provide?: Record<string, any> | Function
    components?: Record<string, any>
    directives?: Record<string, any>;
    inheritAttrs?: boolean;
    expose?: string[];
    render?: Function;
    modifier?: (raw: any) => any
    options?: ComponentCustomOptions & Record<string, any>
    template?: string
    mixins?: any[]
}
type ComponentConsOption = Cons | ComponentOption
function buildComponent(cons: Cons, arg: ComponentOption, extend?: any): any {
    const option = ComponentOption(cons, extend)
    const slot = obtainSlot(cons.prototype)
    Object.keys(arg).reduce<Record<string, any>>((option, name: string) => {
        if (['options', 'modifier', 'emits'].includes(name)) {
            return option
        }
        option[name] = arg[name as keyof ComponentOption]
        return option
    }, option)
    let emits = Array.from(slot.obtainMap('emits').keys())
    if (Array.isArray(arg.emits)) {
        emits = Array.from(new Set([...emits, ...arg.emits]))
    }
    option.emits = emits

    if (arg.options) {
        Object.assign(option, arg.options)
    }
    if (arg.modifier) {
        arg.modifier(option)
    }
    return defineComponent(option)
}
function build(cons: Cons, option: ComponentOption) {
    const slot = obtainSlot(cons.prototype)
    slot.inComponent = true
    const superSlot = getSuperSlot(cons.prototype)
    if (superSlot) {
        if (!superSlot.inComponent) {
            throw 'Class should be decorated by Component or ComponentBase: ' + slot.master
        }
        if (superSlot.cachedVueComponent === null) {
            throw 'Component decorator 1'
        }
    }
    const component = buildComponent(cons, option, superSlot === null ? undefined : superSlot.cachedVueComponent)
    component.__vfdConstructor = cons
    slot.cachedVueComponent = component

}
function _Component(arg: ComponentConsOption, cb: (cons: Cons, option: ComponentOption) => any) {
    if (typeof arg === 'function') {
        return cb(arg, {})
    }
    return function (cons: Cons) {
        return cb(cons, arg)
    }
}
export function ComponentBase(arg: ComponentConsOption): any {
    return _Component(arg, function (cons: Cons, option: ComponentOption) {
        build(cons, option)
        return cons
    })
}

export function Component(arg: ComponentConsOption): any {
    return _Component(arg, function (cons: Cons, option: ComponentOption) {
        build(cons, option)
        // const slot = getSlot(cons.prototype)!
        // Object.defineProperty(cons, '__vccOpts', {
        //     value: slot.cachedVueComponent
        // })
        // console.log('kkkk', '__vccOpts' in cons, cons)
        // return cons
        return obtainSlot(cons.prototype).cachedVueComponent
    })
}
