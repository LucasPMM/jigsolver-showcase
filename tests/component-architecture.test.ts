import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const componentFiles = (directory: string): Array<string> =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory()
      ? componentFiles(path)
      : /\.tsx?$/.test(path)
        ? [path]
        : []
  })

describe('shared UI boundaries', () => {
  it('keeps control flow free of else branches', () => {
    const violations: Array<string> = []
    for (const path of componentFiles('src')) {
      const source = ts.createSourceFile(
        path,
        readFileSync(path, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
        path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
      )
      const visit = (node: ts.Node) => {
        if (ts.isIfStatement(node) && node.elseStatement) {
          violations.push(relative('.', path))
        }
        ts.forEachChild(node, visit)
      }
      visit(source)
    }
    expect(violations).toEqual([])
  })
  it('keeps native typography, navigation, and media tags inside their primitives', () => {
    const allowed: Record<string, string> = {
      span: 'Text',
      p: 'Text',
      h1: 'Text',
      h2: 'Text',
      h3: 'Text',
      h4: 'Text',
      h5: 'Text',
      h6: 'Text',
      strong: 'Text',
      small: 'Text',
      em: 'Text',
      figcaption: 'Text',
      a: 'Pressable',
      button: 'Pressable',
      img: 'Image',
      video: 'Video'
    }
    const violations: Array<string> = []
    for (const path of [
      ...componentFiles('src/components'),
      ...componentFiles('src/app')
    ]) {
      const source = ts.createSourceFile(
        path,
        readFileSync(path, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      )
      const visit = (node: ts.Node) => {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tag = node.tagName.getText(source)
          if (
            allowed[tag] &&
            !path.endsWith(`ui/${allowed[tag]}/${allowed[tag]}.tsx`)
          ) {
            violations.push(`${relative('.', path)}: ${tag}`)
          }
        }
        ts.forEachChild(node, visit)
      }
      visit(source)
    }
    expect(violations).toEqual([])
  })
  it('uses the shared media components in both ordinary and expanded displays', () => {
    expect(
      readFileSync('src/components/media/InlineVideo/InlineVideo.tsx', 'utf8')
    ).toContain('<Video')
    expect(
      readFileSync('src/components/media/MediaDialog/MediaDialog.tsx', 'utf8')
    ).toContain('<Video')
    expect(
      readFileSync(
        'src/components/sections/Photographed/Photographed.tsx',
        'utf8'
      )
    ).toContain('<Image')
    expect(
      readFileSync('src/components/ui/GitHubAvatar/GitHubAvatar.tsx', 'utf8')
    ).toContain('<Image')
  })
})
