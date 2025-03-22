import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const CATEGORIES = [
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


function PostForm({data, onSubmit, isSubmitting}) {

    
  return (
    <div>PostForm</div>
  )
}

export default PostForm