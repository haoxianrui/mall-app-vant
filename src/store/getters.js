import {
    SELECTED_GOODS_COUNT,
    SELECTED_GOODS,
    SELECTED_GOODS_PRICE
} from "@/store/mutation-type"


export default {
    // 选中商品的条数
    [SELECTED_GOODS_COUNT](state) {
        let count = 0;
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((goods, index) => {
            if (goods.checked) {
                count++;
            }
        });
        return count;
    },
    [SELECTED_GOODS](state) {
        let goodsArray = [];
        let shopCart = state.shopCart;
        Object.values(shopCart).forEach((good, index) => {
            if (good.checked) {
                goodsArray.push(shopCart[good.id]);
            }
        });
        return goodsArray;
    },
    // 选中商品的总价
    [SELECTED_GOODS_PRICE](state) {
        let totalPrice = 0;
        Object.values(state.shopCart).forEach((goods, index) => {
            if (goods.checked) {
                totalPrice += (goods.price * goods.num * 100)
            }
        });
        return totalPrice;
    }

}
