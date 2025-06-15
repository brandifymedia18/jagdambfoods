"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Building,
  MessageCircle,
  Plus,
  Minus,
  Star,
  Users,
  Award,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { getProductImage } from "@/lib/product-images"

interface CustomerDetails {
  companyName: string
  phoneNumber: string
  email: string
  address: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  unit: string
  specifications: string[]
  category: "sample" | "bulk"
  defaultQuantity: number
}

interface SelectedProduct {
  productId: string
  quantity: number
}

const products: Product[] = [
  // Sample Products - same as bulk products
  {
    id: "sample-kaccha-mango-100gm",
    name: "100gm Kaccha Mango Fruit Bar",
    description: "Fresh and tangy raw mango fruit bar",
    price: 50,
    unit: "Pack",
    specifications: ["Packaging Type: Packet", "Color: Green", "Weight: 100gm","From: Dried Slab"],
    category: "sample",
    defaultQuantity: 5,
  },
  {
    id: "sample-kaccha-mango-burfi-500gm",
    name: "500gm Imli Fruit Bar Burfi",
    description: "Sweet and sour tamarind burfi",
    price: 250,
    unit: "Pack",
    specifications: ["Type: Toffee","Packaging Type: Packet", "Color: Brown", ""],
    category: "sample",
    defaultQuantity: 2,
  },
  {
    id: "sample-imli-candy-250gm",
    name: "250gm Imli Candy",
    description: "Sweet and sour tamarind candy",
    price: 120,
    unit: "Jar",
    specifications: ["Best Before: 6 Months", "Shape: Rectangular", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "sample",
    defaultQuantity: 3,
  },
  {
    id: "sample-kachha-mango-candy-250gm",
    name: "250gm Kachha Mango Candy",
    description: "Raw mango flavoured candy",
    price: 120,
    unit: "Box",
    specifications: ["Packaging Type: Plastic Jar", "Color: Green", "Best Before: 6 Months","Shape: Rectanglular"],
    category: "sample",
    defaultQuantity: 3,
  },
  {
    id: "sample-green-mango-cube-500gm",
    name: "500gm Green Mango Fruit Cube Bar ",
    description: "Cube-shaped green mango fruit bars",
    price: 250,
    unit: "Pack",
    specifications: ["Type: Toffee", "Shape: Rectangular", "Packaging Type: Packet","Color: Green"],
    category: "sample",
    defaultQuantity: 2,
  },
  {
    id: "sample-mango-cube-500gm",
    name: "100gm Mango Fruit Cube Bar ",
    description: "Delicious mango cube bars",
    price: 50,
    unit: "Pack",
    specifications: ["Packaging Type: Loose", "Color: Yellow", "Form: Dried Slab"],
    category: "sample",
    defaultQuantity: 2,
  },
  {
    id: "sample-dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet","Color: Brown"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-500",
    name: "250gm Mango Toffee Candy",
    description: "Sweet Mango with Natural Flavour",
    price: 120,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Rectangular", "Packaging Type: Plastic Jar"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5001",
    name: "500gm Dobull Kairi Boom Candy",
    description: "Fresh and tangy raw mango candy",
    price: 100,
    unit: "Box",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic jar","Color: Green"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5002",
    name: "100gm Double Imli Boom Candy",
    description: "Premium tamarind  candy",
    price: 30,
    unit: "Jar",
    specifications: ["Best Before: 6 Months", "Shape: Rectangular", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5003",
    name: "100gm Chammach Imli Boom Candy",
    description: "Premium tamarind chammach candy",
    price: 15,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5004",
    name: "100gm Imli Boom Candy",
    description: "Premium tamarind boom candy ",
    price: 50,
    unit: "Jar",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5005",
    name: "100gm Imli Fruit Bar",
    description: "Premium tamarind Fruit Bar with unique taste",
    price: 50,
    unit: "Pack",
    specifications: ["Weight: 100gm", "Color: Brown", "Packaging Type: Packet"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5006",
    name: "Chammach Dobull Imli Boom Candy",
    description: "Premium tamarind candy with unique taste",
    price: 100,
    unit: "Jar",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5007",
    name: "500gm Jet Imli Boom Candy",
    description: "Premium tamarind jet imli candy ",
    price: 90,
    unit: "Jar",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "sample",
    defaultQuantity: 4,
  },
  /* {
    id: "sample-dobull-imli-candy-5006",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5006",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5006",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "sample",
    defaultQuantity: 4,
  },
  {
    id: "sample-dobull-imli-candy-5006",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "sample",
    defaultQuantity: 4,
  },*/
  
  
  // Bulk Products
  {
    id: "kaccha-mango-100gm",
    name: "1 Box (32Kg) Mango Fruit Bar",
    description: "Delicious mango cube bars",
    price: 5760,
    unit: "Box",
    specifications: ["Packaging Type: Box", "Color: Yellow", "Weight: 32Kg","From: Dried Slab"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "kaccha-mango-burfi-500gm",
    name: "1 Box (32Kg) Imli Fruit Bar",
    description: "Sweet and sour tamarind cube bars",
    price: 5760,
    unit: "Box",
    specifications: ["Packaging Size: 32Kg", "Flavour: Imli", "Packaging Type: Packet","Color: Brown"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "imli-candy-250gm",
    name: "1 Box (32Kg) Kaccha Mango Fruit Bar",
    description: "Fresh and tangy raw mango",
    price: 5760,
    unit: "Box",
    specifications: ["Package Size: 32kg", "Color: Green", "Packaging Type: Packet","From : Dried Slab"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-mango-burfi-500gm",
    name: "1 Box (32Kg) Mango Aam Papad",
    description: "Sweet mango burfi with natural flavours",
    price: 5760,
    unit: "Box",
    specifications: ["Packaging Size: 32Kg", "Flavour: Mango", "Packaging Type: Pack","Shelf Life: 6 Months"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-imli-candy-250gm1",
    name: "1 Box (30Jar) 250gm Imli Candy",
    description: "Sweet and sour tamarind candy",
    price: 1950,
    unit: "Box",
    specifications: ["Best Before: 6 Months", "Shape: Rectangular", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-kachha-mango-candy-250gm2",
    name: "1 Box (30Jar) 250gm Kachha Mango Candy",
    description: "Raw mango flavoured candy",
    price: 1950,
    unit: "Box",
    specifications: ["Packaging Type: Plastic Jar", "Color: Green", "Best Before: 6 Months","Shape: Rectanglular"],
    category: "bulk",
    defaultQuantity: 5,
  },
   {
    id: "sample-dobull-imli-candy-500gm3",
    name: "1 Box (30Jar) 250gm Mango Toffee Candy",
    description: "Sweet Mango with Natural Flavour",
    price: 1950,
    unit: "Box",
    specifications: ["Best Before: 6 Months", "Shape: Rectangular", "Packaging Type: Plastic Jar"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-dobull-imli-candy-5006a",
    name: "1 Box (15Jar) Chammach Dobull Imli Boom Candy",
    description: "Premium tamarind candy with unique taste",
    price: 1500,
    unit: "Box",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-dobull-imli-candy-50011",
    name: "1 Box (30 Jar) 500gm Double Kairi Boom Candy",
    description: "Fresh and tangy raw mango candy",
    price: 1950,
    unit: "Box",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic jar","Color: Green"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-dobull-imli-candy-500gm1",
    name: "1 bag (50 pouch) 500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 3250,
    unit: "bag",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet","Color: Brown"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-dobull-imli-candy-50041",
    name: "1 Box (30 Jar) 100gm Imli Boom laddu",
    description: "Premium tamarind boom laddu",
    price: 1500,
    unit: "box",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "bulk",
    defaultQuantity: 5,
  },
  {
    id: "sample-dobull-imli-candy-50071",
    name: "1 Box (30 Jar) 500gm Jet Imli Boom Candy",
    description: "Premium tamarind jet imli candy ",
    price: 1950,
    unit: "Box",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Plastic Jar","Color: Brown"],
    category: "bulk",
    defaultQuantity: 4,
  },
 /* {
    id: "kachha-mango-candy-250gm",
    name: "250gm Kachha Mango Candy",
    description: "Raw mango flavored candy",
    price: 120,
    unit: "Box",
    specifications: ["Packaging Type: Plastic Jar", "Color: Green", "Best Before: 6 Months"],
    category: "bulk",
    defaultQuantity: 3,
  },
  {
    id: "mango-burfi-500gm",
    name: "Mango Fruit Bar Burfi 500gm",
    description: "Sweet mango burfi with natural flavors",
    price: 250,
    unit: "Kg",
    specifications: ["Packaging Size: 500 g", "Type Of Sweetener: Sugar", "Preservative Type: No Preservatives Added"],
    category: "bulk",
    defaultQuantity: 2,
  },
  {
    id: "green-mango-cube-500gm",
    name: "Green Mango Fruit Cube Bar 500gm",
    description: "Cube-shaped green mango fruit bars",
    price: 250,
    unit: "Pack",
    specifications: ["Type: Toffee", "Shape: Rectangular", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 2,
  },
  {
    id: "mango-cube-500gm",
    name: "Mango Fruit Cube Bar 500gm",
    description: "Delicious mango cube bars",
    price: 250,
    unit: "Kg",
    specifications: ["Packaging Size: 500 g", "Type Of Sweetener: Sugar", "Preservative Type: Natural Preservatives"],
    category: "bulk",
    defaultQuantity: 2,
  },
  {
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },
  /*{
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },
  {
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },
  {
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },
  {
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },
  {
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },
  {
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },
  {
    id: "dobull-imli-candy-500gm",
    name: "500gm Dobull Imli Candy",
    description: "Premium tamarind candy with unique taste",
    price: 90,
    unit: "Pack",
    specifications: ["Best Before: 6 Months", "Shape: Round", "Packaging Type: Packet"],
    category: "bulk",
    defaultQuantity: 4,
  },*/
]

export default function JagdambFoodsWebsite() {
  const [currentPage, setCurrentPage] = useState("home") // "home" or "order"
  const [currentStep, setCurrentStep] = useState(1)
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    companyName: "",
    phoneNumber: "",
    email: "",
    address: "",
  })
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  const handleCustomerDetailsChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleProductToggle = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.productId === productId)
      if (existing) {
        return prev.filter((p) => p.productId !== productId)
      } else {
        return [...prev, { productId, quantity: product?.defaultQuantity || 1 }]
      }
    })
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedProducts((prev) => prev.filter((p) => p.productId !== productId))
      return
    }

    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.productId === productId)
      if (existing) {
        return prev.map((p) => (p.productId === productId ? { ...p, quantity } : p))
      } else {
        return [...prev, { productId, quantity }]
      }
    })
  }

  const calculateTotal = () => {
    return selectedProducts.reduce((total, selectedProduct) => {
      const product = products.find((p) => p.id === selectedProduct.productId)
      return total + (product?.price || 0) * selectedProduct.quantity
    }, 0)
  }

  const isStep1Valid = () => {
    return (
      customerDetails.companyName && customerDetails.phoneNumber && customerDetails.email && customerDetails.address
    )
  }

  const isStep2Valid = () => {
    return selectedProducts.length > 0
  }

  const generateSummaryText = () => {
    const selectedProductDetails = selectedProducts
      .map((selectedProduct) => {
        const product = products.find((p) => p.id === selectedProduct.productId)
        return `• ${product?.name} - Qty: ${selectedProduct.quantity} - ₹${(product?.price || 0) * selectedProduct.quantity}`
      })
      .join("\n")

    const summaryText = `*Jagdamb Foods - Order Summary*

*Customer Details:*
Company: ${customerDetails.companyName}
Phone: ${customerDetails.phoneNumber}
Email: ${customerDetails.email}
Address: ${customerDetails.address}

*Selected Products:*
${selectedProductDetails}

*Total Amount: ₹${calculateTotal()}*

Please confirm this order and provide further details.`

    return summaryText
  }

  const copyToClipboard = async () => {
    const summaryText = generateSummaryText()
    try {
      await navigator.clipboard.writeText(summaryText)
      toast({
        title: "Copied to clipboard!",
        description: "Order summary has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or copy manually.",
        variant: "destructive",
      })
    }
  }

  const sendToWhatsAppAndEmail = async () => {
    const summaryText = generateSummaryText()

    // Copy to clipboard
    await copyToClipboard()

    // Save to email (simulate API call)
    try {
      console.log("Saving order data:", {
        customerDetails,
        selectedProducts,
        total: calculateTotal(),
        timestamp: new Date().toISOString(),
      })

      toast({
        title: "Order saved!",
        description: "Your order has been saved to our system.",
      })
    } catch (err) {
      toast({
        title: "Save failed",
        description: "Order could not be saved. Please try again.",
        variant: "destructive",
      })
    }

    // Open WhatsApp
    const encodedMessage = encodeURIComponent(summaryText)
    const whatsappUrl = `https://wa.me/917841940796?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const sendToEmail = async () => {
    const summaryText = generateSummaryText()

    // Copy to clipboard
    await copyToClipboard()

    // Create email link
    const subject = encodeURIComponent("Order Summary - Jagdamb Foods")
    const body = encodeURIComponent(summaryText)
    const emailUrl = `mailto:jagdambfoods03@gmail.com?subject=${subject}&body=${body}`

    // Open email client
    window.location.href = emailUrl

    toast({
      title: "Email client opened!",
      description: "Order summary has been copied and email client opened.",
    })
  }

  const sampleProducts = products.filter((p) => p.category === "sample")
  const bulkProducts = products.filter((p) => p.category === "bulk")

  // Home Page
  if (currentPage === "home") {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        
        
<header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <Image
          src="/logo.png"
          alt="Jagdamb Foods Logo"
          style={{ width: '80', height: '80' }}
          width={80}
          height={80}
        />
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-500">Jagdamb Foods</h1>
          <p className="text-xs md:text-sm text-gray-300 hidden sm:block">Pure Taste, True Tradition</p>
        </div>
      </div>
      <Button
        onClick={() => setCurrentPage("order")}
        className="bg-pink-500 hover:bg-pink-600 text-black font-semibold text-sm md:text-base px-3 py-1 md:px-4 md:py-2"
      >
        Order Now
        <ArrowRight className="w-4 h-4 ml-1 md:ml-2" />
      </Button>
    </div>
  </div>
</header>







        {/* Hero Section */}
        <section className="relative py-10 md:py-16 lg:py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Welcome to <span className="text-pink-500">Jagdamb Foods</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto">
              Discover our premium range of authentic food products and professional services. From traditional mango
              treats to custom branding solutions.
            </p>
            <Button
              onClick={() => setCurrentPage("order")}
              className="bg-pink-500 hover:bg-pink-600 text-black font-semibold text-base md:text-lg px-6 py-2 md:px-8 md:py-4 rounded-lg"
            >
              Start Your Order
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 md:py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white">
              Why Choose Jagdamb Foods?
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="bg-pink-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-2 text-white">Premium Quality</h4>
                <p className="text-sm md:text-base text-gray-400">
                  We use only the finest ingredients and materials to ensure the highest quality products.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-pink-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-2 text-white">Customer Focused</h4>
                <p className="text-sm md:text-base text-gray-400">
                  Our dedicated team ensures every customer receives personalized service and attention.
                </p>
              </div>
              <div className="text-center sm:col-span-2 md:col-span-1">
                <div className="bg-pink-500 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-2 text-white">Trusted Brand</h4>
                <p className="text-sm md:text-base text-gray-400">
                  Years of experience and thousands of satisfied customers make us a trusted choice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 px-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">Ready to Place Your Order?</h3>
            <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8">
              Get started with our easy 3-step ordering process and experience the quality of Jagdamb Foods.
            </p>
            <Button
              onClick={() => setCurrentPage("order")}
              className="bg-pink-500 hover:bg-pink-600 text-black font-semibold text-base md:text-lg px-6 py-2 md:px-8 md:py-4 rounded-lg"
            >
              Place Your Order Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* Footer */}
 <footer className="bg-gray-900 border-t border-gray-800 py-6 md:py-8 px-4">
  <div className="max-w-6xl mx-auto text-center">
    <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
      <Image
        src="/logo.png?text=JF"
        alt="Jagdamb Foods Logo"
        width={80}
        height={80}
        style={{ width: '80px', height: '80px' }}
      />
      <h4 className="text-lg md:text-xl font-bold text-pink-500">Jagdamb Foods</h4>
    </div>
    <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">Pure Taste, True Tradition</p>
    <p className="text-xs md:text-sm text-gray-500">© 2025 Jagdamb Foods. All rights reserved.</p>
  </div>
</footer>


      </div>
    )
  }


  // Order Flow (existing functionality)
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
     <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <Image
          src="/logo.png?height=60&width=60&text=JF"
          alt="Jagdamb Foods Logo"
          width={80}
          height={80}
          style={{ width: '80', height: '80' }}
        />
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-500">Jagdamb Foods</h1>
          <p className="text-xs md:text-sm text-gray-300 hidden sm:block">Pure Taste, True Tradition</p>
        </div>
      </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage("home")}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-sm md:text-base px-3 py-1 md:px-4 md:py-2"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
        {/* Desktop Progress Indicator */}
        <div className="hidden sm:flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-pink-500" : "text-gray-500"}`}>
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-pink-500 text-black" : "bg-gray-700 text-gray-300"}`}
            >
              1
            </div>
            <span className="font-medium text-sm md:text-base">Customer Details</span>
          </div>
          <div className="w-8 md:w-12 h-0.5 bg-gray-700"></div>
          <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-pink-500" : "text-gray-500"}`}>
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-pink-500 text-black" : "bg-gray-700 text-gray-300"}`}
            >
              2
            </div>
            <span className="font-medium text-sm md:text-base">Select Products</span>
          </div>
          <div className="w-8 md:w-12 h-0.5 bg-gray-700"></div>
          <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-pink-500" : "text-gray-500"}`}>
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-pink-500 text-black" : "bg-gray-700 text-gray-300"}`}
            >
              3
            </div>
            <span className="font-medium text-sm md:text-base">Summary</span>
          </div>
        </div>

        {/* Mobile Progress Indicator */}
        <div className="flex sm:hidden items-center justify-center gap-3 mb-6">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? "bg-pink-500 text-black" : currentStep > 1 ? "bg-pink-700 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            1
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? "bg-pink-500 text-black" : currentStep > 2 ? "bg-pink-700 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            2
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 3 ? "bg-pink-500 text-black" : currentStep > 3 ? "bg-pink-700 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            3
          </div>
        </div>

        {/* Step 1: Customer Details */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-800">
            <CardHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-white text-lg md:text-xl">
                <Building className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
                Customer Information
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm md:text-base">
                Please provide your details to get started with our products
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6 py-3 md:py-4 space-y-4 md:space-y-6">
              <div className="space-y-1 md:space-y-2">
                <Label htmlFor="companyName" className="text-white text-sm md:text-base">
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={customerDetails.companyName}
                  onChange={(e) => handleCustomerDetailsChange("companyName", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm md:text-base"
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <Label htmlFor="phoneNumber" className="text-white text-sm md:text-base">
                  Phone Number *
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  value={customerDetails.phoneNumber}
                  onChange={(e) => handleCustomerDetailsChange("phoneNumber", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm md:text-base"
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <Label htmlFor="email" className="text-white text-sm md:text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={customerDetails.email}
                  onChange={(e) => handleCustomerDetailsChange("email", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm md:text-base"
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <Label htmlFor="address" className="text-white text-sm md:text-base">
                  Address *
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  value={customerDetails.address}
                  onChange={(e) => handleCustomerDetailsChange("address", e.target.value)}
                  rows={3}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm md:text-base"
                />
              </div>

              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!isStep1Valid()}
                className="w-full bg-pink-500 hover:bg-pink-600 text-black font-semibold text-sm md:text-base py-2 md:py-3"
              >
                Continue to Products
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Product Selection */}
        {currentStep === 2 && (
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
                <CardTitle className="text-white text-lg md:text-xl">Select Products</CardTitle>
                <CardDescription className="text-gray-400 text-sm md:text-base">
                  Choose from our sample products or bulk products. Edit quantity for each item.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 md:px-6 py-3 md:py-4">
                <Tabs defaultValue="sample" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger
                      value="sample"
                      className="data-[state=active]:bg-pink-500 data-[state=active]:text-black text-sm md:text-base py-1.5 md:py-2"
                    >
                     Sample Products 
                    </TabsTrigger>
                    <TabsTrigger
                      value="bulk"
                      className="data-[state=active]:bg-pink-500 data-[state=active]:text-black text-sm md:text-base py-1.5 md:py-2"
                    >
                      Bulk Products 
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="sample" className="mt-4 md:mt-6">
                    <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
                      {sampleProducts.map((product) => {
                        const selectedProduct = selectedProducts.find((p) => p.productId === product.id)
                        const isSelected = !!selectedProduct

                        return (
                          <div
                            key={product.id}
                            className={`border rounded-lg p-3 md:p-4 transition-all ${
                              isSelected
                                ? "border-pink-500 bg-gray-800"
                                : "border-gray-700 hover:border-gray-600 bg-gray-900"
                            }`}
                          >
                            <div className="space-y-2 md:space-y-3">
                              <div className="aspect-square overflow-hidden rounded">
                                <Image
                                  src={getProductImage(product.id) || "/placeholder.svg"}
                                  alt={product.name}
                                  width={600}
                                  height={600}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex items-start gap-2 md:gap-3">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => handleProductToggle(product.id)}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1">
                                      {product.name}
                                    </h3>
                                    <Badge className="bg-pink-500 text-black text-xs md:text-sm whitespace-nowrap ml-1">
                                      ₹{product.price}/{product.unit}
                                    </Badge>
                                  </div>
                                  <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">
                                    {product.description}
                                  </p>
                                  <div className="mt-1 md:mt-2 space-y-0.5 md:space-y-1">
                                    {product.specifications.map((spec, index) => (
                                      <p key={index} className="text-xs text-gray-500">
                                        {spec}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {isSelected && (
                                <div className="flex items-center gap-2 mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-700">
                                  <span className="text-xs md:text-sm text-gray-400">Quantity:</span>
                                  <div className="flex items-center gap-1 md:gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleQuantityChange(product.id, (selectedProduct?.quantity || 1) - 1)
                                      }
                                      className="h-6 w-6 md:h-8 md:w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                                    >
                                      <Minus className="w-2 h-2 md:w-3 md:h-3" />
                                    </Button>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={selectedProduct?.quantity || product.defaultQuantity}
                                      onChange={(e) =>
                                        handleQuantityChange(product.id, Number.parseInt(e.target.value) || 1)
                                      }
                                      className="w-12 md:w-16 h-6 md:h-8 text-center bg-gray-800 border-gray-600 text-white text-xs md:text-sm"
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleQuantityChange(product.id, (selectedProduct?.quantity || 1) + 1)
                                      }
                                      className="h-6 w-6 md:h-8 md:w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                                    >
                                      <Plus className="w-2 h-2 md:w-3 md:h-3" />
                                    </Button>
                                  </div>
                                  <span className="text-xs md:text-sm text-pink-500 ml-auto">
                                    ₹{product.price * (selectedProduct?.quantity || 1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="bulk" className="mt-4 md:mt-6">
                    <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
                      {bulkProducts.map((product) => {
                        const selectedProduct = selectedProducts.find((p) => p.productId === product.id)
                        const isSelected = !!selectedProduct

                        return (
                          <div
                            key={product.id}
                            className={`border rounded-lg p-3 md:p-4 transition-all ${
                              isSelected
                                ? "border-pink-500 bg-gray-800"
                                : "border-gray-700 hover:border-gray-600 bg-gray-900"
                            }`}
                          >
                            <div className="space-y-2 md:space-y-3">
                              <div className="aspect-square overflow-hidden rounded">
                                <Image
                                  src={getProductImage(product.id) || "/placeholder.svg"}
                                  alt={product.name}
                                  width={600}
                                  height={600}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="flex items-start gap-2 md:gap-3">
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => handleProductToggle(product.id)}
                                  className="mt-1"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1">
                                      {product.name}
                                    </h3>
                                    <Badge className="bg-pink-500 text-black text-xs md:text-sm whitespace-nowrap ml-1">
                                      ₹{product.price}/{product.unit}
                                    </Badge>
                                  </div>
                                  <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">
                                    {product.description}
                                  </p>
                                  <div className="mt-1 md:mt-2 space-y-0.5 md:space-y-1">
                                    {product.specifications.map((spec, index) => (
                                      <p key={index} className="text-xs text-gray-500">
                                        {spec}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {isSelected && (
                                <div className="flex items-center gap-2 mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-700">
                                  <span className="text-xs md:text-sm text-gray-400">Quantity:</span>
                                  <div className="flex items-center gap-1 md:gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleQuantityChange(product.id, (selectedProduct?.quantity || 1) - 1)
                                      }
                                      className="h-6 w-6 md:h-8 md:w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                                    >
                                      <Minus className="w-2 h-2 md:w-3 md:h-3" />
                                    </Button>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={selectedProduct?.quantity || product.defaultQuantity}
                                      onChange={(e) =>
                                        handleQuantityChange(product.id, Number.parseInt(e.target.value) || 1)
                                      }
                                      className="w-12 md:w-16 h-6 md:h-8 text-center bg-gray-800 border-gray-600 text-white text-xs md:text-sm"
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleQuantityChange(product.id, (selectedProduct?.quantity || 1) + 1)
                                      }
                                      className="h-6 w-6 md:h-8 md:w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                                    >
                                      <Plus className="w-2 h-2 md:w-3 md:h-3" />
                                    </Button>
                                  </div>
                                  <span className="text-xs md:text-sm text-pink-500 ml-auto">
                                    ₹{product.price * (selectedProduct?.quantity || 1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Price Summary */}
            {selectedProducts.length > 0 && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
                  <CardTitle className="text-white text-lg md:text-xl">Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6 py-3 md:py-4">
                  <div className="space-y-2">
                    <div className="max-h-40 overflow-y-auto pr-1">
                      {selectedProducts.map((selectedProduct) => {
                        const product = products.find((p) => p.id === selectedProduct.productId)
                        return (
                          <div
                            key={selectedProduct.productId}
                            className="flex justify-between text-gray-300 text-sm md:text-base mb-1.5"
                          >
                            <span className="line-clamp-1">
                              {product?.name} (x{selectedProduct.quantity})
                            </span>
                            <span className="whitespace-nowrap ml-2">
                              ₹{(product?.price || 0) * selectedProduct.quantity}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <Separator className="bg-gray-700 my-2" />
                    <div className="flex justify-between font-bold text-base md:text-lg">
                      <span className="text-white">Total</span>
                      <span className="text-pink-500">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-sm md:text-base py-2 md:py-3"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!isStep2Valid()}
                className="bg-pink-500 hover:bg-pink-600 text-black font-semibold text-sm md:text-base py-2 md:py-3"
              >
                Review Summary
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {currentStep === 3 && (
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
                <CardTitle className="text-white text-lg md:text-xl">Order Summary</CardTitle>
                <CardDescription className="text-gray-400 text-sm md:text-base">
                  Please review your details and selected products before sending
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 md:px-6 py-3 md:py-4 space-y-4 md:space-y-6">
                {/* Customer Details */}
                <div>
                  <h3 className="font-semibold mb-2 md:mb-3 flex items-center gap-2 text-white text-sm md:text-base">
                    <Building className="w-3 h-3 md:w-4 md:h-4 text-pink-500" />
                    Customer Details
                  </h3>
                  <div className="bg-gray-800 rounded-lg p-3 md:p-4 space-y-1.5 md:space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span className="font-medium text-gray-300 text-xs md:text-sm">Company:</span>
                      <span className="text-white text-xs md:text-sm">{customerDetails.companyName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span className="font-medium text-gray-300 text-xs md:text-sm">Phone:</span>
                      <span className="text-white text-xs md:text-sm">{customerDetails.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span className="font-medium text-gray-300 text-xs md:text-sm">Email:</span>
                      <span className="text-white text-xs md:text-sm">{customerDetails.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-400 mt-0.5" />
                      <span className="font-medium text-gray-300 text-xs md:text-sm">Address:</span>
                      <span className="text-white text-xs md:text-sm">{customerDetails.address}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Products */}
                <div>
                  <h3 className="font-semibold mb-2 md:mb-3 text-white text-sm md:text-base">Selected Products</h3>
                  <div className="space-y-2 md:space-y-3 max-h-60 md:max-h-80 overflow-y-auto pr-1">
                    {selectedProducts.map((selectedProduct) => {
                      const product = products.find((p) => p.id === selectedProduct.productId)
                      return (
                        <div
                          key={selectedProduct.productId}
                          className="flex justify-between items-start p-2 md:p-3 bg-gray-800 rounded-lg"
                        >
                          <div className="flex gap-2 items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={getProductImage(selectedProduct.productId) || "/placeholder.svg"}
                                alt={product?.name || "Product"}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-white text-xs md:text-sm">{product?.name}</h4>
                              <p className="text-xs text-gray-400 line-clamp-1">{product?.description}</p>
                              <p className="text-xs text-gray-500">Quantity: {selectedProduct.quantity}</p>
                            </div>
                          </div>
                          <Badge className="bg-pink-500 text-black text-xs whitespace-nowrap ml-2">
                            ₹{(product?.price || 0) * selectedProduct.quantity}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-pink-900/20 border border-pink-500/20 rounded-lg p-3 md:p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-semibold text-white">Total Amount</span>
                    <span className="text-xl md:text-2xl font-bold text-pink-500">₹{calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-sm md:text-base py-2 md:py-3"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Back to Products</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <Button
                onClick={sendToWhatsAppAndEmail}
                className="bg-pink-500 hover:bg-pink-600 text-black font-semibold text-sm md:text-base py-2 md:py-3"
              >
                <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Send to WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </Button>
              <Button
                onClick={sendToEmail}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm md:text-base py-2 md:py-3"
              >
                <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Send to Email</span>
                <span className="sm:hidden">Email</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
