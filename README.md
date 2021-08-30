# App Clip Code Thinner

A set of custom plugins and configuration for [SVGO](https://github.com/svg/svgo), tailored to App Clip codes.

Running this on an App Clip code is able to achieve a **~72.3% reduction** in size, without any visual differences.

From some basic testing:

- App Clip codes tend to be around 16-25 KiB. When Gzipped, they are about 4-6 KiB.
- With the default SVGO config, optimised App Clips tend to be 13-17 KiB (35.3%). When Gzipped, they are 2-4 KiB (86.4%).
- After running this, optimised App Clips tend to be 4-7 KiB (**72.3%**). When Gzipped, they are 1-2 KiB (**90.3%**).

## Usage

1. Clone this repo and navigate to it
2. Install SVGO globally with `npm i -g svgo`
3. Install dependencies with `npm i`
4. Run `svgo` with standard commands, such as `svgo code.svg -o code.min.svg`. To use from a different directory, you can pass `--config` and point to `svgo.config.js`.