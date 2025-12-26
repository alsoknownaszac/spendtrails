#!/usr/bin/env node

/**
 * Setup script for Sanity CMS integration
 * 
 * This script helps users set up their Sanity project and configure environment variables.
 * Run with: node scripts/setup-sanity.js
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Sanity CMS Setup for Spendtrails')
console.log('=====================================\n')

console.log('This script will help you set up Sanity CMS for your Spendtrails project.\n')

console.log('📋 Steps to complete:')
console.log('1. Create a Sanity account at https://sanity.io')
console.log('2. Run: npx sanity@latest init')
console.log('3. Follow the prompts to create a new project')
console.log('4. Copy your project ID and dataset name')
console.log('5. Update your .env.local file with the values\n')

console.log('📝 Environment Variables needed:')
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here')
console.log('NEXT_PUBLIC_SANITY_DATASET=production')
console.log('SANITY_API_READ_TOKEN=your_read_token_here (optional for preview)\n')

console.log('🎯 After setup:')
console.log('- Visit http://localhost:3000/studio to access your CMS')
console.log('- Create your first homepage content')
console.log('- Your site will automatically use the CMS data\n')

console.log('💡 Need help? Check the documentation or create an issue on GitHub.')

// Check if .env.local exists and show current values
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  console.log('\n📄 Current .env.local file:')
  const envContent = fs.readFileSync(envPath, 'utf8')
  console.log(envContent)
} else {
  console.log('\n⚠️  No .env.local file found. Please create one with the environment variables above.')
}