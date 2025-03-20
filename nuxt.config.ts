import svgLoader from "vite-svg-loader"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  app: {
    head: {
      htmlAttrs: {
        lang: "en-US",
      },
      title: "Wit/Stake: Secure the network, earn rewards.",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "viewport-fit=cover, width=device-width, initial-scale=1",
        },
        {
          hid: "title",
          name: "title",
          content: "Wit/Stake: Secure the network, earn rewards.",
        },
        {
          hid: "description",
          name: "description",
          content:
            "Track live Stake Volume and Leaderboard rankings in real time. See total wagered amounts and top $WIT stakers at a glance with accurate, up-to-date data. Stay ahead of the game!",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Wit/Stake: Secure the network, earn rewards.",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "Track live Stake Volume and Leaderboard rankings in real time. See total wagered amounts and top $WIT stakers at a glance with accurate, up-to-date data. Stay ahead of the game!",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/meta-image.png",
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: "Wit/Oracle",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Wit/Stake: Secure the network, earn rewards.",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Track live Stake Volume and Leaderboard rankings in real time. See total wagered amounts and top $WIT stakers at a glance with accurate, up-to-date data. Stay ahead of the game!",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/meta-image.png",
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: "/meta-image.png",
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: "Wit/Oracle",
        },
      ],
      link: [
        {
          rel: "preload stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
          as: "style",
          type: "text/css",
        },
        { rel: "apple-touch-icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
          type: "image/png",
        },
        {
          rel: "icon",
          sizes: "32x32",
          href: "/favicon-32x32.png",
          type: "image/png",
        },
        {
          rel: "icon",
          sizes: "16x16",
          href: "/favicon-16x16.png",
          type: "image/png",
        },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "2D2C39" },
        { rel: "shortcut icon", href: "/favicon.ico" },
      ],
      script: [
        {
          textContent: `
            <!-- Twitter conversion tracking base code -->
            <script>
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','ovifm');
            </script>
            <!-- End Twitter conversion tracking base code -->`,
          type: "text/javascript",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  components: true,
  css: ["~/assets/styles/tailwind.css"],
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                  cleanupIds: false,
                },
              },
            },
          ],
        },
      }),
    ],
  },
})
