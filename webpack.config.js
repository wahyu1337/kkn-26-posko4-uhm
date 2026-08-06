const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Daftar semua halaman website
const pages = [
    { name: 'index', title: 'Beranda — KKN 26 Posko 4 UHM', template: './src/index.html', filename: 'index.html' },
    { name: 'about', title: 'Tentang — KKN 26 Posko 4 UHM', template: './src/about/index.html', filename: 'about/index.html' },
    { name: 'berita', title: 'Berita — KKN 26 Posko 4 UHM', template: './src/berita/index.html', filename: 'berita/index.html' },
    { name: 'profile', title: 'Anggota — KKN 26 Posko 4 UHM', template: './src/profile-anggota-kkn/index.html', filename: 'profile-anggota-kkn/index.html' },
    { name: 'proker', title: 'Program Kerja — KKN 26 Posko 4 UHM', template: './src/proker/index.html', filename: 'proker/index.html' },
    // Detail Berita
    { name: 'berita-penyerahan', title: 'Penyerahan Mahasiswa KKN — KKN 26 Posko 4 UHM', template: './src/berita/penyerahan-mahasiswa-kkn.html', filename: 'berita/penyerahan-mahasiswa-kkn.html' },
    { name: 'berita-spanduk', title: 'Proses Pemasangan Spanduk — KKN 26 Posko 4 UHM', template: './src/berita/pemasangan-spanduk.html', filename: 'berita/pemasangan-spanduk.html' },
    { name: 'berita-proker', title: 'Pembahasan Program Kerja — KKN 26 Posko 4 UHM', template: './src/berita/pembahasan-proker.html', filename: 'berita/pembahasan-proker.html' },
    { name: 'berita-observasi', title: 'Sesi Observasi dan Wawancara — KKN 26 Posko 4 UHM', template: './src/berita/sesi-observasi-lurah.html', filename: 'berita/sesi-observasi-lurah.html' },
    { name: 'berita-kegiatan-bersih2', title: 'Gotong-Royong 17 Agustusan — KKN 26 Posko 4 UHM', template: './src/berita/kegiatan-bersih2.html', filename: 'berita/kegiatan-bersih2.html' },
    { name: 'berita-kegiatan-reses', title: 'Kegiatan pertemuan reses — KKN 26 Posko 4 UHM', template: './src/berita/pertemuan-mallaranganTutu.html', filename: 'berita/pertemuan-mallaranganTutu.html' },
];

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },

    plugins: [
        // Generate HTML untuk setiap halaman
        ...pages.map(page => new HtmlWebpackPlugin({
            template: page.template,
            filename: page.filename,
            title: page.title,
            inject: 'body',
            chunks: ['main'],
        })),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets', noErrorOnMissing: true },
                { from: 'CNAME', to: '.', noErrorOnMissing: true },
            ],
        }),
    ],

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        watchFiles: ['src/**/*'],
    },
};