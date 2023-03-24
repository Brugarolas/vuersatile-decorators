import type { WatchConfig } from './decorators/watch'
import type { PropsConfig } from './decorators/props'
import type { InjectConfig } from './decorators/inject'

export interface OptionBuilder {
    name?: string
    data?: Record<string, any>
    methods?: Record<string, Function>
    hooks?: Record<string, Function>
    computed?: Record<string, any>
    watch?: Record<string, WatchConfig | WatchConfig[]>
    props?: Record<string, PropsConfig>
    inject?: Record<string, InjectConfig>
    beforeCreateCallbacks?: Function[]
}

export function applyAccessors(optionBuilder: OptionBuilder, dataFunc: (ctx: any) => Map<string, { get: (() => any) | undefined, set: ((v: any) => any) | undefined }>) {
    optionBuilder.beforeCreateCallbacks ??= []
    optionBuilder.beforeCreateCallbacks.push(function (this: any) {
        const ctx = this
        const data = dataFunc(ctx)
        data.forEach((v, n) => {
            Object.defineProperty(ctx, n, v)
        })
    })
}
