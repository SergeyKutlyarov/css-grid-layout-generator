import path from 'path'

export const root = path.resolve(__dirname, '..')

export const src = path.resolve(root, 'src')
export const dist = path.resolve(root, 'dist')
export const assets = path.resolve(root, 'assets')
export const pathPackage = path.resolve(root, 'package.json')

export const publicAssets = path.resolve(assets, 'public')
export const indexHtml = path.resolve(assets, 'index.ejs')

export const entryApp = path.resolve(src, '_shell/index.ts')
export const scssModules = path.resolve(src, '_generic/scss-modules')
