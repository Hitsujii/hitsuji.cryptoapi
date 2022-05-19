const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const {response} = require("express");
const {empty} = require("cheerio/lib/api/manipulation");

const app = express()
const crypto = [
    {

        address: "https://2miners.com/pl/eth-network-hashrate",

    },
    {

        address: "https://www.coindesk.com/price/ethereum/",

    },
    {
        address: "https://bitinfocharts.com/pl/ethereum/",
    },
    {
        address: "https://eth.2miners.com/"
    }
]
const beam = [
    {
        address: "https://2miners.com/pl/beam-network-hashrate",
    },
    {
        address: "https://www.binance.com/en/price/beam",
    },
    {
        address: "https://www.coinwarz.com/mining/beam/calculator",
    },
    {
        address: "https://beam.2miners.com/"
    }

]
const rvn = [
    {
        address: "https://2miners.com/pl/rvn-network-hashrate",
    },
    {
        address: "https://www.binance.com/en/price/ravencoin",
    },
    {
        address: "https://www.coinwarz.com/mining/beam/calculator",
    },
    {
        address: "https://rvn.2miners.com/"
    }

]
const ctx = [
    {
        address: "https://2miners.com/ctxc-network-hashrate",
    },
    {
        address: "https://www.binance.com/en/price/cortex",
    },
    {
        address: "https://www.coinwarz.com/mining/beam/calculator",
    },
    {
        address: "https://ctxc.2miners.com/"
    }
]
const waluta = [
    {
        address: "https://www.bankier.pl/waluty/kursy-walut/forex/USDPLN"
    }
]
const nividia = [
    {
        RTX3090ti_ETH_MOC: 	132.09,
        RTX3090ti_ETH_WATY: 338,
        RTX3090ti_BEAM_MOC: 55,
        RTX3090ti_BEAM_WATY: 320,
        RTX3090ti_RVN_MOC: 53,
        RTX3090ti_RVN_WATY: 360,
        RTX3090ti_CTX_MOC: 7.20,
        RTX3090ti_CTX_WATY: 350,

        RTX3090_ETH_MOC: 124.09,
        RTX3090_ETH_WATY: 294,
        RTX3090_BEAM_MOC: 39.70,
        RTX3090_BEAM_WATY: 233,
        RTX3090_RVN_MOC: 61.17,
        RTX3090_RVN_WATY: 362,
        RTX3090_CTX_MOC: 6.60,
        RTX3090_CTX_WATY: 316,

        RTX3080ti_ETH_MOC: 117,
        RTX3080ti_ETH_WATY: 300,
        RTX3080ti_BEAM_MOC: 54,
        RTX3080ti_BEAM_WATY: 280,
        RTX3080ti_RVN_MOC: 49,
        RTX3080ti_RVN_WATY: 280,
        RTX3080ti_CTX_MOC: 55,
        RTX3080ti_CTX_WATY: 320,

        RTX3080_ETH_MOC: 98,
        RTX3080_ETH_WATY: 240,
        RTX3080_BEAM_MOC: 46.50,
        RTX3080_BEAM_WATY: 250,
        RTX3080_RVN_MOC: 39.50,
        RTX3080_RVN_WATY: 250,
        RTX3080_CTX_MOC: 4.40,
        RTX3080_CTX_WATY: 230,

        RTX3070ti_ETH_MOC: 80,
        RTX3070ti_ETH_WATY: 200,
        RTX3070ti_BEAM_MOC: 35,
        RTX3070ti_BEAM_WATY: 180,
        RTX3070ti_RVN_MOC: 39.50,
        RTX3070ti_RVN_WATY: 250,
        RTX3070ti_CTX_MOC: 3.50,
        RTX3070ti_CTX_WATY: 169,

        RTX3070_ETH_MOC: 98,
        RTX3070_ETH_WATY: 240,
        RTX3070_BEAM_MOC: 46.50,
        RTX3070_BEAM_WATY: 250,
        RTX3070_RVN_MOC: 39.50,
        RTX3070_RVN_WATY: 250,
        RTX3070_CTX_MOC: 4.40,
        RTX3070_CTX_WATY: 230,

        RTX3060ti_ETH_MOC: 60,
        RTX3060ti_ETH_WATY: 140,
        RTX3060ti_BEAM_MOC: 32.50,
        RTX3060ti_BEAM_WATY: 190,
        RTX3060ti_RVN_MOC: 27,
        RTX3060ti_RVN_WATY: 190,
        RTX3060ti_CTX_MOC: 3.26,
        RTX3060ti_CTX_WATY: 149,

        RTX3060_ETH_MOC: 41,
        RTX3060_ETH_WATY: 110,
        RTX3060_BEAM_MOC: 22,
        RTX3060_BEAM_WATY: 140,
        RTX3060_RVN_MOC: 22,
        RTX3060_RVN_WATY: 140,
        RTX3060_CTX_MOC: 2.30,
        RTX3060_CTX_WATY: 120,

        RTX2080ti_ETH_MOC: 55.20,
        RTX2080ti_ETH_WATY: 180,
        RTX2080ti_BEAM_MOC: 37.80,
        RTX2080ti_BEAM_WATY: 220,
        RTX2080ti_RVN_MOC: 31.50,
        RTX2080ti_RVN_WATY: 220,
        RTX2080ti_CTX_MOC: 3.80,
        RTX2080ti_CTX_WATY: 170,



    }
]
const amd = [
    {
        RX6900XT_ETH_MOC: 62.91,
        RX6900XT_ETH_WATY: 143,
        RX6900XT_BEAM_MOC: 33.30,
        RX6900XT_BEAM_WATY: 140,
        RX6900XT_RVN_MOC: 33.56,
        RX6900XT_RVN_WATY: 166,
        RX6900XT_CTX_MOC: 3.80,
        RX6900XT_CTX_WATY: 199,

        RX6800XT_ETH_MOC: 63.20,
        RX6800XT_ETH_WATY: 104,
        RX6800XT_BEAM_MOC: 36,
        RX6800XT_BEAM_WATY: 150,
        RX6800XT_RVN_MOC: 33,
        RX6800XT_RVN_WATY: 200,
        RX6800XT_CTX_MOC: 3.53,
        RX6800XT_CTX_WATY: 186,

        RX6800_ETH_MOC: 61,
        RX6800_ETH_WATY: 110,
        RX6800_BEAM_MOC: 32.58,
        RX6800_BEAM_WATY: 100,
        RX6800_RVN_MOC: 33,
        RX6800_RVN_WATY: 143,
        RX6800_CTX_MOC: 2.90,
        RX6800_CTX_WATY: 173,

        RX6700XT_ETH_MOC: 46,
        RX6700XT_ETH_WATY: 100,
        RX6700XT_BEAM_MOC: 22,
        RX6700XT_BEAM_WATY: 120,
        RX6700XT_RVN_MOC: 22,
        RX6700XT_RVN_WATY: 120,
        RX6700XT_CTX_MOC: 2.20,
        RX6700XT_CTX_WATY: 150,

        RX6600XT_ETH_MOC: 32,
        RX6600XT_ETH_WATY: 70,
        RX6600XT_BEAM_MOC: 20,
        RX6600XT_BEAM_WATY: 130,
        RX6600XT_RVN_MOC: 16,
        RX6600XT_RVN_WATY: 110,
        RX6600XT_CTX_MOC: 1.60,
        RX6600XT_CTX_WATY: 110,

        RX5500XT_ETH_MOC: 26,
        RX5500XT_ETH_WATY: 90,
        RX5500XT_BEAM_MOC: 12.8,
        RX5500XT_BEAM_WATY: 90,
        RX5500XT_RVN_MOC: 9,
        RX5500XT_RVN_WATY: 90,
        RX5500XT_CTX_MOC: 1.20,
        RX5500XT_CTX_WATY: 90,
    }
]
const dane = [{
    mnoznik: 86400,
    mnoznik2: 13.68,
}]
const priceETH = []
const networkHashRateETH=[]
const blockrewardETH=[]
const priceBEAM = []
const networkHashRateBEAM=[]
const blockrewardBEAM=[]
const priceRVN = []
const networkHashRateRVN=[]
const blockrewardRVN=[]
const priceCTX = []
const networkHashRateCTX=[]
const blockrewardCTX=[]
const walutazl=[]




