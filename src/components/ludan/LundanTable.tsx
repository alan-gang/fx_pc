import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getCellStyle, getCellData } from '../../utils/ludan';

import './ludanTable.styl';

interface Props {
  store?: any;
  maxColumns: number;
  maxRows: number;
  ludanList: any[];
}

@inject('store')
@observer
class LundanTable extends Component<Props, object> {
  render() {
    return (
      <section className="ludan-table-view">
        <div className="tb-wp flex">
          {this.props.maxColumns && Array.from(Array(this.props.maxColumns)).map((n, i) => (
            <div className="col" key={i}>
              {this.props.maxRows && Array.from(Array(this.props.maxRows)).map((n, j) => (
                <React.Fragment key={j}>
                  {j === this.props.maxRows - 1 && <div className="tb-cell flex ai-c jc-c"><span className={`code-bg ld-item txt-c ${getCellStyle(this.props.ludanList, i, j, this.props.maxRows)}`} >{getCellData(this.props.ludanList, i, j, this.props.maxRows) }</span></div>}
                  {j !== this.props.maxRows - 1 && <div className="tb-cell flex ai-c jc-c"><span className={`code-bg ld-item txt-c ${getCellStyle(this.props.ludanList, i, j, this.props.maxRows)}`}  >{getCellData(this.props.ludanList, i, j, this.props.maxRows)}</span></div>}
                </React.Fragment>
              ))} 
            </div>
          ))}
        </div>
      </section>  
    )
  }
}

export default LundanTable;
