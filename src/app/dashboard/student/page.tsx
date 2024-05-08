'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ExploreProblemStatements = () => {

    const router = useRouter()
    
    useEffect(() => {
      if (!auth.currentUser) {
        router.push('/login')
      }
    }, [router]) // Add an empty dependency array to useEffect

    return (
      <div>
        <Navbar />
        <h1>Explore Problem Statements</h1>
      </div>
    )
  }

export default ExploreProblemStatements