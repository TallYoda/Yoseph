export type ExhibitionImage = {
  id: string
  src: string
  thumb: string
  alt: string
}

export const exhibitionImages: ExhibitionImage[] = [
  {
    id: 'ex-1',
    src: '/exhibitions/img_1_1780404208347.jpg',
    thumb: '/exhibitions/thumbs/img_1_1780404208347.jpg',
    alt: 'Exhibition photo 1'
  },
  {
    id: 'ex-2',
    src: '/exhibitions/img_2_1780404232094.jpg',
    thumb: '/exhibitions/thumbs/img_2_1780404232094.jpg',
    alt: 'Exhibition photo 2'
  },
  {
    id: 'ex-3',
    src: '/exhibitions/img_3_1780404239741.jpg',
    thumb: '/exhibitions/thumbs/img_3_1780404239741.jpg',
    alt: 'Exhibition photo 3'
  },
  {
    id: 'ex-4',
    src: '/exhibitions/img_4_1780404254370.jpg',
    thumb: '/exhibitions/thumbs/img_4_1780404254370.jpg',
    alt: 'Exhibition photo 4'
  }
] as ExhibitionImage[]