app.get('/',(req, res)=>{
    res.json('Witaj w mojej kuchni')
})
app.get("/crypto", async (req, res) =>
{

    crypto.forEach(crypto => {
        axios.get(crypto.address)
            .then(response =>{
                const html = response.data
                const $ = cheerio.load(html)
                $('.briNjb',html).each(function lol1(){
                    const price = $(this).text()
                    const price2 = parseFloat(price.replace(',', ''))
                    priceETH.shift()
                    priceETH.push({
                        PriceETH: price2
                    })
                })

                $('.hash-value',html).each(function lol2(){
                    const network = $(this).text()
                    const network2 = parseFloat(network)
                    networkHashRateETH.shift()
                    networkHashRateETH.push({
                        Network: network2
                    })


                })
                $('div.textfill-block.reward-info.flex.justify-center',html).each(function lol3(){
                    const block = $(this).text()
                    const block2 = parseFloat(block)
                    const block3 = block2/1000
                    blockrewardETH.shift()
                    blockrewardETH.push({
                        Block: block2
                    })


                })

            })

    })
    beam.forEach(beam => {
        axios.get(beam.address)
            .then(response =>{
                const html = response.data
                const $ = cheerio.load(html)
                $('.css-12ujz79',html).each(function lol1(){
                    const price = $(this).text()
                    const price2 = parseFloat(price.replace('$', ''))
                    priceBEAM.shift()
                    priceBEAM.push({
                        PriceBEAM: price2
                    })
                })

                $('.hash-value',html).each(function lol2(){
                    const network = $(this).text()
                    const network2 = parseFloat(network)
                    networkHashRateBEAM.shift()
                    networkHashRateBEAM.push({
                        Network: network2
                    })


                })
                $('div.textfill-block.reward-info.flex.justify-center',html).each(function lol3(){
                    const block = $(this).text()
                    const block2 = parseFloat(block)
                    const block3 = block2/1000
                    blockrewardBEAM.shift()
                    blockrewardBEAM.push({
                        Block: block2
                    })


                })

            })

    })
    rvn.forEach(rvn => {
        axios.get(rvn.address)
            .then(response =>{
                const html = response.data
                const $ = cheerio.load(html)
                $('.css-12ujz79',html).each(function lol1(){
                    const price = $(this).text()
                    const price2 = parseFloat(price.replace('$', ''))
                    priceRVN.shift()
                    priceRVN.push({
                        PriceRVN: price2
                    })
                })

                $('.hash-value',html).each(function lol2(){
                    const network = $(this).text()
                    const network2 = parseFloat(network)
                    networkHashRateRVN.shift()
                    networkHashRateRVN.push({
                        Network: network2
                    })


                })
                $('div.textfill-block.reward-info.flex.justify-center',html).each(function lol3(){
                    const block = $(this).text()
                    const block2 = parseFloat(block)
                    const block3 = block2/1000
                    blockrewardRVN.shift()
                    blockrewardRVN.push({
                        Block: block2
                    })


                })

            })

    })
    ctx.forEach(ctx => {
        axios.get(ctx.address)
            .then(response =>{
                const html = response.data
                const $ = cheerio.load(html)
                $('.css-12ujz79',html).each(function lol1(){
                    const price = $(this).text()
                    const price2 = parseFloat(price.replace('$', ''))
                    priceCTX.shift()
                    priceCTX.push({
                        Price: price2
                    })
                })

                $('.hash-value',html).each(function lol2(){
                    const network = $(this).text()
                    const network2 = parseFloat(network)
                    networkHashRateCTX.shift()
                    networkHashRateCTX.push({
                        Network: network2
                    })


                })
                $('div.textfill-block.reward-info.flex.justify-center',html).each(function lol3(){
                    const block = $(this).text()
                    const block2 = parseFloat(block)
                    const block3 = block2/1000
                    blockrewardCTX.shift()
                    blockrewardCTX.push({
                        Block: block2
                    })


                })

            })

    })
    waluta.forEach(waluta => {
        axios.get(waluta.address)
            .then(response =>{
                const html = response.data
                const $ = cheerio.load(html)
                $('.profilLast',html).each(function lol3(){
                    const zll = $(this).text()
                    const zll2 = parseFloat(zll.replace(',','.'))
                    if(walutazl.length===0){
                        console.log(`Posiada ${walutazl.length}`)
                        walutazl.push({
                            przewalutowanie: zll2
                        })
                    }
                    else{
                        walutazl.shift()
                        walutazl.push({
                            przewalutowanie: zll2
                        })
                    }




                })

            })

    })
res.json({
    priceETH,
    networkHashRateETH,
    blockrewardETH,
    priceBEAM,
    networkHashRateBEAM,
    blockrewardBEAM,
    priceRVN,
    networkHashRateRVN,
    blockrewardRVN,
    priceCTX,
    networkHashRateCTX,
    blockrewardCTX,
    nividia,
    amd,
    dane,
    walutazl

})










})











app.listen(PORT, ()=> console.log(`serwer dziala na PORT ${PORT}`))
