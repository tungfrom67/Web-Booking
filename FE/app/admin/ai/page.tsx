"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Lightbulb,
  BarChart3,
  Target,
  Zap,
  Brain,
  Mic,
  MicOff,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const aiInsights = [
  {
    id: 1,
    type: "revenue",
    title: "Revenue Optimization",
    description:
      "AI suggests increasing room rates by 12% during peak season based on demand patterns and competitor analysis.",
    confidence: 94,
    impact: "$45,000 potential increase",
    status: "new",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    type: "occupancy",
    title: "Occupancy Prediction",
    description: "Expected 87% occupancy rate for next month. Consider overbooking strategy for maximum revenue.",
    confidence: 89,
    impact: "15% revenue boost",
    status: "active",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    type: "customer",
    title: "Customer Retention",
    description: "Identified 156 customers at risk of churn. Personalized offers could retain 78% of them.",
    confidence: 91,
    impact: "156 customers",
    status: "urgent",
    icon: Users,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    type: "marketing",
    title: "Marketing Campaign",
    description: "Business traveler segment showing 34% growth. Launch targeted corporate packages.",
    confidence: 86,
    impact: "New market segment",
    status: "new",
    icon: Target,
    color: "from-purple-500 to-pink-500",
  },
]

const chatMessages = [
  {
    id: 1,
    type: "ai",
    content:
      "Hello! I'm your AI assistant. I can help you analyze your hotel data, provide insights, and answer questions about your business. What would you like to know?",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: 2,
    type: "user",
    content: "What are the top performing hotels this month?",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: 3,
    type: "ai",
    content:
      "Based on the latest data, here are your top 3 performing hotels this month:\n\n1. **Grand Palace Hotel** - $284,750 revenue, 87% occupancy\n2. **Ocean View Resort** - $267,890 revenue, 92% occupancy\n3. **Mountain Lodge** - $198,450 revenue, 76% occupancy\n\nThe Ocean View Resort has the highest occupancy rate, while Grand Palace leads in total revenue. Would you like me to analyze what's driving these performances?",
    timestamp: new Date(Date.now() - 180000),
  },
]

const quickActions = [
  { icon: BarChart3, label: "Generate Report", description: "Create comprehensive analytics report" },
  { icon: TrendingUp, label: "Revenue Forecast", description: "Predict next month's revenue" },
  { icon: Users, label: "Customer Analysis", description: "Analyze customer behavior patterns" },
  { icon: Calendar, label: "Booking Trends", description: "Identify booking patterns and trends" },
  { icon: Target, label: "Marketing Insights", description: "Get marketing recommendations" },
  { icon: Lightbulb, label: "Optimization Tips", description: "Receive operational improvements" },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(chatMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai" as const,
        content:
          "I understand your question. Let me analyze the data and provide you with detailed insights. This might take a moment...",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    const message = `Please ${action.label.toLowerCase()}: ${action.description}`
    setInputMessage(message)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent"
          >
            AI Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 mt-2"
          >
            Get intelligent insights and recommendations powered by machine learning.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-2"
        >
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Brain className="w-4 h-4 mr-2" />
            Train AI
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Chat Interface */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">AI Assistant</CardTitle>
                      <CardDescription>Powered by advanced machine learning</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Online
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[80%] ${
                          message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <Avatar className="w-8 h-8">
                          {message.type === "ai" ? (
                            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>You</AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-2xl p-4 ${
                            message.type === "user" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          <div
                            className={`text-xs mt-2 opacity-70 ${
                              message.type === "user" ? "text-blue-100" : "text-slate-500"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        {message.type === "ai" && (
                          <div className="flex flex-col space-y-1">
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      </Avatar>
                      <div className="bg-slate-100 rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything about your hotel business..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                        isListening ? "text-red-500" : "text-slate-400"
                      }`}
                      onClick={() => setIsListening(!isListening)}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common AI-powered tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => handleQuickAction(action)}
                    >
                      <action.icon className="w-4 h-4 mr-3 text-blue-500" />
                      <div className="text-left">
                        <div className="font-medium">{action.label}</div>
                        <div className="text-xs text-slate-500">{action.description}</div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Latest Insights
                </CardTitle>
                <CardDescription>AI-generated recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.slice(0, 3).map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="p-3 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${insight.color}`}>
                        <insight.icon className="w-4 h-4 text-white" />
                      </div>
                      <Badge variant={insight.status === "urgent" ? "destructive" : "secondary"} className="text-xs">
                        {insight.status}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs text-slate-600 mb-2 line-clamp-2">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Progress value={insight.confidence} className="w-12 h-1" />
                        <span className="text-xs text-slate-500">{insight.confidence}%</span>
                      </div>
                      <span className="text-xs font-medium text-blue-600">{insight.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
