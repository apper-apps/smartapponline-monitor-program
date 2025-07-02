import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Input from '@/components/atoms/Input'
const UnitConverterTool = () => {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState('')

  const conversions = {
    length: {
      name: 'Length',
      icon: 'Ruler',
      units: {
        meter: { name: 'Meter (m)', factor: 1 },
        kilometer: { name: 'Kilometer (km)', factor: 1000 },
        centimeter: { name: 'Centimeter (cm)', factor: 0.01 },
        millimeter: { name: 'Millimeter (mm)', factor: 0.001 },
        inch: { name: 'Inch (in)', factor: 0.0254 },
        foot: { name: 'Foot (ft)', factor: 0.3048 },
        yard: { name: 'Yard (yd)', factor: 0.9144 },
        mile: { name: 'Mile (mi)', factor: 1609.34 }
      }
    },
    weight: {
      name: 'Weight',
      icon: 'Weight',
      units: {
        kilogram: { name: 'Kilogram (kg)', factor: 1 },
        gram: { name: 'Gram (g)', factor: 0.001 },
        pound: { name: 'Pound (lb)', factor: 0.453592 },
        ounce: { name: 'Ounce (oz)', factor: 0.0283495 },
        ton: { name: 'Ton (t)', factor: 1000 },
        stone: { name: 'Stone (st)', factor: 6.35029 }
      }
    },
    temperature: {
      name: 'Temperature',
      icon: 'Thermometer',
      units: {
        celsius: { name: 'Celsius (°C)' },
        fahrenheit: { name: 'Fahrenheit (°F)' },
        kelvin: { name: 'Kelvin (K)' }
      }
    },
    area: {
      name: 'Area',
      icon: 'Square',
      units: {
        squareMeter: { name: 'Square Meter (m²)', factor: 1 },
        squareKilometer: { name: 'Square Kilometer (km²)', factor: 1000000 },
        squareCentimeter: { name: 'Square Centimeter (cm²)', factor: 0.0001 },
        squareInch: { name: 'Square Inch (in²)', factor: 0.00064516 },
        squareFoot: { name: 'Square Foot (ft²)', factor: 0.092903 },
        acre: { name: 'Acre', factor: 4046.86 },
        hectare: { name: 'Hectare (ha)', factor: 10000 }
      }
    },
    volume: {
      name: 'Volume',
      icon: 'Box',
      units: {
        liter: { name: 'Liter (L)', factor: 1 },
        milliliter: { name: 'Milliliter (mL)', factor: 0.001 },
        gallon: { name: 'Gallon (gal)', factor: 3.78541 },
        quart: { name: 'Quart (qt)', factor: 0.946353 },
        pint: { name: 'Pint (pt)', factor: 0.473176 },
        cup: { name: 'Cup', factor: 0.236588 },
        fluidOunce: { name: 'Fluid Ounce (fl oz)', factor: 0.0295735 }
      }
    },
    speed: {
      name: 'Speed',
      icon: 'Zap',
      units: {
        meterPerSecond: { name: 'Meter/Second (m/s)', factor: 1 },
        kilometerPerHour: { name: 'Kilometer/Hour (km/h)', factor: 0.277778 },
        milePerHour: { name: 'Mile/Hour (mph)', factor: 0.44704 },
        knot: { name: 'Knot', factor: 0.514444 },
        footPerSecond: { name: 'Foot/Second (ft/s)', factor: 0.3048 }
      }
    }
  }

  const convertTemperature = (value, from, to) => {
    let celsius
    
    // Convert to Celsius first
    switch (from) {
      case 'celsius':
        celsius = value
        break
      case 'fahrenheit':
        celsius = (value - 32) * 5/9
        break
      case 'kelvin':
        celsius = value - 273.15
        break
      default:
        return 0
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius
      case 'fahrenheit':
        return celsius * 9/5 + 32
      case 'kelvin':
        return celsius + 273.15
      default:
        return 0
    }
  }

  const performConversion = () => {
    if (!inputValue || !fromUnit || !toUnit) return ''
    
    const value = parseFloat(inputValue)
    if (isNaN(value)) return ''
    
    const categoryData = conversions[category]
    
    if (category === 'temperature') {
      const result = convertTemperature(value, fromUnit, toUnit)
      return result.toFixed(6).replace(/\.?0+$/, '')
    } else {
      const fromFactor = categoryData.units[fromUnit].factor
      const toFactor = categoryData.units[toUnit].factor
      const result = (value * fromFactor) / toFactor
      return result.toFixed(6).replace(/\.?0+$/, '')
    }
  }

  useEffect(() => {
    setResult(performConversion())
  }, [inputValue, fromUnit, toUnit, category])

  useEffect(() => {
    const units = Object.keys(conversions[category].units)
    setFromUnit(units[0] || '')
    setToUnit(units[1] || units[0] || '')
    setInputValue('')
    setResult('')
  }, [category])

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
    setInputValue(result)
  }

  const clearAll = () => {
    setInputValue('')
    setResult('')
  }

  const categoryData = conversions[category]
  const units = Object.keys(categoryData.units)

