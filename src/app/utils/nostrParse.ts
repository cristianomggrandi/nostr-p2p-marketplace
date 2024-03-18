import { NDKEvent } from "@nostr-dev-kit/ndk"

function getFirstTagOfType(event: NDKEvent, tagType: string) {
    return event.tags.find(tag => tag[0] === tagType)
}

export { getFirstTagOfType }
