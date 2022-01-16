import { useState } from 'react';
import PricesForm from './PricesForm';
import PricesTable from './PricesTable';



function PricesManager() {
  const [manualItem, setManualItem] = useState('')
  const [item, setItem] = useState({})
  const [city, setCity] = useState({ label: 'Fort Sterling', value: 'Fort Sterling' })
  const [resultsTable, setResultsTable] = useState([])
  const [lastSort, setLastSort] = useState({ property: '', desc: false })


  const fetchData = async (actualUniqueName, actualCity) => {
    const a = 'T1_CARROT'
    //&time-scale=1
    const res = await fetch(`https://www.albion-online-data.com/api/v2/stats/Prices/${actualUniqueName || item.UniqueName || item || a}.json?locations=${actualCity || city.value}`)
    const json = await res.json()
    return json
  }

  const fetchAll = async (array) => {
    const allAsyncResults = []
    for (const item of array) {
      const asyncResult = await fetchData(item.item_id, item.city)
      allAsyncResults.push(...asyncResult)
    }
    return allAsyncResults
  }

  const retrieveData = async (actualUniqueName, actualCity) => {
    const res = await fetchData(actualUniqueName, actualCity)
    setResultsTable(resultsTable.concat(res))
  }

  const removeResult = (index) => {
    const filtered = resultsTable.filter((e, i) => i !== index)
    setResultsTable(filtered)
  }

  const sortBy = (property) => {
    function compare(a, b) {
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
    const newResults = await fetchAll(restored)
    setResultsTable(newResults)
  }

  const clearData = () => {
    setResultsTable([])
  }

  const refreshData = async () => {
    const newResults = await fetchAll(resultsTable)
    setResultsTable(newResults)
  }



  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

      <PricesForm manualItem={manualItem} onManualItemChange={setManualItem} item={item} onItemChange={setItem} city={city} onCityChange={setCity}
        clearData={clearData} refreshData={refreshData} restoreData={restoreData} saveData={saveData} retrieveData={retrieveData} />
      <PricesTable elements={resultsTable} sortByCallback={sortBy} removeResultCallback={removeResult} />

    </div >
  )
}

export default PricesManager;
