# Portfolio

- You can find my [tech stack](https://furki.vercel.app/), [projects](https://furki.vercel.app/projects), [story, and education information](https://furki.vercel.app/about)!
- [Live Link](https://www.furkancengiz.software)
![image](https://github.com/4Furki4/the-portfolio/assets/84590614/230b3a38-4e5c-4d49-9049-80d9b07b3c5a)

## Tech and Libraries

- Utilized the Next.js app router with React
- Implemented [framer-motion](https://www.framer.com/motion/) library for the animations.
- Used [Tailwind](https://tailwindcss.com/) for styling
- Implemented [ts-particles](https://github.com/tsparticles/tsparticles) for generating amazing and interactional background
- Used combition of [shadcn/ui](https://ui.shadcn.com/) and [NextUI](https://nextui.org/docs/components/navbar#controlled-menu).
- Blurred Loading Image data URLs generated using [plaiceholder]([url](https://plaiceholder.co/))
- Carousels built with [fancybox](https://fancyapps.com/)
- Capturing user experience using [Clarity](https://clarity.microsoft.com/)
- Sitemap is generated with [next-sitemap](https://www.npmjs.com/package/next-sitemap)
 ## Planned Features to be Added.

 - Internationalization using next-intl for the Turkish translation. (I'm able to implement it using next-intl in client-side components but I'm waiting for the stable release for server-side components)
 ## Contribution

 - You can report problems you stumble upon by opening issues! 
 - This app uses static project/course data from the repository. It does not require a database for local development.

## Raspberry Pi Deployment

The repository includes Docker deployment files for Raspberry Pi hosting:

- `Dockerfile` builds the Next.js standalone server.
- `docker-compose.app.yml` runs the app container.
- Cloudflared should route the public hostname to `http://127.0.0.1:3004`.
- `.env.pi.example` documents the Pi runtime environment.

-------------------------------------------
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
