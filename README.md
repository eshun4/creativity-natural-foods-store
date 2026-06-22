# Creativity Natural Foods React Store

React + Vite version of the Creativity Natural Foods storefront.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Current product images

The project now uses renamed PNG product images in `src/assets`:

- `01-wild-honey-250ml-ghs25.png`
- `02-wild-honey-500ml-ghs50.png`
- `03-wild-honey-1-litre-ghs100.png`
- `04-wild-honey-2-litres-ghs200.png`
- `05-groundnut-paste-bucket-ghs150.png`
- `06-mixed-porridge-tombrown-1kg-ghs25.png`
- `07-mixed-porridge-tombrown-2kg-ghs50.png`
- `08-millet-sorghum-powder-1kg-ghs25.png`
- `09-millet-sorghum-powder-2kg-ghs50.png`

The Sorghum Powder images have been updated with the corrected label based on the original reference image.

## Latest update

This version includes:

- real cart state with product quantities
- hover cart popup with a scrollable item list
- discounted product display with sale prices and crossed-out original prices
- discount filter for discounted and non-discounted products
- checkout page with selected cart items and order summary
- shared settings/config exported from `src/config/storeSettings.js`

Current discount rules:

- Wild Honey 250 ml: GH₵25, no discount
- Wild Honey 500 ml: GH₵50, discounted to GH₵45
- Wild Honey 1 litre: GH₵100, discounted to GH₵90
- Wild Honey 2 litres: GH₵200, discounted to GH₵190
- Groundnut Paste: GH₵150, no discount
- Mixed Porridge Tombrown: GH₵60, discounted to GH₵55

## Refactored Project Structure

The app has been split into separate folders:

- `src/components` - reusable UI components such as Header, Footer, ProductCard, CartPopup, and icons
- `src/pages` - page-level screens such as ShopPage, CheckoutPage, SignInPage, AccountPage, OrdersPage, WishlistPage
- `src/utils` - cart and product helper functions
- `src/config/storeSettings.js` - shared store settings, labels, theme variables, filters, and pricing helpers
