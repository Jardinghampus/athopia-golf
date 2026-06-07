import type { Metadata } from 'next'
import { FeedClient } from './FeedClient'

export const metadata: Metadata = {
  title: 'Golf Feed | Athopia Golf',
  description: 'Senaste golfnyheter, analyser och forum.',
}

export default function FeedPage() {
  return <FeedClient />
}
