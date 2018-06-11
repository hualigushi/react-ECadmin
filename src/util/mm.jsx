class MUtil {
    request (param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success : (res) => {
                    // 请求成功
                    if (0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data, res.msg)
                    }else if (10 === res.status) { // 没有登录状态，强制登录
                        this.doLogin()
                    }else {
                        typeof reject === 'function' && reject(res.msg || res.data)
                    }
                },
                error: (err) => {
                    typeof reject === 'function' && reject(err.statusText)
                }
            })
        })
    }
    // 跳转登录
    doLogin () {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    // 获取URL参数
    getUrlParam (name) {
        // XXX.com?param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|$)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg)
        // result: ['param=123','','123','&']
        return result ? decodeURIComponent(result[2]) : null


    }
    // 错误提示
    errTips (errMsg) {
        alert(errMsg || '好像哪里不对了')
    }
    setStorage (name, data) {
        let dataType = typeof data
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
        } else if (['number', 'string', 'boolean'].indexOf(dataType) > -1) {
            window.localStorage.setItem(name, data)
        } else {
            alert('该类型不能用于本地存储')
        }
    }
    getStorage (name) {
        let data = window.localStorage.getItem(name)
        if (data) {
            return JSON.parse(data)
        } else {
            return ''
        }
    }
    removeStorage (name) {
        window.localStorage.removeItem(name)
    }
}

export default MUtil