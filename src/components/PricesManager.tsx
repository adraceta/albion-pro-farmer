import React, { useEffect, useState } from 'react'
import { IItem, runesFixed } from '../database/items'
import PricesForm from './PricesForm'
import PricesTable from './PricesTable'


function PricesManager() {
  const [manualItem, setManualItem] = useState('')
  const [item, setItem] = useState<IItem>(null)
  const [city, setCity] = useState({ label: 'Fort Sterling', value: 'Fort Sterling' })
  const [resultsTable, setResultsTable] = useState<IItem[]>([])
  const [lastSort, setLastSort] = useState({ property: '', desc: false })

  useEffect(() => {
    restoreData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const fetchData = async (actualUniqueName: string, actualCity?: string) => {
    const a = 'T1_CARROT'
    // &time-scale=1
    const res = await fetch(`https://www.albion-online-data.com/api/v2/stats/Prices/${actualUniqueName || item?.UniqueName || manualItem || a}.json?locations=${actualCity || city.value}`)
    const json = await res.json()
    return json
  }

  const fetchAll = async (array) => {
    const allAsyncResults = []
    for (const element of array) {
      const asyncResult = await fetchData(element.item_id, element.city)
      allAsyncResults.push(...asyncResult.map(e => ({ ...e, name: element.name })))
    }
    return allAsyncResults
  }

  const fetchFixedRunes = async () => {
    const allAsyncResults = []
    for (const element of runesFixed) {
      const asyncResult = await fetchData(element.UniqueName)
      allAsyncResults.push(...asyncResult.map(e => ({ ...e, name: element.LocalizedNames['ES-ES'] })))
    }
    return allAsyncResults
  }

  const retrieveData = async (actualUniqueName?: string, actualCity?: string) => {
    const res = await fetchData(actualUniqueName, actualCity)
    const itemName = item?.LocalizedNames ? item.LocalizedNames['ES-ES'] : (actualUniqueName || manualItem)
    if (itemName) {
      setResultsTable(resultsTable.concat(res.map(e => ({ ...e, name: itemName }))))
    }
  }

  const removeResult = (index: number) => {
    const filtered = resultsTable.filter((e, i) => i !== index)
    setResultsTable(filtered)
  }

  const sortBy = (property: string) => {
    function compare(a: IItem, b: IItem) {
      if (a[property] < b[property]) {
        return lastSort.desc ? 1 : -1
      }
      if (a[property] > b[property]) {
        return lastSort.desc ? -1 : 1
      }
      return 0
    }

    setResultsTable(resultsTable.sort(compare))
    setLastSort({ property, desc: !lastSort.desc })
  }

  const saveData = () => {
    localStorage.setItem('albionItemList', JSON.stringify(resultsTable))
  }

  const restoreData = async () => {
    const restored = JSON.parse(localStorage.getItem('albionItemList'))
    if (restored) {
      const newResults = await fetchAll(restored)
      setResultsTable(newResults)
    }
  }

  const clearData = () => {
    setResultsTable([])
  }

  const refreshData = async () => {
    const newResults = await fetchAll(resultsTable)
    setResultsTable(newResults)
  }

  const getFixedRunes = async () => {
    const newResults = await fetchFixedRunes()
    setResultsTable(newResults)
  }


  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <PricesForm manualItem={manualItem} onManualItemChange={setManualItem} item={item} onItemChange={setItem} city={city} onCityChange={setCity}
        clearData={clearData} refreshData={refreshData} restoreData={restoreData} saveData={saveData} retrieveData={retrieveData} getFixedRunes={getFixedRunes} />
      <PricesTable elements={resultsTable} sortByCallback={sortBy} removeResultCallback={removeResult} />
    </div >
  )
}

export default PricesManager
