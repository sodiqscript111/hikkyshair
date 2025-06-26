export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  hoverImage: string;
  sizes: string[];
  description: string;
  details: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Argentine Straight Closure',
    price: 230000,
    currency: 'NGN',
    image: 'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png', // New image
    hoverImage: 'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg', // New image
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"'],
    description: 'A luxurious, silky-straight human hair closure known for its softness and durability.',
    details: 'Made from 100% unprocessed virgin human hair. Tangle-free and easy to maintain.',
    images: [
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png', // New image
      'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg', // New image
      'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png', // New image
    ],
  },
  {
    id: 2,
    name: 'Argentine Straight',
    price: 2550000,
    currency: 'NGN',
    image: 'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg', // New image
    hoverImage: 'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png', // New image
    sizes: ['12"', '14"', '16"', '18"', '20"', '22"'],
    description: 'Premium straight hair bundles with a natural shine and smooth texture.',
    details: '100% virgin human hair, perfect for sleek and elegant styles.',
    images: [
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg', // New image
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png', // New image
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg', // New image
    ],
  },
  {
    id: 3,
    name: 'Argentine Wavy',
    price: 270000,
    currency: 'NGN',
    image: 'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg', // New image
    hoverImage: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg', // New image
    sizes: ['10"', '12"', '14"', '16"', '18"'],
    description: 'Soft, wavy hair extensions with a natural bounce and volume.',
    details: 'Crafted from high-quality virgin hair, ideal for versatile styling.',
    images: [
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg', // New image
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg', // New image
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg', // New image
    ],
  },
  {
    id: 4,
    name: 'South American Kinky Curly',
    price: 3200000,
    currency: 'NGN',
    image: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png', // New image
    hoverImage: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg', // New image
    sizes: ['12"', '14"', '16"', '18"', '20"'],
    description: 'Vibrant kinky curly hair with a full, voluminous texture.',
    details: 'Made from 100% virgin human hair, perfect for bold and natural looks.',
    images: [
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png', // New image
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg', // New image
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg', // New image
    ],
  },
  {
    id: 5,
    name: 'South American Kinky Straight',
    price: 300000,
    currency: 'NGN',
    image: 'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png', // New image
    hoverImage: 'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png', // New image
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"'],
    description: 'Sleek kinky straight hair with a natural, textured finish.',
    details: 'High-quality virgin hair, ideal for low-maintenance styles.',
    images: [
      'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png', // New image
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png', // New image
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg', // New image
    ],
  },
  {
    id: 6,
    name: 'Customised Closure',
    price: 245000,
    currency: 'NGN',
    image: 'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg', // New image
    hoverImage: 'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg', // New image
    sizes: ['4x4"', '5x5"', '6x6"'],
    description: 'Customizable closure for a seamless and natural hairline.',
    details: 'Made from premium virgin hair, perfect for protective styles.',
    images: [
      'https://i.ibb.co/pBkb8Mn6/Gemini-Generated-Image-6w0hpv6w0hpv6w0h.jpg', // New image
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg', // New image
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png', // New image
    ],
  },
  {
    id: 7,
    name: 'Deep Wave Bundle',
    price: 2800000,
    currency: 'NGN',
    image: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg', // New image
    hoverImage: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg', // New image
    sizes: ['12"', '14"', '16"', '18"', '20"'],
    description: 'Lush deep wave bundles with a rich, flowing texture.',
    details: '100% virgin human hair, ideal for glamorous styles.',
    images: [
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg', // New image
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg', // New image
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg', // New image
    ],
  },
  {
    id: 8,
    name: 'Body Wave Weave',
    price: 260000,
    currency: 'NGN',
    image: 'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg', // New image
    hoverImage: 'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png', // New image
    sizes: ['10"', '12"', '14"', '16"', '18"'],
    description: 'Soft body wave weave with a natural, flowing pattern.',
    details: 'Crafted from virgin human hair, perfect for everyday wear.',
    images: [
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg', // New image
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png', // New image
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg', // New image
    ],
  },
  {
    id: 9,
    name: 'Silky Straight Extensions',
    price: 2900000,
    currency: 'NGN',
    image: 'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg', // Using an existing new straight image
    hoverImage: 'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png', // Using an existing new straight image
    sizes: ['12"', '14"', '16"', '18"', '20"', '22"'],
    description: 'Ultra-smooth straight extensions for a polished look.',
    details: '100% virgin human hair, tangle-free and long-lasting.',
    images: [
      'https://i.ibb.co/bR6C1W64/Gemini-Generated-Image-i4kaboi4kaboi4ka.jpg',
      'https://i.ibb.co/6CRvgGR/Gemini-Generated-Image-2lio432lio432lio.png',
      'https://i.ibb.co/JjqDQDjr/Gemini-Generated-Image-vue0oyvue0oyvue0.png',
    ],
  },
  {
    id: 10,
    name: 'Loose Wave Frontal',
    price: 330000,
    currency: 'NGN',
    image: 'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg', // Using an existing new wavy image
    hoverImage: 'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg', // Using an existing new wavy image
    sizes: ['13x4"', '13x6"'],
    description: 'Versatile loose wave frontal for a natural hairline.',
    details: 'Made from premium virgin hair, ideal for protective styles.',
    images: [
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
      'https://i.ibb.co/p6JV33hB/Gemini-Generated-Image-3s4r523s4r523s4r.jpg',
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
    ],
  },
  {
    id: 11,
    name: 'Afro Kinky Clip-ins',
    price: 220000,
    currency: 'NGN',
    image: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png', // Using an existing new kinky/curly image
    hoverImage: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg', // Using an existing new kinky/curly image
    sizes: ['10"', '12"', '14"', '16"'],
    description: 'Bold afro kinky clip-ins for a natural, textured look.',
    details: '100% virgin human hair, easy to install and remove.',
    images: [
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
      'https://i.ibb.co/CKw8JP1z/Gemini-Generated-Image-10toqv10toqv10to.jpg',
    ],
  },
  {
    id: 12,
    name: 'Coily Hair Bundles',
    price: 3100000,
    currency: 'NGN',
    image: 'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg', // Using an existing new kinky/curly image
    hoverImage: 'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png', // Using an existing new kinky/curly image
    sizes: ['12"', '14"', '16"', '18"', '20"'],
    description: 'Tightly coiled hair bundles for a bold, natural style.',
    details: 'Made from 100% virgin human hair, perfect for textured looks.',
    images: [
      'https://i.ibb.co/jkzfVsBc/Gemini-Generated-Image-a3ar8la3ar8la3ar.jpg',
      'https://i.ibb.co/N6s3fXV3/Gemini-Generated-Image-mz4vb0mz4vb0mz4v.png',
      'https://i.ibb.co/W7Xmn3v/Gemini-Generated-Image-rinj5rinj5rinj5r.jpg',
    ],
  },
];