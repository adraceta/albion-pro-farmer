import Select from 'react-select'
import { usefulItems } from '../database/items';


function PricesForm(props) {
  const { manualItem, onManualItemChange, item, onItemChange, city, onCityChange, clearData, refreshData, restoreData, saveData, retrieveData } = props

  const allItemsOptions = usefulItems
  const allCities = [
    { label: 'Fort Sterling', value: 'Fort%20Sterling' },
    { label: 'Bridgewatch', value: 'Bridgewatch' },
    { label: 'Caerleon', value: 'Caerleon' },
    { label: 'Lymhurst', value: 'Lymhurst' },
    { label: 'Martlock', value: 'Martlock' },
    { label: 'Thetford ', value: 'Thetford ' },
  ]


  return (
    <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Buscador de Precios</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Selecciona un objeto y encuentra el histórico de precios</p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="manual-item" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Objeto
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="manual-item"
                    id="manual-item"
                    value={manualItem}
                    onChange={e => onManualItemChange(e.target.value)}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="object" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Selección Objeto
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <Select
                    options={allItemsOptions}
                    value={item}
                    onChange={e => onItemChange(e)}
                    getOptionLabel={e => e.LocalizedNames ? `${e.LocalizedNames['ES-ES']} (${e.UniqueName})` : e.UniqueName}
                    getOptionValue={e => e.UniqueName}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Ciudad
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <Select
                    options={allCities}
                    value={city}
                    onChange={e => onCityChange(e)}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => clearData()}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2" >
              Limpiar
            </button>
            <button
              type="button"
              onClick={() => refreshData()}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2" >
              Refrescar
            </button>
            <button
              type="button"
              onClick={() => restoreData()}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2" >
              Restaurar
            </button>
            <button
              type="button"
              onClick={() => saveData()}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2" >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => retrieveData()}
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
              Añadir Precios
            </button>
          </div>
        </div>
      </form>
  )
}

export default PricesForm