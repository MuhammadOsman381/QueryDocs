import toast from "react-hot-toast"

const ValidateData = (fields: any[]): boolean => {
  for (const field of fields) {
    if (field === null || field === undefined || field === "") {
      toast.error("Please fill all the fields")
      return false
    }
  }
  return true
}

export { ValidateData }
