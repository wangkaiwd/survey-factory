'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'

export default function LoginPage () {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const onRegisterSuccess = () => {
    setActiveTab('login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] p-6">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">欢迎使用</CardTitle>
          <CardDescription className="text-center">
            请登录您的账号或注册新账号
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onSuccess={onRegisterSuccess} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

