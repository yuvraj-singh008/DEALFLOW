'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    industry: '',
    stage: '',
    raiseAmount: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Mock signup
    setTimeout(() => {
      router.push('/match')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 mx-auto mb-4 flex items-center justify-center">
            <div className="text-2xl font-bold text-white">IM</div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Join InvestorMatch.ai</h1>
          <p className="text-slate-600">Create your account and find your perfect investor matches</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              1
            </div>
            <div className={`h-1 w-20 ${step >= 2 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              2
            </div>
            <div className={`h-1 w-20 ${step >= 3 ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <div className="text-center">Account</div>
            <div className="text-center">Company</div>
            <div className="text-center">Funding</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-slate-500 mt-2">Minimum 8 characters with letters and numbers</p>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1"
                  />
                  <label className="ml-2 text-sm text-slate-600">
                    I agree to the <a href="/terms" className="text-emerald-600 hover:text-emerald-700">Terms of Service</a> and <a href="/privacy" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</a>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company name</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your startup name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    <option value="B2B_SAAS">B2B SaaS</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="FINTECH">Fintech</option>
                    <option value="HEALTHCARE">Healthcare</option>
                    <option value="CONSUMER">Consumer</option>
                    <option value="MARKETPLACE">Marketplace</option>
                    <option value="DEEPTECH">Deep Tech</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Stage</label>
                  <select
                    name="stage"
                    required
                    value={formData.stage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select stage</option>
                    <option value="PRE_SEED">Pre-Seed</option>
                    <option value="SEED">Seed</option>
                    <option value="SERIES_A">Series A</option>
                    <option value="SERIES_B">Series B</option>
                    <option value="SERIES_C_PLUS">Series C+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Raise amount (USD)</label>
                  <input
                    type="number"
                    name="raiseAmount"
                    required
                    value={formData.raiseAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 2000000"
                  />
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 mb-1">Ready to match!</div>
                      <p className="text-sm text-slate-600">Based on your information, we've already found 47 potential investors for you.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Creating account...' : 'Complete Signup'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
