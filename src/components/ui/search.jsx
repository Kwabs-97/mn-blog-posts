'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './input'
import { useDebounce } from '@/hooks/useDebounce'

const CATEGORIES =[
    'All',
    'Web Development',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'CSS',
    'Frontend',
    'Backend',
    'DevOps',
    'AI/ML',
  ];
function Search({onSearch, onCategoryChange, selectedCategory}) {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    useEffect(()=>{
        onSearch(debouncedSearchTerm)
    },[debouncedSearchTerm,onSearch])

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
    <div className="relative flex-1">
      <Input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
      <svg
        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
    >
      {CATEGORIES.map((category) => (
        <option key={category} value={category === 'All' ? '' : category}>
          {category}
        </option>
      ))}
    </select>
  </div>
  )
}

export default Search