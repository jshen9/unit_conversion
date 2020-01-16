import React from "react";
import {temperatureConverter, volumeConverter, valueEqual} from './service/converter';
import {nameToSymbol, getValueByName} from './service/temperature';

const Temperatures = Object.freeze(['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine']);

const Volumes = Object.freeze(['liters', 'tablespoons', 'cubic-inches', 'cups', 'cubic-feet', 'gallons', 'l', 'tsp', 'in3', 'cup', 'ft3', 'gal']);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: [{
        'unitMeasure_1': Temperatures[0],
        'unitMeasure_2': Temperatures[0],
        'teacherInput': '',
        'studentInput': '',
        'output': '',
        'answer': ''
      }]
    };
  }
  

  handleChange = (e) => {
    // window.alert("handle row");
    const { name, value } = e.target;
    if (isNaN(Number(value)) && value !== '-') {
      window.alert('Invalid input, must be a float number');
      e.target.value = '';
      return;
    }
    const rows = [...this.state.rows];
    if (name) {
      const buf = name.split('+');
      const idx = parseInt(buf[0]);
      if (rows[idx]) {
        rows[idx][buf[1]] = value;
      } else {
        rows[idx] = {
          [buf[1]]: value
        };
      }
      this.setState({
        rows
      });

      this.doValidate(idx);
    }
  };

  handleSelection = (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    if (name) {
      const buf = name.split('+');
      const idx = parseInt(buf[0]);
      if (rows[idx]) {
        rows[idx][buf[1]] = value;
      } else {
        rows[idx] = {
          [buf[1]]: value
        };
      }
      this.setState({
        rows
      });
      console.log('do validatation...', idx);
      this.doValidate(idx);
    }
  };

  doValidate = (idx) => {
    if (idx >=0) {
      const rows = [...this.state.rows];
      console.log('1: ' + rows[idx]['unitMeasure_1'] + ' 2: ' + rows[idx]['unitMeasure_2']);
      rows[idx].output = '';
      // validate units
      if ((Temperatures.indexOf(rows[idx]['unitMeasure_1']) > -1 && Volumes.indexOf(rows[idx]['unitMeasure_2']) > -1) ||
        (Temperatures.indexOf(rows[idx]['unitMeasure_2']) > -1 && Volumes.indexOf(rows[idx]['unitMeasure_1']) > -1) ||
        (Volumes.indexOf(rows[idx]['unitMeasure_1']) > -1 && Temperatures.indexOf(rows[idx]['unitMeasure_2']) > -1) ||
        (Volumes.indexOf(rows[idx]['unitMeasure_2']) > -1 && Temperatures.indexOf(rows[idx]['unitMeasure_1']) > -1) ) {
        rows[idx].output = 'invalid';
        console.log('temp invalid')
        return 'invalid';
      }
      console.log(rows[idx]['teacherInput']);
      console.log(rows[idx]['studentInput']);
      if ((rows[idx]['teacherInput'].trim().length && !rows[idx]['studentInput'].trim().length) ||
          (!rows[idx]['teacherInput'].trim().length && rows[idx]['studentInput'].trim().length)) {
          rows[idx].output = 'incorrect';
          return 'incorrect';
      }
      try {
        const input_1 = parseFloat(rows[idx]['teacherInput']);
        console.log('input_1: ', parseFloat(input_1).toFixed(1));
        if (Temperatures.indexOf(rows[idx]['unitMeasure_1']) > -1) {
          const result = temperatureConverter(input_1, nameToSymbol(rows[idx]['unitMeasure_1']));
          console.log('=> convert result: ', result);
          const targetValue = getValueByName(rows[idx]['unitMeasure_2'], result);
          console.log('=> convert target: ', targetValue);
          const {v, answer} = valueEqual(targetValue, rows[idx]['studentInput']);
          console.log('=> looked for: ', v);
          rows[idx].output = v?'correct':'incorrect';
          rows[idx].answer = answer;
        }
        if (Volumes.indexOf(rows[idx]['unitMeasure_1']) > -1) {
          const result = volumeConverter(input_1, rows[idx]['unitMeasure_1'], rows[idx]['unitMeasure_2']);
          const {v, answer} = valueEqual(result, rows[idx]['studentInput']);
          console.log('=> looked for: ', v);
          rows[idx].output = v?'correct':'incorrect';
          rows[idx].answer = answer;
        }
      } catch (e) {
        window.alert(e);
      }
    }
  }

  handleAddRow = () => {
    const item = {
      'unitMeasure_1': Temperatures[0],
      'unitMeasure_2': Temperatures[0],
      'teacherInput': '',
      'studentInput': '',
      'output': '',
      'answer': ''
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }
  render() {
    return (
      <div>
        <div className="container">
          <h2 className="center">Unit Converter</h2>
          <div className="row clearfix mt-10">
            <div className="col-md-12 column">
            <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Row
              </button>
              <table
                className="table table-bordered table-hover"
                style={{'position': 'relative', 'marginTop': '4px'}}
                id="tab_logic"
              >
                <thead>
                  <tr className="table-title">
                    <th className="text-center"> # </th>
                    <th className="text-center"> Input Numerical Value </th>
                    <th className="text-center"> Input Unit Measure </th>
                    <th className="text-center"> Target Unit of Measure </th>
                    <th className="text-center"> Student Response </th>
                    <th className="text-center"> Output </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name={idx + '+teacherInput'}
                          onChange={this.handleChange.bind(this)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select className="form-control" 
                          name={idx + '+unitMeasure_1'}
                          value={this.state.rows[idx].unitMeasure_1}
                          onChange={this.handleSelection.bind(this)}
                          >
                          <option>Kelvin</option>
                          <option>Celsius</option>
                          <option>Fahrenheit</option>
                          <option>Rankine</option>
                          <option value="l">​liters​​</option>
                          <option value="tsp">​tablespoons​</option>
                          <option value="in3">cubic-inches</option>
                          <option value="cup">cups​</option>
                          <option value="ft3">cubic-feet</option>
                          <option value="gal">gallons</option>
                        </select>
                      </td>
                      <td>
                        <select className="form-control"
                          name={idx + '+unitMeasure_2'}
                          onChange={this.handleSelection.bind(this)}
                        >
                          <option>Kelvin</option>
                          <option>Celsius</option>
                          <option>Fahrenheit</option>
                          <option>Rankine</option>
                          <option value="l">​liters​​</option>
                          <option value="tsp">​tablespoons​</option>
                          <option value="in3">cubic-inches</option>
                          <option value="cup">cups​</option>
                          <option value="ft3">cubic-feet</option>
                          <option value="gal">gallons</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name={idx + '+studentInput'}
                          onChange={this.handleChange.bind(this)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <div className={(this.state.rows[idx].output === 'correct')?'correct':'incorrect'}>{this.state.rows[idx].output}</div>
                        <div className="answer">{this.state.rows[idx].answer}</div>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
