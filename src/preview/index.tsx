import { Atom, classes, F, lift, reactiveList } from '@grammarly/focal'
import cc from 'classcat'
import * as React from 'react'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { colsLength$, grid$, rowsLength$ } from '../grid/state'
import { itemsReversed$ } from '../items/state'
import { css$, cssHighlighter$ } from './state'
const $ = require('./style.scss')

const CSS = lift(({ css, cssHighlighter }: { css: string; cssHighlighter: string }) => (
	<style type="text/css" dangerouslySetInnerHTML={{ __html: css + cssHighlighter }} />
))

const DIV = ':'
const guides$ = Atom.combine(colsLength$, rowsLength$, (cols, rows) => {
	const res: string[] = []
	for (let colIndex = 0; colIndex < cols; colIndex++) {
		for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
			res.push(colIndex + DIV + rowIndex)
		}
	}
	return res
})

const isGrowClass$ = grid$.view(({ isGrow }) => isGrow && ($.flexed as string))
const renderGuides$ = grid$.view('isGuided').pipe(
	switchMap<boolean, JSX.Element>((isGuided) => {
		if (isGuided) {
			return reactiveList(guides$, (st) => {
				const [px, py] = st.split(DIV)
				const x = Number(px) + 1
				const y = Number(py) + 1
				return (
					<div key={st} className={$.guide} style={{ gridColumnStart: x, gridRowStart: y }} />
				)
			})
		} else {
			return of(null)
		}
	})
)

export const Preview = () => {
	return (
		<>
			<CSS css={css$} cssHighlighter={cssHighlighter$} />
			<F.div {...classes($.preview, isGrowClass$)}>
				<F.div className={cc(['container', $.container])}>
					{renderGuides$}
					{itemsReversed$.map((items) =>
						items.map(({ id, name, color, characters }) => (
							<div key={id} className={cc([name, $.item])} style={{ background: color }}>
								{characters}
							</div>
						))
					)}
				</F.div>
			</F.div>
		</>
	)
}
