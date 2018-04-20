import React from 'react'
import ReactDOM from 'react-dom'


var Row = function(props) {
  return (
    <tr>
      <td className="year">{props.item[0]}</td>
      <td className="total">$ {(props.item[1]).toFixed(2)}</td>
    </tr>
  )
}


class Table extends React.Component {
  render() {

    const rows = this.props.data.map(item => {
      return (
        <Row key={item[0]} item={item} />
      )
    })

    return (
      <div className="financial-results">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}


class ICalc extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startingTotal: 0.00,
      growthRate: 0.07,
      spendingRate: 0.035,
      inflationRate: 0.03,
      yearlyContribution: 30000.00,
      years: 10
    }
  }

  render() {
    var data = calcData(this.state)
    return (
      <div className="icalc">
        <Table
          data={data}
        />
      </div>
    )
  }
}


var calcData = function(params) {
  var data = []
  var total = params.startingTotal
  for (var i = 0; i <= params.years; i++) {
    data.push([i, total])
    total = total * (1 + params.growthRate) + params.yearlyContribution
  }
  return data
}


export default ICalc
