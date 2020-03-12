// 本地化存储5M空间数据库，永久性存储
export const setLocalStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
};

// 本地化获取
export const getLocalStore = (name) => {
    if (!name) return
    return window.localStorage.getItem(name)
}

// 本地化删除
export const removeLocalStore = (name) => {
    if (!name) return;
    return window.localStorage.removeItem(name)
}

