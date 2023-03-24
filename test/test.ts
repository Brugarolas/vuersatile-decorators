require('jsdom-global/keys.js').push('SVGElement')
require('jsdom-global')()
import './internal/utils.spec'
import './component.spec'
import './option/data.spec'
import './option/methods.spec'
import './option/computed.spec'
import './option/emit.spec'
import './option/ref.spec'
import './option/props.spec'
import './option/watch.spec'
import './option/inject.spec'
import './option/vmodel.spec'
import './option/accessor.spec'
import './feature/hooks.spec'
import './feature/classExtends.spec'
import './feature/componentExtends.spec'
import './feature/extends.spec'


import './tsx/attributeTypes'
