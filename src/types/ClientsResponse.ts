// Generated by https://quicktype.io

export interface ClientsResponse {
  documents: Document[]
}

export interface Document {
  _id: string
  name: string
  company: string
  email: string
  telephone: number
  notes?: string
}