return (
    <>
      <Helmet>
        <title>Unit Converter - Convert Length, Weight, Temperature & More | SmartAppOnline</title>
        <meta name="description" content="Free online unit converter for length, weight, temperature, area, volume, and speed. Convert between metric and imperial units instantly with accurate results." />
        <meta name="keywords" content="unit converter, convert units, length converter, weight converter, temperature converter, metric imperial converter" />
        <meta property="og:title" content="Unit Converter - Convert Length, Weight, Temperature & More" />
        <meta property="og:description" content="Convert between different units of measurement instantly. Free online calculator for all unit conversions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Unit Converter - Free Online Calculator" />
        <meta name="twitter:description" content="Convert between different units of measurement instantly. Free online tool." />
        <link rel="canonical" href={`${window.location.origin}/tools/19`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Unit Converter",
            "description": "Convert between different units of measurement including length, weight, temperature, area, volume, and speed",
            "url": `${window.location.origin}/tools/19`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Length conversion",
              "Weight conversion",
              "Temperature conversion",
              "Area conversion",
              "Volume conversion",
              "Speed conversion",
              "Quick reference guide"
            ]
          })}
        </script>
      </Helmet>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category & Input Section */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name={categoryData.icon} size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{categoryData.name} Converter</h3>
            <p className="text-sm text-gray-600">Convert between different {categoryData.name.toLowerCase()} units</p>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {Object.entries(conversions).map(([key, data]) => (
              <option key={key} value={key}>{data.name}</option>
            ))}
          </select>
        </div>

        {/* From Unit */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>
                  {categoryData.units[unit].name}
                </option>
              ))}
            </select>
          </div>

          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value to convert"
            step="any"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-4">
          <Button
            onClick={swapUnits}
            variant="outline"
            icon="ArrowUpDown"
            size="small"
          >
            Swap Units
          </Button>
        </div>

        {/* To Unit */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {units.map(unit => (
                <option key={unit} value={unit}>
                  {categoryData.units[unit].name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-lg font-semibold text-green-900">
              {result || '0'}
            </div>
            <div className="text-sm text-green-700">
              {toUnit ? categoryData.units[toUnit].name : ''}
            </div>
          </div>
        </div>

        <Button
          onClick={clearAll}
          variant="outline"
          icon="RotateCcw"
          className="w-full mt-4"
        >
          Clear All
        </Button>
      </Card>

      {/* Quick Reference & Common Conversions */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="BookOpen" size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Reference</h3>
            <p className="text-sm text-gray-600">Common conversions for {categoryData.name.toLowerCase()}</p>
          </div>
        </div>

        {/* Current Conversion Formula */}
        {inputValue && result && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-900 text-sm mb-2">Current Conversion</div>
            <div className="text-blue-800 text-sm">
              {inputValue} {fromUnit ? categoryData.units[fromUnit].name : ''} = {result} {toUnit ? categoryData.units[toUnit].name : ''}
            </div>
          </div>
        )}

        {/* Common Conversions */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Common {categoryData.name} Conversions</h4>
          
          {category === 'length' && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">1 meter =</span>
                <span className="font-medium">3.28 feet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 kilometer =</span>
                <span className="font-medium">0.62 miles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 inch =</span>
                <span className="font-medium">2.54 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 foot =</span>
                <span className="font-medium">12 inches</span>
              </div>
            </div>
          )}

          {category === 'weight' && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">1 kilogram =</span>
                <span className="font-medium">2.20 pounds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 pound =</span>
                <span className="font-medium">16 ounces</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 ton =</span>
                <span className="font-medium">1000 kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 stone =</span>
                <span className="font-medium">14 pounds</span>
              </div>
            </div>
          )}

          {category === 'temperature' && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Water freezes =</span>
                <span className="font-medium">0°C / 32°F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Water boils =</span>
                <span className="font-medium">100°C / 212°F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room temp =</span>
                <span className="font-medium">20°C / 68°F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Body temp =</span>
                <span className="font-medium">37°C / 98.6°F</span>
              </div>
            </div>
          )}

          {category === 'volume' && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">1 liter =</span>
                <span className="font-medium">0.26 gallons</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 gallon =</span>
                <span className="font-medium">4 quarts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 cup =</span>
                <span className="font-medium">8 fl oz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1000 mL =</span>
                <span className="font-medium">1 liter</span>
              </div>
            </div>
          )}

          {category === 'speed' && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">1 m/s =</span>
                <span className="font-medium">3.6 km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 mph =</span>
                <span className="font-medium">1.61 km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">1 knot =</span>
                <span className="font-medium">1.85 km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Speed of light =</span>
                <span className="font-medium">299,792,458 m/s</span>
              </div>
            </div>
          )}
        </div>

        {/* Conversion Tips */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="text-sm font-semibold text-yellow-900 mb-2 flex items-center">
            <ApperIcon name="Lightbulb" size={16} className="mr-2" />
            Conversion Tips
          </h4>
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>• Use the swap button to quickly reverse conversion direction</li>
            <li>• Results are rounded to 6 decimal places for accuracy</li>
            <li>• Temperature conversions use precise formulas</li>
            <li>• Bookmark this tool for quick access to conversions</li>
          </ul>
        </div>
</Card>
      </div>
    </>
  )
}

export default UnitConverterTool