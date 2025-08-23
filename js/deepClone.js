export function deepClone(obj,hash=new WeakMap()) {
    if(obj instanceof Date){
        return new Date(obj)
    }
    if(obj instanceof RegExp){
        return new RegExp(obj)
    }
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if(hash.has(obj)){
        return hash.get(obj)
    }
    // 可能是数组或对象，要用constructor创建新对象，不能直接等于空对象
    const cloneObj = obj.constructor()
    hash.set(obj,cloneObj)
    for(const key in obj){
        if(obj.hasOwnProperty(key)){
            cloneObj[key] = deepClone(obj[key],hash)
        }
    }
    return cloneObj
}
