import React from 'react'
import {Link} from 'react-router-dom'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'
import ListSearch from './index-list-search.jsx'
import Pagination from 'util/pagination/index.jsx'


import './index.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list' // 列表数据是从直接获取还是搜索获取
        }
    }
    componentDidMount () {
        this.loadProductList()
    }
    // 加载商品列表
    loadProductList () {
        let listParam = {
            listType: this.state.listType,
            pageNum: this.state.pageNum
        }
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType
            listParam.keyword = this.state.searchKeyword
        }
        _product.getProductList(listParam).then((res) => {
            this.setState(res)
        }, (errMsg) => {
            this.setState({
                list: []
            })
            _mm.errTips(errMsg)
        })
    }
    onSearch (searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList()
        })
    }
    // 页数发生变化时
    onPageNumChange (pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList()
        })
    }
    // 改变商品状态
    onSetProductStatus (e, productId, currentStatus) {
        let newStatus = currentStatus === 1 ? 2 : 1,
            confirmTips = currentStatus === 1 ? "确定要下架该商品？" : "确定要上架该商品？"
        if (window.confirm(confirmTips)) {
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.successTips(res)
                this.loadProductList()()
            }, errMsg => {
                _mm.errTips(res)
            })
        }
    }
    render () {
        let tableHeads = [
            {name: '商品ID', width: '10%'},
            {name: '商品信息', width: '50%'},
            {name: '价格', width: '10%'},
            {name: '状态', width: '15%'},
            {name: '操作', width: '15%'}
        ]
         return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status === 1 ?"在售":"已下架"}</p>
                                        <button className="btn btn-xs btn-warning" onClick={(e) => {this.onSetProductStatus(e, product.id, product.status)}}>{product.status === 1 ?"已下架":"在售"}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                        <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum}
                            total={this.state.total} onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
            </div>
        )
    }
}

export default ProductList