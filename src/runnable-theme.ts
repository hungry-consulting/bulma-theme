import { toColorString, evaluate, invertColor } from './helpers'
import { makeBasicTheme, InjectedMethods, BulmaTheme } from './__generated__/theme'
import { reader, asks, Reader } from 'fp-ts/lib/Reader'

export const resolvers: InjectedMethods = {
  color: toColorString,
  findColorInvert: invertColor,
  evaluate,
}
export type RunnableTheme = Reader<InjectedMethods, BulmaTheme>

// INFO: could ap here to avoid such currying but this chain is more meaningful
export const theme: Reader<InjectedMethods, BulmaTheme> =
  reader
    .of<InjectedMethods, Partial<BulmaTheme>>({})
    .chain(input => 
      asks(methods =>
        makeBasicTheme(methods)(input))) 

export const defaultTheme = theme.run(resolvers)

export const zLayers = {
  dropdown: defaultTheme.dropdownContentZ,
  modal: defaultTheme.modalZ,
  navbarDropdown: defaultTheme.navbarDropdownZ,
  navbarFixed: defaultTheme.navbarFixedZ,
  navbar: defaultTheme.navbarZ,
}

export type ThemeOverriding = (theme: BulmaTheme) => BulmaTheme