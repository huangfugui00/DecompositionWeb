/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com","jsonkeeper.com"],
    formats: ['image/avif', 'image/webp'],
  },
  env:{
    mapbox_key:'pk.eyJ1IjoiaHVhbmdmdWd1aTAwIiwiYSI6ImNrd3oxeWU3djBreWEyb3BodW45aW9uNGMifQ.NEvRELRamLj9bcTTXOjzaA'
  }
  // async redirects() {
  //   return [
  //     {
  //       // source: '/',
  //       // destination: '/home',
  //       permanent: false,
  //     },
  //   ]
  // },
}
