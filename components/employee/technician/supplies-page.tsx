"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  Package,
  Plus,
  Minus,
  Search,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  History,
  ShoppingCart,
  X,
} from "lucide-react"

interface SupplyItem {
  id: string
  name: string
  category: string
  stock: number
  unit: string
  lowStockThreshold: number
  price: number
}

interface UsageRecord {
  id: string
  itemName: string
  quantity: number
  customerName: string
  serviceName: string
  date: string
  time: string
}

export function TechnicianSuppliesPage() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<{ item: SupplyItem; quantity: number }[]>([])

  const supplies: SupplyItem[] = [
    { id: "1", name: "修复精油", category: "护理用品", stock: 12, unit: "瓶", lowStockThreshold: 5, price: 68 },
    { id: "2", name: "康复仪贴片", category: "设备耗材", stock: 48, unit: "片", lowStockThreshold: 20, price: 8 },
    { id: "3", name: "一次性床单", category: "一次性用品", stock: 35, unit: "张", lowStockThreshold: 15, price: 5 },
    { id: "4", name: "消毒湿巾", category: "清洁用品", stock: 8, unit: "包", lowStockThreshold: 10, price: 12 },
    { id: "5", name: "热敷贴", category: "护理用品", stock: 25, unit: "贴", lowStockThreshold: 10, price: 15 },
    { id: "6", name: "护理精油", category: "护理用品", stock: 6, unit: "瓶", lowStockThreshold: 5, price: 88 },
    { id: "7", name: "骨盆带", category: "康复器材", stock: 3, unit: "条", lowStockThreshold: 5, price: 128 },
    { id: "8", name: "艾灸条", category: "中医耗材", stock: 42, unit: "根", lowStockThreshold: 20, price: 6 },
  ]

  const usageRecords: UsageRecord[] = [
    { id: "1", itemName: "修复精油", quantity: 1, customerName: "王女士", serviceName: "产后腹直肌修复", date: "2026-01-22", time: "10:30" },
    { id: "2", itemName: "一次性床单", quantity: 2, customerName: "王女士", serviceName: "产后腹直肌修复", date: "2026-01-22", time: "10:30" },
    { id: "3", itemName: "康复仪贴片", quantity: 4, customerName: "李女士", serviceName: "盆底肌康复训练", date: "2026-01-22", time: "14:00" },
    { id: "4", itemName: "热敷贴", quantity: 2, customerName: "赵女士", serviceName: "乳腺疏通护理", date: "2026-01-21", time: "11:00" },
  ]

  const lowStockItems = supplies.filter((item) => item.stock <= item.lowStockThreshold)
  const filteredSupplies = supplies.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToCart = (item: SupplyItem) => {
    const existing = cart.find((c) => c.item.id === item.id)
    if (existing) {
      setCart(cart.map((c) => (c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)))
    } else {
      setCart([...cart, { item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    const existing = cart.find((c) => c.item.id === itemId)
    if (existing && existing.quantity > 1) {
      setCart(cart.map((c) => (c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c)))
    } else {
      setCart(cart.filter((c) => c.item.id !== itemId))
    }
  }

  const getCartQuantity = (itemId: string) => {
    const item = cart.find((c) => c.item.id === itemId)
    return item ? item.quantity : 0
  }

  const totalCartItems = cart.reduce((sum, c) => sum + c.quantity, 0)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4 pt-4 safe-area-top">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">耗材管理</h1>
            <p className="text-sm opacity-90 mt-1">库存与领用管理</p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="relative"
            onClick={() => setShowApplyDialog(true)}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            申领
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="p-4 pb-0">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm font-medium text-amber-800">库存预警</p>
                  <p className="text-xs text-amber-600">
                    {lowStockItems.map((i) => i.name).join("、")} 库存不足
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-muted/50">
            <TabsTrigger value="inventory" className="flex-1">
              <Package className="w-4 h-4 mr-1" />
              库存
            </TabsTrigger>
            <TabsTrigger value="records" className="flex-1">
              <History className="w-4 h-4 mr-1" />
              使用记录
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索耗材名称或类别"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredSupplies.map((item) => (
                <Card key={item.id} className={`border-0 shadow-sm ${item.stock <= item.lowStockThreshold ? "ring-1 ring-amber-300" : ""}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-emerald-50 flex items-center justify-center">
                        <Package className="w-5 h-5 text-teal-600" />
                      </div>
                      {item.stock <= item.lowStockThreshold && (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px]">低库存</Badge>
                      )}
                    </div>
                    <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-teal-600">
                        {item.stock}<span className="text-xs font-normal text-muted-foreground ml-1">{item.unit}</span>
                      </p>
                      <div className="flex items-center gap-1">
                        {getCartQuantity(item.id) > 0 ? (
                          <>
                            <button
                              className="w-6 h-6 rounded-full bg-muted flex items-center justify-center"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{getCartQuantity(item.id)}</span>
                            <button
                              className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="records" className="mt-4">
            <div className="space-y-3">
              {usageRecords.map((record) => (
                <Card key={record.id} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{record.itemName}</p>
                          <p className="text-xs text-muted-foreground">
                            {record.customerName} · {record.serviceName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm text-foreground">-{record.quantity}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-[90vw] max-h-[85vh] rounded-xl">
          <DialogHeader>
            <DialogTitle>耗材申领</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">暂无申领物品</p>
                <p className="text-xs text-muted-foreground mt-1">请在库存中添加需要申领的耗材</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(({ item, quantity }) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                        <Package className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-6 h-6 rounded-full bg-muted flex items-center justify-center"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <button
                        className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-muted-foreground">申领数量</span>
                    <span className="font-medium">{totalCartItems} 件</span>
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    提交申领
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
