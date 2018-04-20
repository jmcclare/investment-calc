import React from 'react'
import ReactDOM from 'react-dom'


var enableDebug
enableDebug = true

var debug = function(msg) {
  if ( enableDebug == true ) {
    console.log(msg)
  }
}


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


class VarsForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleYearlyContribChange = this.handleYearlyContribChange.bind(this)
  }

  handleYearlyContribChange(e) {
    this.props.onYearlyContribChange(e.target.value);
  }

  render() {
    const handleYearlyContribChange = this.handleYearlyContribChange
    return (
      <form className="vars-form">
        <p>
          <label htmlFor="yearlycontrib">Yearly Contribution:</label>
          <span> </span>
          <input
            name="yearlycontrib"
            value={this.props.yearlyContrib}
            onChange={handleYearlyContribChange}
          />
        </p>
      </form>
    )
  }
}


class ICalc extends React.Component {
  constructor(props) {
    super(props)

    this.handleYearlyContribChange = this.handleYearlyContribChange.bind(this)

    this.state = {
      startingTotal: 0.00,
      growthRate: 0.07,
      spendingRate: 0.035,
      inflationRate: 0.03,
      yearlyContrib: 30000.00,
      years: 10
    }
  }

  handleYearlyContribChange(amount) {
    this.setState((prevState, props) => {
      // Scrub the input
      const fmtValue = Number(amount)
      if (Number.isNaN(fmtValue)) {
        return { yearlyContrib: prevState.yearlyContrib }
      } else {
        return { yearlyContrib: fmtValue }
      }
    })
  }

  render() {
    var data = calcData(this.state)
    return (
      <div className="icalc">
        <VarsForm
          yearlyContrib={this.state.yearlyContrib}
          onYearlyContribChange={this.handleYearlyContribChange}
        />
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
  debug('in calcData, params.yearlyContrib: ' + params.yearlyContrib)
  for (var i = 0; i <= params.years; i++) {
    data.push([i, total])
    total = total * (1 + params.growthRate) + params.yearlyContrib
  }
  return data
}


export default ICalc
