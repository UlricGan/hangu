import React, { Component } from 'react'

export default class Filter extends Component {

	filterChange({key, type}) {
		const {query, load} = this.props
		query[key] = type
		load(query)
	}

	render() {
		const {query, filters} = this.props
		return (
			<div>
				{Object.keys(filters).map(key => (
					<div key={`${key}`}>
						<h3>{key}</h3>
						<ul>
							<li className={query[key] ? '' : 'selected'} key={`${key}_null`}>
								<a href="javascript:void(0)" onClick={this.filterChange.bind(this, {key, type: null})}>不限</a>
							</li>
							{filters[key].map(type => (
								<li className={query[key] === type? 'selected' : ''} key={`${key}_${type}`}>
									<a href="javascript:void(0)" onClick={this.filterChange.bind(this, {key, type})}>{type}</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		)
	}
}