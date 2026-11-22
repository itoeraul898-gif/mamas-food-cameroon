# MAMA’s FOOD

A responsive static online ordering website for MAMA’s FOOD in Youpwe, Douala, Cameroon. Prices are displayed in XAF/FCFA.

## Run locally

Open `index.html` in a browser, or serve this folder with any static web server. No build step or dependencies are required.

## Features

- Responsive menu with categories and search
- Meals, drinks, and snack listings with the supplied prices
- Shopping cart with quantities and meal choices
- Custom meal request and special-instructions field
- Customer name, phone, timing, delivery location, and payment preference in checkout
- 50% food-deposit estimate, with the remaining balance due on delivery
- WhatsApp order message and click-to-call links
- Delivery fee explicitly confirmed by the vendor based on customer location

## Business details

- Owner: Ms. ITOE HELLEN
- Customer contact: 671 561 515 (Cameroon: +237 671 561 515)
- Location: Youpwe, Douala, Cameroon
- Payment preferences: MTN Mobile Money, Orange Money, or bank card (confirm details with the vendor)

## Important limitations

This is a static frontend. It does not collect or process payments, store customer orders, authenticate customers, or provide an admin dashboard. Orders are composed as a WhatsApp message; the customer must send it and wait for the kitchen to confirm availability, delivery cost, and payment details. Do not put bank card numbers, mobile money PINs, or private residential addresses in this public site. Configure the destination phone and menu in `script.js` before deployment if business details change.
