import Product from "../../models/products";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () => {
    return async dispatch => {
        try{
            const response = await fetch(
                'https://products-app-6a0ee-default-rtdb.firebaseio.com/products.json',
            );
    
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
    
            const resData = await response.json();
            const loadedProducts = [];
    
            for(const key in resData){
                loadedProducts.push(new Product(
                    key, 
                    'u1', 
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                ))
            }
            dispatch({ type: SET_PRODUCT, products: loadedProducts })
        }catch(err){
            throw err;
        }
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(
            `https://products-app-6a0ee-default-rtdb.firebaseio.com/products/${productId}.json`,
            {
                method: 'DELETE',
            }
        );
        dispatch({ type: DELETE_PRODUCT, pid: productId });
    }
    
}

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        const response = await fetch(
            'https://products-app-6a0ee-default-rtdb.firebaseio.com/products.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        console.log('Firebase response:', resData); // ✅ should log now

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name, // Firebase returns the new id here
                title,
                description,
                imageUrl,
                price,
            }
        });
    }
};


export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        await fetch(
            `https://products-app-6a0ee-default-rtdb.firebaseio.com/products/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                }),
            }
        );
        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl,
            }
        })
    }
    
}