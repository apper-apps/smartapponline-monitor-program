import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
const AgeCalculatorTool = () => {
  const [birthDate, setBirthDate] = useState('')
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0])
  const [result, setResult] = useState(null)

  const calculateAge = () => {
    if (!birthDate) {
      return
    }

    const birth = new Date(birthDate)
    const target = new Date(targetDate)
    
    if (birth > target) {
      setResult({ error: 'Birth date cannot be after target date!' })
      return
    }

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += lastMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    // Calculate additional details
    const totalDays = Math.floor((target - birth) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months
    const totalHours = totalDays * 24
    const totalMinutes = totalHours * 60
    const totalSeconds = totalMinutes * 60

    // Next birthday calculation
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1)
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - target) / (1000 * 60 * 60 * 24))

    // Age in different planets (relative to Earth days)
    const planetYears = {
      Mercury: (totalDays / 88).toFixed(2),
      Venus: (totalDays / 225).toFixed(2),
      Mars: (totalDays / 687).toFixed(2),
      Jupiter: (totalDays / 4333).toFixed(2),
      Saturn: (totalDays / 10759).toFixed(2),
      Uranus: (totalDays / 30687).toFixed(2),
      Neptune: (totalDays / 60190).toFixed(2)
    }

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday: nextBirthday.toLocaleDateString(),
      daysUntilBirthday,
      planetYears,
      birthDayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' }),
      zodiacSign: getZodiacSign(birth.getMonth(), birth.getDate())
    })
  }

  const getZodiacSign = (month, day) => {
    const signs = [
      { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
      { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'Pisces', start: [2, 19], end: [3, 20] },
      { sign: 'Aries', start: [3, 21], end: [4, 19] },
      { sign: 'Taurus', start: [4, 20], end: [5, 20] },
      { sign: 'Gemini', start: [5, 21], end: [6, 20] },
      { sign: 'Cancer', start: [6, 21], end: [7, 22] },
      { sign: 'Leo', start: [7, 23], end: [8, 22] },
      { sign: 'Virgo', start: [8, 23], end: [9, 22] },
      { sign: 'Libra', start: [9, 23], end: [10, 22] },
      { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'Sagittarius', start: [11, 22], end: [12, 21] }
    ]

    for (const { sign, start, end } of signs) {
      if (
        (month === start[0] - 1 && day >= start[1]) ||
        (month === end[0] - 1 && day <= end[1]) ||
        (start[0] === 12 && end[0] === 1 && (
          (month === 11 && day >= start[1]) || (month === 0 && day <= end[1])
        ))
      ) {
        return sign
      }
    }
    return 'Unknown'
  }

  useEffect(() => {
    if (birthDate) {
      calculateAge()
    } else {
      setResult(null)
    }
  }, [birthDate, targetDate])

  const handleTodayClick = () => {
    setTargetDate(new Date().toISOString().split('T')[0])
  }

return (
    <>
      <Helmet>
        <title>Age Calculator - Calculate Your Exact Age in Years, Months, Days | SmartAppOnline</title>
        <meta name="description" content="Free online age calculator. Calculate your exact age in years, months, days, hours, and minutes. Find your zodiac sign, age on other planets, and next birthday." />
        <meta name="keywords" content="age calculator, calculate age, age in days, age in months, birthday calculator, exact age, zodiac sign calculator" />
        <meta property="og:title" content="Age Calculator - Calculate Your Exact Age" />
        <meta property="og:description" content="Calculate your exact age in years, months, days and more. Free online age calculator with detailed breakdown." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Age Calculator - Calculate Your Exact Age" />
        <meta name="twitter:description" content="Calculate your exact age in years, months, days and more. Free online calculator." />
        <link rel="canonical" href={`${window.location.origin}/tools/17`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Age Calculator",
            "description": "Calculate exact age in years, months, days, hours, and minutes with additional fun facts",
            "url": `${window.location.origin}/tools/17`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Exact age calculation",
              "Age in different time units",
              "Next birthday countdown",
              "Zodiac sign detection",
              "Age on other planets",
              "Birth day of week"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Calendar" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Date Selection</h3>
            <p className="text-sm text-gray-600">Enter dates to calculate age</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Birth Date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
          
          <Input
            label="Calculate Age On"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            required
          />

          <Button
            onClick={handleTodayClick}
            variant="outline"
            icon="Calendar"
            className="w-full"
          >
            Use Today's Date
          </Button>
        </div>

        {result?.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <ApperIcon name="AlertCircle" size={16} className="text-red-600" />
              <span className="text-sm text-red-700">{result.error}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Main Results */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Clock" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Age Calculation</h3>
            <p className="text-sm text-gray-600">Your detailed age breakdown</p>
          </div>
        </div>

        {result && !result.error ? (
          <div className="space-y-6">
            {/* Main Age Display */}
            <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
              <div className="text-4xl font-bold gradient-text mb-2">
                {result.years} Years
              </div>
              <div className="text-lg text-gray-600">
                {result.months} Months, {result.days} Days
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{result.totalDays.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Days</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{result.totalWeeks.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Weeks</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{result.totalMonths.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Months</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-xl font-bold text-gray-900">{result.totalHours.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </div>
            </div>

            {/* Next Birthday */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Gift" size={16} className="text-yellow-600" />
                <span className="font-semibold text-yellow-900">Next Birthday</span>
              </div>
              <div className="text-sm text-yellow-800">
                {result.nextBirthday} ({result.daysUntilBirthday} days to go)
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ApperIcon name="Calendar" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Enter your birth date to calculate age</p>
          </div>
        )}
      </Card>

      {/* Additional Info */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Info" size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Fun Facts</h3>
            <p className="text-sm text-gray-600">Interesting details about your age</p>
          </div>
        </div>

        {result && !result.error ? (
          <div className="space-y-4">
            {/* Birth Day Info */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="font-semibold text-blue-900 text-sm mb-1">Birth Day</div>
              <div className="text-blue-800 text-sm">You were born on a {result.birthDayOfWeek}</div>
            </div>

            {/* Zodiac Sign */}
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="font-semibold text-purple-900 text-sm mb-1">Zodiac Sign</div>
              <div className="text-purple-800 text-sm">♈ {result.zodiacSign}</div>
            </div>

            {/* Age in Different Planets */}
            <div className="space-y-2">
              <div className="font-semibold text-gray-900 text-sm">Age on Other Planets</div>
              <div className="space-y-1">
                {Object.entries(result.planetYears).map(([planet, age]) => (
                  <div key={planet} className="flex justify-between text-sm">
                    <span className="text-gray-600">{planet}:</span>
                    <span className="font-medium text-gray-900">{age} years</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Units */}
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="font-semibold text-green-900 text-sm mb-2">You've Been Alive For</div>
              <div className="space-y-1 text-xs text-green-800">
                <div>{result.totalMinutes.toLocaleString()} minutes</div>
                <div>{result.totalSeconds.toLocaleString()} seconds</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <ApperIcon name="Info" size={48} className="mx-auto mb-4 opacity-30" />
            <p>Fun facts will appear here</p>
          </div>
        )}
</Card>
      </div>
    </>
  )
}

export default AgeCalculatorTool