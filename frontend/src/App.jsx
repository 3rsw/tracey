import { useState, useEffect } from 'react'
import Code from './components/Code'
import Footer from './components/Footer'

const App = () => {

  const code = "int main(void) {\n  printf(\"Hello, world!\\n\");\n  return 0;\n}";

  return (
    <div className="main-content">
      <h1>Tracey</h1>
      <div className='container'>
        <div className="card orange lighten-3 row">
          <div className = "col s6">
            <h4>Question Name</h4>
          </div>
          <div className="col s6">
            <h6>Difficulty: *****</h6>
            <h6>Tags:</h6>
          </div>
        </div>
        <div className="row">
          <div className='col s6'>
            <Code code={code} />
          </div>
          <div className='col s6'>
            <table className="centered"  style={{ width: '100%', tableLayout: 'fixed'}}>
              <thead>
                <tr>
                  <th>var_a</th>
                  <th>var_b</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12</td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td>
                    <div className="input-field inline col s12">
                      <input id="input_var_a" type="text" className="validate" style={{ width: '100%' }} />
                      <label htmlFor="input_var_a">3</label>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App