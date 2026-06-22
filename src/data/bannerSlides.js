import honeyBanner from '../assets/banners/01-hero-wild-honey-banner.png';
import groundnutBanner from '../assets/banners/02-hero-groundnut-paste-banner.png';
import porridgeBanner from '../assets/banners/03-hero-mixed-porridge-tombrown-banner.png';
import sorghumBanner from '../assets/banners/04-hero-sorghum-powder-banner.png';

export const bannerSlides = [
  {
    id: 'wild-honey',
    image: honeyBanner,
    alt: 'Pure Wild Honey banner with 250ml, 500ml, 1 litre, and 2 litre bottles',
    actionLabel: 'Shop Honey',
    action: { type: 'category', category: 'honey' },
  },
  {
    id: 'groundnut-paste',
    image: groundnutBanner,
    alt: 'Groundnut Paste banner with large peanut butter bucket',
    actionLabel: 'Shop Groundnut Paste',
    action: { type: 'category', category: 'pb' },
  },
  {
    id: 'mixed-porridge',
    image: porridgeBanner,
    alt: 'Mixed Porridge Tom Brown banner with product pack and breakfast grains',
    actionLabel: 'View Deal',
    action: { type: 'product', productId: 'mixed-porridge-tombrown' },
  },
  {
    id: 'sorghum-powder',
    image: sorghumBanner,
    alt: 'Sorghum Powder banner for banku or koko',
    actionLabel: 'Shop Sorghum Powder',
    action: { type: 'product', productId: 'sorghum-powder-1kg' },
  },
];
