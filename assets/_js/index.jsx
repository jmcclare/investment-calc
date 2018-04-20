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
      <td className="total">$ {Number(props.item[1]).toFixed(2)}</td>
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


class NumField extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    var msg = ''
    if ( this.props.msg ) {
      msg = (
        <span className="error">{' ' + this.props.msg}</span>
      )
    }
    return (
      <p>
        <label htmlFor={this.props.varName}>{this.props.label}:</label>
        <span> </span>
        <input
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
        />
        {msg}
      </p>
    )
  }
}


class VarsForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form className="vars-form">
        <NumField
          name="startingTotal"
          label="Starting Total"
          value={this.props.startingTotal}
          onChange={this.props.onStartingTotalChange}
          msg={this.props.stMsg}
        />
        <NumField
          name="yearlyContrib"
          label="Yearly Contribution"
          value={this.props.yearlyContrib}
          onChange={this.props.onYearlyContribChange}
          msg={this.props.ycMsg}
        />
        <NumField
          name="growthRate"
          label="Growth Rate"
          value={this.props.growthRate}
          onChange={this.props.onGrowthRateChange}
          msg={this.props.growthRateMsg}
        />
        <NumField
          name="years"
          label="Years"
          value={this.props.years}
          onChange={this.props.onYearsChange}
        />
      </form>
    )
  }
}


class ICalc extends React.Component {
  constructor(props) {
    super(props)

    this.handleStartingTotalChange = this.handleStartingTotalChange.bind(this)
    this.handleYearlyContribChange = this.handleYearlyContribChange.bind(this)
    this.handleYearsChange = this.handleYearsChange.bind(this)
    this.handleGrowthRateChange = this.handleGrowthRateChange.bind(this)

    this.state = {
      startingTotal: 0.00,
      stMsg: '',
      growthRate: 0.07,
      grMsg: '',
      spendingRate: 0.035,
      inflationRate: 0.03,
      yearlyContrib: 30000.00,
      ycMsg: '',
      years: 20
    }
  }

  handleStartingTotalChange(amount) {
    this.setState((prevState, props) => {
      // Scrub the input
      var badNum = false
      if ( ! amount ) { badNum = true }
      if (Number.isNaN(Number(amount))) { badNum = true }

      if ( badNum ) {
        return { startingTotal: prevState.startingTotal, stMsg: 'Please enter a number.' }
      } else {
        return { startingTotal: amount, stMsg: '' }
      }
    })
  }

  handleYearlyContribChange(amount) {
    this.setState((prevState, props) => {
      // Scrub the input
      var badNum = false
      if ( ! amount ) { badNum = true }
      if (Number.isNaN(Number(amount))) { badNum = true }

      if ( badNum ) {
        return { yearlyContrib: prevState.yearlyContrib, ycMsg: 'Please enter a number.' }
      } else {
        return { yearlyContrib: amount, ycMsg: '' }
      }
    })
  }

  handleYearsChange(number) {
    this.setState((prevState, props) => {
      // Scrub the input
      const fmtValue = Number(number).toFixed(0)
      debug('in handleYearsChange, fmtValue: ' + fmtValue)
      if (Number.isNaN(fmtValue)) {
        return { years: prevState.years }
      } else {
        return { years: fmtValue }
      }
    })
  }

  handleGrowthRateChange(rate) {
    this.setState((prevState, props) => {
      // Scrub the input
      var badNum = false
      if ( ! rate ) { badNum = true }
      if (Number.isNaN(Number(rate))) { badNum = true }

      if ( badNum ) {
        return { growthRate: prevState.growthRate, grMsg: 'Please enter a number.' }
      } else {
        return { growthRate: rate, grMsg: '' }
      }

    })
  }

  render() {
    var data = calcData(this.state)
    return (
      <div className="icalc">
        <VarsForm
          startingTotal={this.state.startingTotal}
          stMsg={this.state.stMsg}
          onStartingTotalChange={this.handleStartingTotalChange}
          yearlyContrib={this.state.yearlyContrib}
          ycMsg={this.state.ycMsg}
          onYearlyContribChange={this.handleYearlyContribChange}
          years={this.state.years}
          onYearsChange={this.handleYearsChange}
          growthRate={this.state.growthRate}
          onGrowthRateChange={this.handleGrowthRateChange}
          growthRateMsg={this.state.grMsg}
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
  var yearlyContrib = Number(params.yearlyContrib)
  debug('in calcData, params.yearlyContrib: ' + params.yearlyContrib)
  debug('in calcData, yearlyContrib: ' + yearlyContrib)
  debug('in calcData, params.years: ' + params.years)
  for (var i = 0; i <= params.years; i++) {
    data.push([i, total])
    total = total * (1 + params.growthRate) + yearlyContrib
  }
  return data
}


export default ICalc
