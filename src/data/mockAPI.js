export function getProducts({ categoryId = null, productId = null } = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (productId) {
                resolve(products.find(product => product.id === productId));
            } else if (categoryId) {
                resolve(products.filter(product => product.category === categoryId));
            } else {
                resolve(products);
            }
        }, 500);
    });
}

const products = [
    {
        id: '1',
        category: 'Internacional',
        name: "Café Suave Colombiano",
        description: "Café molido de origen colombiano, sabor suave y aroma delicado",
        imageUrl: '/product-images/cafecolombia.jpg',
        price: 15.99,
        stock: 50
    },
    {
        id: '2',
        category: 'Internacional',
        name: "Café Intenso Brasileño",
        description: "Café molido de origen brasileño, sabor intenso y cuerpo robusto",
        imageUrl: '/product-images/cafebrasilero.webp',
        price: 17.99,
        stock: 40
    },
    {
        id: '3',
        category: 'Internacional',
        name: "Mezcla Especial Italiana",
        description: "Mezcla de cafés de alta calidad, sabor equilibrado y aroma intenso",
        imageUrl: '/product-images/cafeitaliano.jpeg',
        price: 19.99,
        stock: 35
    },
    {
        id: '4',
        category: 'Nacional',
        name: "Café Descafeinado Artesanal",
        description: "Café molido descafeinado artesanal, ideal para disfrutar por la noche",
        imageUrl: '/product-images/cafedescafeinado.jpg',
        price: 16.99,
        stock: 25
    },
    {
        id: '5',
        category: 'Nacional',
        name: "Café Baritú",
        description: "Variedad coffee arábiga, cultivado en las proximidades del Parque Nacional Baritú",
        imageUrl: '/product-images/cafebaritu.jpeg',
        price: 39.99,
        stock: 15

    },
    {
        id: '6',
        category: 'Vajilla',
        name: "Plato de Café",
        description: "Plato de café de porcelana, diseño a juego con la taza",
        imageUrl: '/product-images/platocafe.webp',
        price: 5.99,
        stock: 120
    },
    {
        id: '7',
        category: 'Vajilla',
        name: "Taza de Porcelana",
        description: "Taza de porcelana blanca, diseño clásico",
        imageUrl: '/product-images/tazacafe.jpeg',
        price: 8.99,
        stock: 100

    },
    {
        id: '8',
        category: 'Vajilla',
        name: "Molinillo de Café Manual",
        description: "Molinillo de café manual de acero inoxidable",
        imageUrl: '/product-images/molinillocafe.jpg',
        price: 29.99,
        stock: 20
    },
    {
        id: '9',
        category: 'Vajilla',
        name: "Azucarera de Porcelana",
        description: "Azucarera de porcelana con tapa",
        imageUrl: '/product-images/azucarera.webp',
        price: 7.99,
        stock: 80
    },

];
