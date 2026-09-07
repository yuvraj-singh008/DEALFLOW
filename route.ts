import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // This is a mock API response
  // In production, you would connect to your database
  
  const mockMatches = [
    {
      investorId: '1',
      matchScore: 94,
      confidence: 'HIGH',
      tier: 'EXCEPTIONAL',
      reasons: [
        'Invests in your B2B SaaS industry',
        'Your Series A stage fits perfectly',
        '$4M raise matches their $1-10M check range',
        'Active in your geographic market'
      ],
      investor: {
        name: 'Sapphire Ventures',
        investorType: 'VC',
        verified: true,
        locations: ['Palo Alto', 'San Francisco'],
        thesis: 'We invest in B2B SaaS companies transforming enterprise workflows',
        minCheck: 1000000,
        maxCheck: 10000000,
        stages: ['SEED', 'SERIES_A', 'SERIES_B'],
        industries: ['B2B_SAAS', 'AI', 'ENTERPRISE'],
      }
    },
    // ... more matches
  ]

  return NextResponse.json({
    success: true,
    data: {
      matches: mockMatches,
      total: mockMatches.length,
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 1
      }
    }
  })
}

export async function POST(request: NextRequest) {
  // This would handle matching preferences
  const body = await request.json()
  
  return NextResponse.json({
    success: true,
    message: 'Match preferences updated',
    data: body
  })
}
