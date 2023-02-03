
Dette er et [Next.js](https://nextjs.org/) prosjekt bootstrapped med [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 
Vi bruker:
* [Tailwind](https://tailwindcss.com) for styling
* [Pocketbase](https://pocketbase.io/) for server og backend
* [Storybook](https://storybook.js.org/)  som environment for komponentlaging
* [Next.js](https://nextjs.org/) til alt annet
  

## Start
Først kjør dev environment:

```bash
pnpm install
pnpm dev
```
Åpne [http://localhost:3000](http://localhost:3000) for å se prosjektet
  
Kjør dette i prosjektets root for å kjøre serveren:
```bash
./pocketbase serve
```
For å teste komponenter, åpne storybook med:
```bash
pnpm run storybook
```
Åpne [http://localhost:6006](http://localhost:3000) for å se komponentene

Prosjektet bruker [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) for automatisk importere Inter og andre custom Google Fonts.
