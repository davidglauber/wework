import RNIap, {purchaseUpdatedListener} from 'react-native-iap';

export const purchased = async (productId) => {
    let isPurchased = false;

    try {
        const purchases = await RNIap.getAvailablePurchases();

        purchases.forEach((purchase) => {
            if(purchase.productId === productId) {
                isPurchased = true;
                return;
            }
        });

        return isPurchased;
    } catch (error) {
        return false;
    }

    //consulta retornar true/false
    return isPurchased;
}

export const requestPurchase = async (productId) => {

    try {
        await RNIap.requestSubscription(productId)
    } catch (error) {
        alert('Erro ao recuperar dados de compra, por favor tente novamente')
    }

};


export const fetchAvailableProducts = async (productIds) => {
    try {
        const getProducts = await RNIap.getProducts(productIds);
    } catch (error) {
        
    }
};


export const purchaseUpdateSubscription = async () => {
    purchaseUpdatedListener(async (purchase) => {
        const receipt = purchase.transactionReceipt;

        if(receipt){
            const ackResult = await RNIap.finishTransaction(purchase);

            console.debug(ackResult)
        } 
    })
};