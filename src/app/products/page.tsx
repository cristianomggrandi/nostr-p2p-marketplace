"use client"

import { Event, Filter, SimplePool } from "nostr-tools"
import { useEffect, useState } from "react"
import Product from "./components/Product"

const RELAYS = [
    "wss://dev-relay.nostrassets.com",
    "wss://relay.nostrassets.com",
    "wss://relay.varke.eu",
    "wss://nostr.dogdogback.com",
    "wss://nostr.neilalexander.dev",
    "wss://nostr.rubberdoll.cc",
    "wss://global-relay.cesc.trade",
    "wss://relay.bitcoinbarcelona.xyz",
    "wss://nostr-verif.slothy.win",
    // "wss://khatru.puhcho.me",
    // "wss://nostrue.com",
    // "wss://kmc-nostr.amiunderwater.com",
    // "wss://nostr.primz.org",
    // "wss://relay.hrf.org",
    // "wss://nostr.getgle.org",
    // "wss://nostr.sixteensixtyone.com",
    // "wss://nostr.fairshare.social",
    // "wss://nostr.1661.io",
    // "wss://relay.usefusion.ai",
    // "wss://nostr.sethforprivacy.com",
    // "wss://beta.1661.io",
    // "wss://nostr.comunidadecancaonova.com",
    // "wss://nostr.8777.ch",
    // "wss://relay.deezy.io",
    // "wss://relay.shitforce.one",
    // "wss://relay2.blogstr.app",
    // "wss://nostr.roundrockbitcoiners.com",
    // "wss://nostr.wine",
    // "wss://relay.nostr.ai",
    // "wss://relay.toastr.space",
    // "wss://dev.nostrplayground.com",
    // "wss://relay.stemstr.app",
    // "wss://nostr.laevateinn.org",
    // "wss://relay.nostpy.lol",
    // "wss://paid.nostr.lc",
    // "wss://nostr.girino.org",
    // "wss://nostr.mining.sc",
    // "wss://relay.wavlake.com",
    // "wss://relay.danvergara.com",
    // "wss://nostr.topeth.info",
    // "wss://relay.s3x.social",
    // "wss://relay.nostrosity.com",
    // "wss://nostr.lorentz.is",
    // "wss://santo.iguanatech.net",
    // "wss://relay.corpum.com",
    // "wss://nostr3.actn.io",
    // "wss://relay.nostr.sc",
    // "wss://relay.vanderwarker.family",
    // "wss://rnostr.onrender.com",
    // "wss://relay.earthly.land",
    // "wss://relay.orange-crush.com",
    // "wss://nostr.bolt.fun",
    // "wss://nostr.atlbitlab.com",
    // "wss://relay.magiccity.live",
    // "wss://relay.oldcity-bitcoiners.info",
    // "wss://dev-relay.kube.b-n.space",
    // "wss://rly.nostrkid.com",
    // "wss://nostr.liberty.fans",
    // "wss://relay.roygbiv.guide",
    // "wss://nostr.coincrowd.fund",
    // "wss://lightningrelay.com",
    // "wss://relay.devstr.org",
    // "wss://relay.haths.cc",
    // "wss://rly.bopln.com",
    // "wss://relay.strfront.com",
    // "wss://nostr-relay.texashedge.xyz",
    // "wss://nostr.zenon.info",
    // "wss://nostr.libreleaf.com",
    // "wss://nostr.gerbils.online",
    // "wss://nostr.notribe.net",
    // "wss://nostr.randomdevelopment.biz",
    // "wss://freespeech.casa",
    // "wss://relay.farscapian.com",
    // "wss://arc1.arcadelabs.co",
    // "wss://us.nostr.wine",
    // "wss://nostr.overmind.lol",
    // "wss://rss.nos.social",
    // "wss://relay.nostrology.org",
    // "wss://remnant.cloud",
    // "wss://nostr.asdf.mx",
    // "wss://nostr.danvergara.com",
    // "wss://dash.mockingyou.com",
    // "wss://anon.computer",
    // "wss://nostr.sectiontwo.org",
    // "wss://nostr.pjv.me",
    // "wss://relay.pleb.to",
    // "wss://cellar.nostr.wine",
    // "wss://relay.nostrid.com",
    // "wss://nostr.tools.global.id",
    // "wss://carlos-cdb.top",
    // "wss://nostr.extrabits.io",
    // "wss://nostr.dvdt.dev",
    // "wss://jingle.carlos-cdb.top",
    // "wss://relay.gems.xyz",
    // "wss://nostr.decentony.com",
    // "wss://nostr.gocharlie.ai",
    // "wss://relay.protest.net",
    // "wss://nostr.messagepush.io",
    // "wss://testnet.plebnet.dev/nostrrelay/1",
    // "wss://nostr.intrepid18.com",
    // "wss://nostr-usa.ka1gbeoa21bnm.us-west-2.cs.amazonlightsail.com",
    // "wss://stlouis.scarab.im",
    // "wss://nostr-tbd.website",
    // "wss://nostr.hekster.org",
    // "wss://nostr.slothy.win",
    // "wss://relay.sovereign-stack.org",
    // "wss://relay.tunestr.io",
    // "wss://nostr.rocketnode.space",
    // "wss://n.wingu.se",
    // "wss://relay.timechaindex.com",
    // "wss://nostr.bch.ninja",
    // "wss://nostr.orangepill.dev",
    // "wss://relay.orangepill.dev",
    // "wss://relay.lawallet.ar",
    // "wss://nostr-relay.schnitzel.world",
    // "wss://nostr.438b.net",
    // "wss://287avuahggadsd213rg18aga3yg3whg8g8afg.xyz",
    // "wss://creatr.nostr.wine",
    // "wss://kadargo.zw.is",
    // "wss://a214g24132sa2fas354411f234125.xyz",
    // "wss://23asdfasf2r341gnbrrhjhwggadffgasfsadfasafa.xyz",
    // "wss://sfgbsfg431512asf124as.xyz",
    // "wss://relay.johnnyasantos.com",
    // "wss://nostr.uthark.com",
    // "wss://relay.0v0.social",
    // "wss://relay.honk.pw",
    // "wss://relay.causes.com",
    // "wss://r.hostr.cc",
    // "wss://nostr.globals.fans",
    // "wss://taipei.scarab.im",
    // "wss://itchy-goldenrod-furconthophagus.scarab.im",
    // "wss://nostr-relay.bitcoin.ninja",
    // "wss://paid.relay.vanderwarker.family",
    // "wss://jovial-fuchsia-euhyboma.scarab.im",
    // "wss://nostr.dmgd.monster",
    // "wss://bostr.nokotaro.work",
    // "wss://bbb.santos.lol",
    // "wss://tnruygu.cn",
    // "wss://nostr.lnwallet.app",
    // "wss://nostr-relay.psfoundation.info",
    // "wss://inbox.nostr.wine",
    // "wss://gjmhmhgi789hjgdyerysergdfvbncte.fyi",
    // "wss://nostr.animeomake.com",
    // "wss://sats.lnaddy.com/nostrclient/api/v1/relay",
    // "wss://nostr.fort-btc.club",
    // "wss://relay.keychat.io",
    // "wss://hongkong.scarab.im",
    // "wss://nostr.hashi.sbs",
    // "wss://relay.nostar.org",
    // "wss://ragnar-relay.com",
    // "wss://nostr-verified.wellorder.net",
    // "wss://relay-pub.deschooling.us",
    // "wss://deschooling.us",
    // "wss://relay-verified.deschooling.us",
]

const FILTERS: Filter[] = [
    {
        kinds: [30017, 30018],
        limit: 10,
    },
]

export default function Products() {
    const [pool, setPool] = useState<SimplePool | null>(null)

    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        const pool = new SimplePool()

        setPool(pool)

        return () => pool.close(RELAYS)
    }, [])

    useEffect(() => {
        if (!pool) return

        let count = 0

        const h = pool.subscribeMany(RELAYS, FILTERS, {
            onevent(e) {
                // console.log(++count, event)
                setEvents(prev => [...prev, e])
            },
            oneose() {
                h.close()
            },
        })

        return () => h.close()
    }, [pool])

    return (
        <main className="grid gap-6 min-h-screen grid-cols-3 items-center justify-between p-24">
            {events.map(event => (
                <Product key={event.id} event={event} />
            ))}
        </main>
    )
}
