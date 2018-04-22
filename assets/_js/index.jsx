import React from 'react'
import ReactDOM from 'react-dom'


// Set this to true to enable debugging output.
const enableDebug = true

const debug = function(msg) {
  if ( enableDebug === true ) {
    console.log(msg)
  }
}


var Row = function(props) {
  return (
    <tr>
      <td className="year">{props.item[0]}</td>
      <td className="total">$ {commaFmt(props.item[1])}</td>
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
    var err = ''
    if ( this.props.err ) {
      err = (
        <span className="error">{' ' + this.props.err}</span>
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
        {err}
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
          err={this.props.stErr}
        />
        <NumField
          name="yearlyContrib"
          label="Yearly Contribution"
          value={this.props.yearlyContrib}
          onChange={this.props.onYearlyContribChange}
          err={this.props.ycErr}
        />
        <NumField
          name="growthRate"
          label="Growth Rate"
          value={this.props.growthRate}
          onChange={this.props.onGrowthRateChange}
          err={this.props.growthRateErr}
        />
        <NumField
          name="years"
          label="Years"
          value={this.props.years}
          onChange={this.props.onYearsChange}
          err={this.props.yearsErr}
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
      stErr: '',
      growthRate: 0.07,
      grErr: '',
      spendingRate: 0.035,
      inflationRate: 0.03,
      yearlyContrib: 30000.00,
      ycErr: '',
      years: 20,
      yearsErr: ''
    }
  }

  handleStartingTotalChange(input) {
    this.setState((prevState, props) => {
      // Check the input
      var err = ''
      if ( ! input ) { err = 'Please enter a number.' }
      if (Number.isNaN(Number(input))) { err = 'Please enter a number.' }

      return { startingTotal: input, stErr: err }
    })
  }

  handleYearlyContribChange(input) {
    this.setState((prevState, props) => {
      // Check the input
      var err = ''
      if ( ! input ) { err = 'Please enter a number.' }
      if (Number.isNaN(Number(input))) { err = 'Please enter a number.' }

      return { yearlyContrib: input, ycErr: err }
    })
  }

  handleYearsChange(input) {
    this.setState((prevState, props) => {
      // Check the input
      var err = ''
      if ( ! input ) { err = 'Please enter a number.' }
      if (Number.isNaN(Number(input))) { err = 'Please enter a number.' }

      return { years: input, yearsErr: err }
    })
  }

  handleGrowthRateChange(input) {
    this.setState((prevState, props) => {
      // Scrub the input
      //var badNum = false
      //if ( ! rate ) { badNum = true }
      //if (Number.isNaN(Number(rate))) { badNum = true }

      //if ( badNum ) {
        //return { growthRate: prevState.growthRate, grErr: 'Please enter a number.' }
      //} else {
        //return { growthRate: rate, grErr: '' }
      //}

      // Check the input
      var err = ''
      if ( ! input ) { err = 'Please enter a number.' }
      if (Number.isNaN(Number(input))) { err = 'Please enter a number.' }

      return { growthRate: input, grErr: err }

    })
  }

  render() {
    var data = calcData(this.state)
    return (
      <div className="icalc">
        <VarsForm
          startingTotal={this.state.startingTotal}
          stErr={this.state.stErr}
          onStartingTotalChange={this.handleStartingTotalChange}
          yearlyContrib={this.state.yearlyContrib}
          ycErr={this.state.ycErr}
          onYearlyContribChange={this.handleYearlyContribChange}
          years={this.state.years}
          yearsErr={this.state.yearsErr}
          onYearsChange={this.handleYearsChange}
          growthRate={this.state.growthRate}
          onGrowthRateChange={this.handleGrowthRateChange}
          growthRateErr={this.state.grErr}
        />
        <Table
          data={data}
        />
      </div>
    )
  }
}


const calcData = function(params) {
  var data = []
  var total = params.stErr ? 0 : Number(params.startingTotal)
  const yearlyContrib = params.ycErr ? 0 : Number(params.yearlyContrib)
  const years = params.yearsErr ? 0 : Number(params.years)
  const growthRate = params.grErr ? 0 : Number(params.growthRate)
  debug('in calcData, params.yearlyContrib: ' + params.yearlyContrib)
  debug('in calcData, yearlyContrib: ' + yearlyContrib)
  debug('in calcData, params.years: ' + params.years)

  for (var i = 0; i <= years; i++) {
    data.push([i, total])
    total = (total * (1 + growthRate)) + yearlyContrib
  }
  return data
}


//
// Formats a number string with commas.
//
const commaFmt = function(s) {
  // The Complicated, manual way to do it.
  //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // The easier, built‐in way.
  //
  // toLocaleString is a method of the Number class. Make sure we have a Number.
  return Number(s).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}


export default ICalc
