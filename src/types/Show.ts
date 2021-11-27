export interface IShow {
  id: string
  title: string
  imageSrc?: string
  premiered?: string
  summary?: string
}

export interface ICard {
  show: IShow
  state: boolean
  id: string
  onAddShow: (show: IShow) => void
  onRemoveShow: (id: string) => void
}
