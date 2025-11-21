import { FilterType } from '@/lib/data'
import { Filter } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge' 

const StatsAndFilters = ({ 
  completedTasksCount = 0, 
  activeTasksCount = 0, 
  filter = "all",
  setFilter
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-success/50 text-success-foreground border-success/20"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Filter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterType).map((filterKey) => (
          <Button
            key={filterKey}
            variant={filter === filterKey ? 'gradient' : 'ghost'}
            size='sm'
            className="capitalize"
            onClick={() => setFilter(filterKey)}
          >
            <Filter className="w-4 h-4" />
            {FilterType[filterKey]}
          </Button>
        ))}
      </div>

    </div>
  )
}

export default StatsAndFilters
