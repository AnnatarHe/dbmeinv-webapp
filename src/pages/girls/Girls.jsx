import React from 'react'
import Nav from '../../components/Nav'
import { graphql, gql } from 'react-apollo'

class Girls extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  changeCategory = src => {
    if (this.props.loading) {
      return
    }
    this.props.loadNewCategories(src)
  }

  scrollHandle = () => {
    if (this.props.loading) {
      return
    }
    this.props.loadMore()
  }

  render() {
    const { categories, girls } = this.props
    // TODO: add girls
    return (
      <div>
        <Nav categories={categories || []} onChange={this.changeCategory} />

      </div>
    )
  }
}

const query = gql`
  query fetchGirls($from: Int!, $take: Int!, $offset: Int!) {
    girls(from: $from, take: $take, offset: $offset) {
      id, img, text
    },
    categories {
      id, name, src
    }
  }
`

export default graphql(query, {
  options: props => ({
    variables: {
      from: 0, take: 20, offset: 0
    },
    fetchPolicy: 'cache-and-network'
  }),
  props({ data: { categories, girls, loading, fetchMore, variables } }) {
    return {
      categories,
      girls,
      loading,
      loadMore() {
        return fetchMore({
          query,
          variables: {
            from: variables.from, take: variables.take, offset: girls.length
          },
          updateQuery: (pResult, { fetchMoreResult }) => {
            return {
              girls: pResult.girls.concat(fetchMoreResult.girls)
            }
          }
        })
      },
      loadNewCategories(from) {
        return fetchMore({
          query,
          variables: {
            from , take: variables.take, offset: 0
          },
          updateQuery(pResult, { fetchMoreResult }) {
            return {
              variables: { ...variables, from, offset: 20 },
              girls: fetchMoreResult.girls
            }
          }
        })
      }

    }
  }
})(Girls)

