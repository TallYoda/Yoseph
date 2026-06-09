import type { FilterValue } from '../../hooks/useFilter'

type FilterBarProps = {
  selected: FilterValue
  onChange: (value: FilterValue) => void
}

export default function FilterBar({ selected, onChange }: FilterBarProps) {
  return (
    <div className="filters">
      <button
        type="button"
        className={selected === 'all' ? 'is-active' : ''}
        onClick={() => onChange('all')}
      >
        All
      </button>
      <button
        type="button"
        className={selected === 'digital' ? 'is-active' : ''}
        onClick={() => onChange('digital')}
      >
        Digital Art
      </button>
      <button
        type="button"
        className={selected === 'installation' ? 'is-active' : ''}
        onClick={() => onChange('installation')}
      >
        Installation Art
      </button>
      <button
        type="button"
        className={selected === 'forSale' ? 'is-active' : ''}
        onClick={() => onChange('forSale')}
      >
        Available for Sale
      </button>
    </div>
  )
}
