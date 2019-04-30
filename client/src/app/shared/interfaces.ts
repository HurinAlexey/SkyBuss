export interface User {
  login?: string,
  email?: string,
  password: string
}

export interface Category {
  name: string,
  imageSrc?: string,
  description: string,
  cost?: number,
  devTime?: number,
  _id?: string
}

export interface Project {
  name: string,
  url: string,
  description: string,
  imageSrc?: string,
  category?: string,
  date?: Date,
  _id?: string
}

export interface Message {
  message: string
}

export interface Mail {
  name: string,
  email: string,
  phone?: string,
  subject?: string,
  message?: string
}
