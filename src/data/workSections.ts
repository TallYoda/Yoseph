import type { ArtworkCategory } from '../types/artwork'

export type WorkSection = {
  title: string
  description?: string
}

export const workSections: Record<ArtworkCategory, WorkSection> = {
  painting: {
    title: 'Paintings'
  },
  digital: {
    title: 'Digital Art',
    description: 'In my digital abstract paintings, I use generative tools and digital manipulation to explore themes of fragmentation, memory, and transformation. These works are visual meditations on the flow of information, the instability of identity, and the blurring boundaries between the real and the virtual. I’m particularly drawn to how abstraction allows for openness and multiplicity—each piece acts as a kind of digital diary, layered with texture, rhythm, and code'
  },
  installation: {
    title: 'Installation Art',
    description: 'My installation work transforms physical environments into immersive experiences that invite viewers to engage with space in new ways—physically, mentally, and emotionally. I often incorporate light, sound, and found objects to create environments that feel both alien and intimate, evoking a sense of tension between the organic and the synthetic.'
  }
} as Record<ArtworkCategory, WorkSection>
