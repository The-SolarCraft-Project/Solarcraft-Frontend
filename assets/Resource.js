const starArray=[
    {
        name: "Sun",
        price: "0.1",
        image: "/static/nftImages/sun.png",
        file: "https://ipfs.io/ipfs/QmYMkvLsVVjCaMf3GLed5sBhJovYWz2E3GCQ8g9XRUSyuz?filename=sun.glb",
        enable: false,
        scale: 2
    }
]

const planetArray=[
    {
        name: "Mercury",
        price: "0.1",
        image: "/static/nftImages/mercury.png",
        file: "https://ipfs.io/ipfs/QmVtmbyXgA6rT3vJbqLJsP5BGPk75VSWU5piJnYuhy4gu1?filename=marcury.glb",
        enable: false,
        scale: 0.07,
        position: [2.3,0,0],
        speed: 1.3
    },
    {
        name: "Venus",
        price: "0.1",
        image: "/static/nftImages/venus.png",
        file: "/GLB/venus.glb",
        enable: false,
        scale: 0.18,
        position: [2.6,0,0],
        speed: 1
    },
    {
        name: "Earth",
        price: "0.1",
        image: "/static/nftImages/earth.png",
        file: "https://ipfs.io/ipfs/QmPEg3z9QrGfByUQQGdLDsg8WaKcSKuc5uf7YjDGhbB1hR?filename=earth.glb",
        enable: false,
        scale: 0.2,
        position: [3.1,0,0],
        speed: 0.9
    },
    {
        name: "Mars",
        price: "0.1",
        image: "/static/nftImages/mars.png",
        file: "/GLB/mars.glb",
        enable: false,
        scale: 0.14,
        position: [3.5,0,0],
        speed: 0.7
    },
    {
        name: "Jupiter",
        price: "0.1",
        image: "/static/nftImages/jupiter.png",
        file: "https://ipfs.io/ipfs/QmQyJpndDXjFCnVcDVyFvF796VcEpdQH6LwQn8KAoLQWMN?filename=jupiter.glb",
        enable: false,
        scale: 0.5,
        position: [4.2,0,0],
        speed: 0.5
    },
    {
        name: "Saturn",
        price: "0.1",
        image: "/static/nftImages/saturn.png",
        file: "https://ipfs.io/ipfs/QmTSPU4NYvtuSt94uyxcZCcafaCtZvB4kBLWgStxGDjYyR?filename=saturn.glb",
        enable:false,
        scale: 0.4,
        position: [5.7,0,0],
        speed: 0.45
    },
    {
        name: "Uranus",
        price: "0.1",
        image: "/static/nftImages/uranus.png",
        file: "https://ipfs.io/ipfs/QmWsCKzE3ow2E4oGTszqLuwyWKWrru35iGD2GExqQtk7zk?filename=uranus.glb",
        enable: false,
        scale: 0.3,
        position: [7,0,0],
        speed: 0.3
    },
    {
        name: "Neptune",
        price: "0.1",
        image: "/static/nftImages/neptune.png",
        file: "https://ipfs.io/ipfs/QmcgkVJYNr46xUAHqtct6FpM7qAf5WKhxY2UM8RAByGxna?filename=neptune.glb",
        enable: false,
        scale: 0.3,
        position: [7.7,0,0],
        speed: 0.2
    },
    {
        name: "Pluto",
        price: "0.1",
        image: "/static/nftImages/pluto.png",
        file: "https://ipfs.io/ipfs/QmcR2FfVvJYK4xDkXYvvpmYAGK6q11fge8gNaXD7AeVyqj?filename=pluto.glb",
        enable: false,
        scale: 0.05,
        position: [8.5,0,0],
        speed: 0.1
    }
]
module.exports = {
    starArray,
    planetArray
};