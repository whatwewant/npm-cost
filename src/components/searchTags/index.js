/**
 * @Author: eason
 * @Date:   2017-06-17T15:49:18+08:00
 * @Last modified by:   eason
 * @Last modified time: 2017-06-17T15:58:07+08:00
 */



import { h, Component } from 'preact'
import cx from 'classnames'

import style from './style'

export default class SearchTags extends Component {
  state = {
    recents: [],
  }

  componentDidMount() {
    fetch(`http://npm-cost-service.herokuapp.com/recent?limit=4`)
      .then(result => {
        if (result.ok) {
          result.json()
            .then(json => {
              this.setState({ recents: Object.keys(json) })
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { recents } = this.state
    const { onSelect } = this.props

    return (
      <div className={ cx(style.searchTagsWrap, { [style.searchTagsWrapVisible]: !!recents.length})  }>
          <h4> Recent searches: </h4>
        <ul className={ style.searchTagsContainer }>
          {
            recents.map(recent => (
              <li
                key={ recent }
                tabIndex="0"
                className={ style.searchTag }
                onClick={ () => onSelect(recent) }
              >
                { recent }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
