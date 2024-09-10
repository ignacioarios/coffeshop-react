import { getProducts } from '../data/mockAPI';

export const fetchAPI = ({ categoryId = null, productId = null } = {}) => {
    return getProducts({ categoryId, productId });
};
