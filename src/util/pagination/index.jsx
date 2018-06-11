import React from 'react'

import RCPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

// 通用分页组件
class Pagination extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <RCPagination {...this.props}
                     hideOnSinglePage
                     showQuickJumper/>
                </div>
            </div>
        )
    }
}

export default Pagination