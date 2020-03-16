
/*生成指定长度的随机数*/
export function randomCode(length) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = "";
    for (let i = 0; i < length; i++) {
        let index = Math.ceil(Math.random() * 9);
        result += chars[index];
    }
    return result;
}