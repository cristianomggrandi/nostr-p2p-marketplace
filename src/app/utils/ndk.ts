import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk"
import RELAYS from "./relays"

const nip07signer = new NDKNip07Signer()

const ndk = new NDK({
    explicitRelayUrls: RELAYS,
    signer: nip07signer,
})

ndk.connect()
    .then(() => console.log("ndk connected"))
    .catch(error => console.log("ndk error connecting", error))

export default ndk
