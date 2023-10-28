interface SelectItem {
    value: String,
    title: String
}


// Stores
interface CommonDataStore {
    genders: SelectItem[]
}

interface AuthStore {
    userId: Number
    name: String
    email: String
    lastName: String,
    phone: String,
    sex: String,
    birthdate: String,
    weight: Number,
    height: Number,
    address: String,
    city: String,
    zip: Number,
    country: String,
    avatar: String,
    role: String
  }