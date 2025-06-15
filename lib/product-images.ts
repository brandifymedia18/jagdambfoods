// Mapping of product IDs to their respective image URLs
// This allows us to easily assign different images to each product

export const productImages: Record<string, string> = {
  // Sample Products
  "sample-kaccha-mango-100gm": "/fruite.jpeg?height=600&width=600&text=Kaccha+Mango+Bar",
  "sample-kaccha-mango-burfi-500gm": "/imli3.jpg?height=600&width=600&text=Mango+Burfi",
  "sample-imli-candy-250gm": "/imlicandy.jpeg?height=600&width=600&text=Imli+Candy",
  "sample-kachha-mango-candy-250gm": "/kacchamango.jpeg?height=600&width=600&text=Mango+Candy",
  "sample-mango-burfi-500gm": "/mangobar.jpg?height=600&width=600&text=Mango+Burfi+500g",
  "sample-green-mango-cube-500gm": "/mangobar1.jpg?height=600&width=600&text=Green+Mango+Cube",
  "sample-mango-cube-500gm": "/mangobar2.jpg?height=600&width=600&text=Mango+Cube+Bar",
  "sample-dobull-imli-candy-500gm": "/dimli.png?height=600&width=600&text=Dobull+Imli+Candy",
  
  "sample-dobull-imli-candy-500": "/mango.jpeg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5001": "/kairi.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5002": "/imli.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5003": "/imli2.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5004": "/imli4.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5005": "/imli5.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5006": "/imli6.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5007": "/imli7.jpg?height=600&width=600&text=Dobull+Imli+Candy",

  // Bulk Products
  "kaccha-mango-100gm": "/mangoammpapad.jpg?height=600&width=600&text=Bulk+Kaccha+Mango",
  "kaccha-mango-burfi-500gm": "/imlipapad.jpg?height=600&width=600&text=Bulk+Mango+Burfi",
  "imli-candy-250gm": "/kacchammpapad.jpg?height=600&width=600&text=Bulk+Imli+Candy",
  "kachha-mango-candy-250gm": "/placeholder.svg?height=600&width=600&text=Bulk+Mango+Candy",
  "mango-burfi-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Mango+Burfi+500g",
  "green-mango-cube-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Green+Mango",
  "mango-cube-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Mango+Cube",
  "dobull-imli-candy-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Dobull+Imli",
  "sample-imli-candy-250gm1": "/imlicandy.jpeg?height=600&width=600&text=Imli+Candy",
  "sample-kachha-mango-candy-250gm2": "/kacchamango.jpeg?height=600&width=600&text=Mango+Candy",
   "sample-dobull-imli-candy-500gm3": "/mango.jpeg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-5006a": "/imli6.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-50011": "/kairi.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-500gm1": "/dimli.png?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-50041": "/imli4.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  "sample-dobull-imli-candy-50071": "/imli7.jpg?height=600&width=600&text=Dobull+Imli+Candy",
  
  "dobull-imli-candy-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Dobull+Imli",
  "dobull-imli-candy-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Dobull+Imli",
  "dobull-imli-candy-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Dobull+Imli",
  "dobull-imli-candy-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Dobull+Imli",
  "dobull-imli-candy-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Dobull+Imli",
  "dobull-imli-candy-500gm": "/placeholder.svg?height=600&width=600&text=Bulk+Dobull+Imli",
 

  // Default image for any product without a specific image
  default: "/placeholder.svg?height=600&width=600&text=Jagdamb+Foods",
}

// Function to get the image URL for a product
export function getProductImage(productId: string): string {
  return productImages[productId] || productImages.default
}
