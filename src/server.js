/* eslint-disable linebreak-style */
// server.js
import Hapi from '@hapi/hapi';
import routes from './routes.js';

// const init = async () => {
//   const server = Hapi.server({
//     port: 9000,
//     host: 'localhost',
//     routes: {
//       cors: {
//         origin: ['*'],
//       },
//     },
//   });

//   server.route(routes);

//   await server.start();
//   console.log('Server berjalan pada %s', server.info.uri);
// };

import Hapi from '@hapi/hapi';
import routes from './routes2.js'; // Pastikan path ini benar sesuai struktur proyek kamu

const init = async () => {
  const server = Hapi.server({
    // Gunakan process.env.PORT untuk port, default ke 9000
    port: process.env.PORT || 9000,
    // Gunakan '0.0.0.0' untuk host agar bisa diakses dari luar container
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        // Izinkan semua origin untuk sementara (hati-hati di production)
        origin: ['*'],
      },
    },
  });

  // Daftarkan rute-rute aplikasi kamu
  server.route(routes);

  // Mulai server Hapi
  await server.start();
  // Log URL server yang sebenarnya setelah server berjalan
  console.log(`Server berjalan pada: ${server.info.uri}`);
};

// Panggil fungsi inisialisasi server

init();
